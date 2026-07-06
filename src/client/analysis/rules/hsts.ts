import type { Analyzer } from '../types';

const MIN_MAX_AGE = 10886400;

// Check HSTS presence, max-age, includeSubDomains, preload
const hsts: Analyzer = (d) => {
  if (!d.hstsHeader) {
    return [
      {
        severity: 'issue',
        title: 'No HSTS header',
        detail: 'Missing a setting that forces browsers to use a secure connection (HSTS)',
      },
    ];
  }
  const header = String(d.hstsHeader).toLowerCase();
  const maxAge = parseInt(header.match(/max-age=(\d+)/)?.[1] || '0', 10);
  const out: ReturnType<Analyzer> = [];
  if (maxAge < MIN_MAX_AGE) {
    out.push({
      severity: 'warning',
      title: `HSTS max-age below ${MIN_MAX_AGE}`,
      detail: `The max-age is too short (${maxAge}), make it longer for better security`,
    });
  }
  if (!header.includes('includesubdomains')) {
    out.push({
      severity: 'warning',
      title: 'HSTS missing includeSubDomains',
      detail: 'Missing the includeSubDomains setting, which protects your other subdomains',
    });
  }
  if (!header.includes('preload')) {
    out.push({
      severity: 'info',
      title: 'HSTS missing preload directive',
      detail: 'Consider adding the preload setting for extra security',
    });
  }
  if (d.compatible) out.push({ severity: 'pass', title: 'HSTS preload compatible' });
  return out;
};

export default hsts;
