const generateReportHtml = (address: string, jobsState: Record<string, any>) => {
  const timestamp = new Date().toLocaleString();
  const siteName = (() => {
    try {
      const withScheme = /^https?:\/\//i.test(address) ? address : `https://${address}`;
      return new URL(withScheme).hostname.replace(/^www\./, '');
    } catch {
      return address;
    }
  })();

  // Skip duplicate/noisy sections
  const SKIP_IDS = new Set(['tls-client-compat']);

  // Keys to completely omit (raw cert PEM, byte arrays, massive chain data)
  const SKIP_KEYS = new Set(['raw', 'pubkey', 'data', 'certs', 'details']);

  const results: { id: string; data: any }[] = [];
  Object.entries(jobsState).forEach(([id, entry]: [string, any]) => {
    if (entry?.state === 'success' && entry.raw !== undefined && !SKIP_IDS.has(id)) {
      results.push({ id, data: entry.raw });
    }
  });

  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const truncateStr = (s: string, max = 120) =>
    s.length > max ? escapeHtml(s.substring(0, max)) + '<span class="trunc">…</span>' : escapeHtml(s);

  const format = (val: any, depth = 0, key = ''): string => {
    if (val === null || val === undefined) return '<span class="null">—</span>';

    // Skip noisy keys entirely
    if (SKIP_KEYS.has(key)) return '<span class="null skipped">[omitted]</span>';

    // Detect byte-array (Buffer-like): object with numeric keys 0,1,2...
    if (typeof val === 'object' && !Array.isArray(val) && val !== null) {
      const keys = Object.keys(val);
      if (keys.length > 10 && keys.every(k => !isNaN(Number(k)))) {
        return `<span class="null skipped">[binary data, ${keys.length} bytes]</span>`;
      }
    }

    if (typeof val === 'boolean') return `<span class="bool ${val ? 'pass' : 'fail'}">${val ? '✓ Yes' : '✗ No'}</span>`;
    if (typeof val === 'number') return `<span class="num">${val}</span>`;
    if (typeof val === 'string') {
      // Skip PEM certificates
      if (val.includes('-----BEGIN CERTIFICATE-----')) return '<span class="null skipped">[certificate omitted]</span>';
      return `<span class="str">${truncateStr(val)}</span>`;
    }
    if (Array.isArray(val)) {
      if (val.length === 0) return '<span class="null">[ ]</span>';
      // Sitemap or large link arrays — just show count + first few
      if (val.length > 15) {
        const preview = val.slice(0, 8).map(v => `<li>${format(v, depth + 1)}</li>`).join('');
        return `<ul>${preview}<li class="trunc">…and ${val.length - 8} more</li></ul>`;
      }
      if (depth > 2) return `<span class="num">[${val.length} items]</span>`;
      return `<ul>${val.map(v => `<li>${format(v, depth + 1)}</li>`).join('')}</ul>`;
    }
    if (typeof val === 'object') {
      if (depth > 3) return '<span class="num">{…}</span>';
      const entries = Object.entries(val).filter(([k]) => !SKIP_KEYS.has(k));
      if (entries.length === 0) return '<span class="null">{ }</span>';
      return `<table>${entries.map(([k, v]) => `
        <tr><td class="key">${escapeHtml(k)}</td><td>${format(v, depth + 1, k)}</td></tr>
      `).join('')}</table>`;
    }
    return truncateStr(String(val));
  };

  const sectionNames: Record<string, string> = {
    dns: 'DNS Records', ssl: 'SSL Certificate', headers: 'HTTP Headers',
    hsts: 'HSTS', cookies: 'Cookies', ports: 'Open Ports',
    'http-security': 'HTTP Security', threats: 'Known Threats',
    robots: 'Robots.txt', firewall: 'Firewall', whois: 'Whois',
    dnssec: 'DNSSEC', 'mail-config': 'Mail Config', redirects: 'Redirects',
    status: 'Status', ip: 'IP Info', quality: 'Quality', location: 'Location',
    server: 'Server Info', txt: 'TXT Records', 'social-tags': 'Social Tags',
    security: 'Security.txt', screenshot: 'Screenshot',
    'tls-connection': 'TLS Connection', 'tls-security-audit': 'TLS Security Audit',
    subdomains: 'Subdomains', archives: 'Archives', carbon: 'Carbon',
    'linked-pages': 'Linked Pages', 'block-lists': 'Block Lists',
    'open-ports': 'Open Ports', sitemap: 'Sitemap',
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SiteScan Report — ${escapeHtml(siteName)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: #f2f4f7; color: #1a1a1a; padding: 2rem; }

    /* Cover / Hero */
    .cover {
      background: linear-gradient(135deg, #1e3a00 0%, #4a7700 60%, #6aaa00 100%);
      border-radius: 12px;
      padding: 2.5rem 3rem;
      margin-bottom: 2rem;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }
    .cover-left h1 { font-size: 2.4rem; font-weight: 700; letter-spacing: -0.5px; }
    .cover-left h1 span { opacity: 0.7; font-size: 1.5rem; display: block; font-weight: 400; margin-top: 0.25rem; }
    .cover-meta { margin-top: 1rem; display: flex; gap: 1.5rem; flex-wrap: wrap; }
    .cover-meta-item { background: rgba(255,255,255,0.15); border-radius: 6px; padding: 0.4rem 0.9rem; font-size: 0.85rem; }
    .cover-meta-item strong { display: block; opacity: 0.7; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; }
    .cover-badge { background: rgba(255,255,255,0.2); border-radius: 50%; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center; flex-shrink: 0; }
    .cover-badge .num { font-size: 2rem; font-weight: 700; line-height: 1; }
    .cover-badge .label { font-size: 0.7rem; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.5px; }

    /* Sections */
    .sections-grid { display: grid; gap: 1.2rem; }
    .section { background: #fff; border-radius: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04); overflow: hidden; page-break-inside: avoid; }
    .section-header { background: #f8faf5; border-bottom: 2px solid #e8f0e0; padding: 0.85rem 1.5rem; font-weight: 700; font-size: 0.9rem; color: #4a7700; letter-spacing: 0.3px; display: flex; align-items: center; gap: 0.5rem; }
    .section-header::before { content: ''; display: inline-block; width: 8px; height: 8px; background: #4a7700; border-radius: 50%; flex-shrink: 0; }
    .section-body { padding: 1.2rem 1.5rem; overflow-x: auto; font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 0.82rem; }

    /* Data table */
    table { width: 100%; border-collapse: collapse; }
    tr:last-child td { border-bottom: none; }
    td { padding: 0.35rem 0.7rem; border-bottom: 1px solid #f0f0f0; vertical-align: top; line-height: 1.5; }
    .key { color: #555; white-space: nowrap; font-weight: 600; width: 200px; }
    .str { color: #1a6e2e; word-break: break-all; }
    .num { color: #0055cc; }
    .bool { color: #cc5500; font-weight: bold; }
    .null { color: #aaa; font-style: italic; }
    .pass { color: #1a7a1a; font-weight: 700; }
    .fail { color: #cc3300; font-weight: 700; }
    .skipped { color: #bbb; font-style: italic; font-size: 0.78rem; }
    .trunc { color: #aaa; font-style: italic; }

    ul { padding-left: 1.2rem; }
    li { margin-bottom: 0.25rem; }

    /* Screenshot section */
    .screenshot-wrap { text-align: center; padding: 1rem 0; }
    .screenshot-wrap img { max-width: 100%; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.12); }

    /* Footer */
    footer { text-align: center; color: #aaa; font-size: 0.78rem; margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid #e0e0e0; }
    footer a { color: #4a7700; text-decoration: none; }
    .no-data { color: #999; font-style: italic; font-size: 0.9rem; padding: 1rem; }

    @media print {
      body { background: #fff; padding: 0.5rem; }
      .cover { border-radius: 6px; }
      .section { box-shadow: none; border: 1px solid #ddd; }
    }
  </style>
</head>
<body>
  <div class="cover">
    <div class="cover-left">
      <h1>🌐 SiteScan Report <span>${escapeHtml(siteName)}</span></h1>
      <div class="cover-meta">
        <div class="cover-meta-item"><strong>Generated</strong>${timestamp}</div>
        <div class="cover-meta-item"><strong>Tool</strong>SiteScan</div>
        <div class="cover-meta-item"><strong>Status</strong>Complete</div>
      </div>
    </div>
    <div class="cover-badge">
      <div class="num">${results.length}</div>
      <div class="label">Checks</div>
    </div>
  </div>
  <div class="sections-grid">

  ${results.length === 0 ? '<p class="no-data">No scan results were available to include in this report.</p>' :
    results.map(({ id, data }) => {
      let bodyContent = '';
      if (id === 'screenshot' && data) {
        if (data.image) {
          bodyContent = `<div class="screenshot-wrap"><img src="data:image/png;base64,${data.image}" alt="Screenshot" /></div>`;
        } else if (data.data) {
          bodyContent = `<div class="screenshot-wrap"><img src="${data.data}" alt="Screenshot" /></div>`;
        } else {
          bodyContent = format(data);
        }
      } else {
        bodyContent = format(data);
      }
      return `
    <div class="section">
      <div class="section-header">${escapeHtml(sectionNames[id] || id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))}</div>
      <div class="section-body">${bodyContent}</div>
    </div>
      `;
    }).join('')}
  </div>

  <footer>
    Generated by <strong>SiteScan</strong> &mdash; <a href="https://github.com/Subhan-Haider/site-scan">github.com/Subhan-Haider/site-scan</a> &nbsp;|&nbsp; Created by <strong>Subhan Haider</strong>
  </footer>
</body>
</html>`;
};

/**
 * Generates and downloads a self-contained HTML report for a SiteScan analysis.
 */
export const downloadReport = (address: string, jobsState: Record<string, any>) => {
  const html = generateReportHtml(address, jobsState);
  const siteName = address.replace(/^https?:\/\//i, '').replace(/^www\./, '');
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
 * Opens a print dialog to save the report as PDF.
 */
export const printPdf = (address: string, jobsState: Record<string, any>) => {
  const html = generateReportHtml(address, jobsState);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.write('<script>window.onload = function() { window.print(); };</script>');
    printWindow.document.close();
  }
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
