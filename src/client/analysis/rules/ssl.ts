import type { Analyzer } from '../types';
import { daysUntil } from '../helpers';

// Check certificate validity and expiry window
const ssl: Analyzer = (d) => {
  const out: ReturnType<Analyzer> = [];
  if (d.isValid === false) {
    out.push({
      severity: 'critical',
      title: 'SSL certificate invalid',
      detail: d.authError || 'Certificate failed validation',
    });
  } else if (d.isValid === true) {
    out.push({ severity: 'pass', title: 'SSL certificate valid' });
  }
  const days = daysUntil(d.valid_to);
  if (days === null) return out;
  if (days < 0) {
    out.push({
      severity: 'critical',
      title: 'SSL certificate expired',
      detail: `The certificate expired ${-days} day(s) ago`,
    });
  } else if (days <= 7) {
    out.push({
      severity: 'critical',
      title: 'SSL certificate expiring within a week',
      detail: `The domain expires in ${days} day(s) and needs to be renewed immediately`,
    });
  } else if (days <= 14) {
    out.push({
      severity: 'issue',
      title: 'SSL certificate expiring soon',
      detail: `The certificate expires in ${days} day(s), remember to renew it soon`,
    });
  } else if (days <= 30) {
    out.push({
      severity: 'warning',
      title: 'SSL certificate renews within a month',
      detail: `The domain expires in ${days} day(s)`,
    });
  }
  return out;
};

export default ssl;
