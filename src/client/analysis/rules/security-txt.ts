import type { Analyzer } from '../types';

// Flag missing security.txt and surface useful presence detail
const securityTxt: Analyzer = (d) => {
  if (!d.isPresent) {
    return [
      {
        severity: 'warning',
        title: 'No security.txt published',
        detail: 'Consider adding a security.txt file so researchers can report issues to you securely',
      },
    ];
  }
  const out: ReturnType<Analyzer> = [{ severity: 'pass', title: 'security.txt found' }];
  if (!d.isPgpSigned) {
    out.push({
      severity: 'info',
      title: 'security.txt not PGP signed',
      detail: "Consider digitally signing your security.txt file to prove it's authentic",
    });
  }
  return out;
};

export default securityTxt;
