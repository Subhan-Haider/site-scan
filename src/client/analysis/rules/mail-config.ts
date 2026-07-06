import type { Analyzer } from '../types';

// Locate first TXT record matching prefix (case-insensitive), null when absent
const findTxt = (records: string[][], prefix: string): string | null => {
  if (!Array.isArray(records)) return null;
  const re = new RegExp(`^${prefix}`, 'i');
  for (const chunks of records) {
    const full = Array.isArray(chunks) ? chunks.join('') : String(chunks);
    if (re.test(full)) return full;
  }
  return null;
};

// Audit SPF, DMARC, DKIM presence and DMARC policy strength
const mailConfig: Analyzer = (d) => {
  const txt = d.txtRecords || [];
  const out: ReturnType<Analyzer> = [];

  const spf = findTxt(txt, 'v=spf1');
  if (!spf) {
    out.push({
      severity: 'issue',
      title: 'No SPF record found',
      detail: 'Add an SPF record so emails from your domain are trusted',
    });
  } else if (/[+?]all\b/i.test(spf)) {
    out.push({
      severity: 'warning',
      title: 'SPF policy permits unauthorised senders',
      detail: 'Update your SPF policy to block unauthorized senders',
    });
  } else {
    out.push({ severity: 'pass', title: 'SPF record published' });
  }

  const dmarc = findTxt(txt, 'v=DMARC1');
  if (!dmarc) {
    out.push({
      severity: 'issue',
      title: 'No DMARC record found',
      detail: 'Add a DMARC record to prevent email spoofing',
    });
  } else {
    const policy = dmarc.match(/p=(\w+)/i)?.[1]?.toLowerCase();
    if (policy === 'reject') out.push({ severity: 'pass', title: 'DMARC policy: reject' });
    else if (policy === 'quarantine')
      out.push({ severity: 'info', title: 'DMARC policy: quarantine' });
    else if (policy === 'none') {
      out.push({
        severity: 'warning',
        title: 'DMARC policy is monitor-only',
        detail: 'Update your DMARC policy to reject or quarantine bad emails',
      });
    }
  }

  // DKIM detection is best-effort: only flag absence as a soft warning
  const hasDkim = txt.some((r: string[]) => Array.isArray(r) && /v=DKIM1/i.test(r.join('')));
  if (!hasDkim) {
    out.push({
      severity: 'warning',
      title: 'No DKIM record discovered on common selectors',
      detail: 'Add a DKIM record so email receivers can verify your messages',
    });
  } else {
    out.push({ severity: 'pass', title: 'DKIM key found' });
  }

  return out;
};

export default mailConfig;
