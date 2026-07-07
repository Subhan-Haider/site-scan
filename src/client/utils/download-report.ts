/**
 * Generates and downloads a self-contained HTML report for a SiteScan analysis.
 */
export const downloadReport = (address: string, jobsState: Record<string, any>) => {
  const timestamp = new Date().toLocaleString();
  const siteName = (() => {
    try {
      const withScheme = /^https?:\/\//i.test(address) ? address : `https://${address}`;
      return new URL(withScheme).hostname.replace(/^www\./, '');
    } catch {
      return address;
    }
  })();

  // Collect all successful results
  const results: { id: string; data: any }[] = [];
  Object.entries(jobsState).forEach(([id, entry]: [string, any]) => {
    if (entry?.state === 'success' && entry.raw !== undefined) {
      results.push({ id, data: entry.raw });
    }
  });

  // Format a value for display
  const format = (val: any, depth = 0): string => {
    if (val === null || val === undefined) return '<span class="null">—</span>';
    if (typeof val === 'boolean') return `<span class="bool">${val}</span>`;
    if (typeof val === 'number') return `<span class="num">${val}</span>`;
    if (typeof val === 'string') return `<span class="str">${escapeHtml(val)}</span>`;
    if (Array.isArray(val)) {
      if (val.length === 0) return '<span class="null">[ ]</span>';
      if (depth > 2) return `<span class="num">[Array: ${val.length}]</span>`;
      return `<ul>${val.map(v => `<li>${format(v, depth + 1)}</li>`).join('')}</ul>`;
    }
    if (typeof val === 'object') {
      if (depth > 2) return '<span class="num">{…}</span>';
      const entries = Object.entries(val);
      if (entries.length === 0) return '<span class="null">{ }</span>';
      return `<table>${entries.map(([k, v]) => `
        <tr><td class="key">${escapeHtml(k)}</td><td>${format(v, depth + 1)}</td></tr>
      `).join('')}</table>`;
    }
    return escapeHtml(String(val));
  };

  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const sectionNames: Record<string, string> = {
    dns: 'DNS Records', ssl: 'SSL Certificate', headers: 'HTTP Headers',
    hsts: 'HSTS', cookies: 'Cookies', ports: 'Open Ports',
    'http-security': 'HTTP Security', threats: 'Known Threats',
    robots: 'Robots.txt', firewall: 'Firewall', whois: 'Whois',
    dnssec: 'DNSSEC', 'mail-config': 'Mail Config', redirects: 'Redirects',
    status: 'Status', ip: 'IP Info', quality: 'Quality', location: 'Location',
    server: 'Server Info', txt: 'TXT Records', 'social-tags': 'Social Tags',
    security: 'Security.txt', screenshot: 'Screenshot',
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SiteScan Report — ${escapeHtml(siteName)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Courier New', monospace; background: #f5f5f5; color: #1a1a1a; padding: 2rem; }
    header { background: #fff; border-left: 6px solid #4a7700; padding: 1.5rem 2rem; margin-bottom: 2rem; border-radius: 4px; box-shadow: 2px 2px 0 #d0d0d0; }
    header h1 { color: #4a7700; font-size: 2rem; }
    header p { color: #555; font-size: 0.9rem; margin-top: 0.5rem; }
    .badge { display: inline-block; background: #4a7700; color: #fff; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; margin-left: 0.5rem; vertical-align: middle; }
    .section { background: #fff; border-radius: 4px; box-shadow: 2px 2px 0 #d0d0d0; margin-bottom: 1.5rem; overflow: hidden; }
    .section-header { background: #f0f0f0; border-bottom: 1px solid #d0d0d0; padding: 0.8rem 1.5rem; font-weight: bold; font-size: 0.95rem; color: #4a7700; }
    .section-body { padding: 1.2rem 1.5rem; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
    td { padding: 0.3rem 0.6rem; border-bottom: 1px solid #eee; vertical-align: top; }
    .key { color: #666; white-space: nowrap; font-weight: 600; width: 200px; }
    .str { color: #1a6e2e; }
    .num { color: #0066bb; }
    .bool { color: #cc6600; font-weight: bold; }
    .null { color: #999; font-style: italic; }
    ul { padding-left: 1.2rem; }
    li { margin-bottom: 0.2rem; font-size: 0.85rem; }
    footer { text-align: center; color: #999; font-size: 0.8rem; margin-top: 2rem; }
    .no-data { color: #999; font-style: italic; font-size: 0.9rem; }
    h2 { font-size: 1rem; }
  </style>
</head>
<body>
  <header>
    <h1>🌐 SiteScan Report <span class="badge">${results.length} checks</span></h1>
    <p><strong>Target:</strong> ${escapeHtml(siteName)} &nbsp;|&nbsp; <strong>Generated:</strong> ${timestamp} &nbsp;|&nbsp; <strong>Tool:</strong> SiteScan</p>
  </header>

  ${results.length === 0 ? '<p class="no-data">No scan results were available to include in this report.</p>' :
    results.map(({ id, data }) => `
    <div class="section">
      <div class="section-header">${escapeHtml(sectionNames[id] || id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))}</div>
      <div class="section-body">${format(data)}</div>
    </div>
  `).join('')}

  <footer>
    Generated by <strong>SiteScan</strong> &mdash; <a href="https://github.com/Subhan-Haider/site-scan">github.com/Subhan-Haider/site-scan</a>
  </footer>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sitescan-report-${siteName}-${Date.now()}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Downloads raw scan data as a JSON file.
 */
export const downloadJson = (address: string, jobsState: Record<string, any>) => {
  const data: Record<string, any> = {};
  Object.entries(jobsState).forEach(([id, entry]: [string, any]) => {
    if (entry?.state === 'success' && entry.raw !== undefined) {
      data[id] = entry.raw;
    }
  });
  const blob = new Blob([JSON.stringify({ target: address, generated: new Date().toISOString(), results: data }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sitescan-${address.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
