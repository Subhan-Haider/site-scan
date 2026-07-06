import type { Analyzer } from '../types';

// Lack of a detectable WAF is a hardening gap, not a hard fail
const firewall: Analyzer = (d) => {
  if (d.hasWaf) {
    return [{ severity: 'pass', title: `WAF detected: ${d.waf || 'unknown'}` }];
  }
  return [
    {
      severity: 'warning',
      title: 'No web application firewall detected',
      detail: 'Consider using a firewall (like Cloudflare or AWS) to block malicious traffic',
    },
  ];
};

export default firewall;
