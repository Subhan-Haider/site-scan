import fs from 'fs';
import path from 'path';

const rulesDir = path.join(process.cwd(), 'src/client/analysis/rules');

const replacements = {
  // block-lists
  'Listed by ${names}': 'This site was flagged on these blocklists: ${names}',

  // dnssec
  'Sign DNS records to prevent spoofing and cache poisoning': 'Enable DNSSEC to prevent attackers from sending visitors to a fake version of your site',

  // firewall
  'Consider Cloudflare, AWS WAF or similar to filter malicious traffic': 'Consider using a firewall (like Cloudflare or AWS) to block malicious traffic',

  // headers
  'Value: ${String(val).slice(0, 80)}': 'Value: ${String(val).slice(0, 80)}',

  // hsts
  'Add Strict-Transport-Security to enforce HTTPS for clients': 'Missing a setting that forces browsers to use a secure connection (HSTS)',
  'Current max-age is ${maxAge}, raise it for preload eligibility': 'The max-age is too short (${maxAge}), make it longer for better security',
  'Add includeSubDomains to protect every subdomain': 'Missing the includeSubDomains setting, which protects your other subdomains',
  'Add preload to qualify for the HSTS preload list': 'Consider adding the preload setting for extra security',

  // http-security
  'Set the ${label} response header': 'Consider adding the ${label} setting to improve security',
  'Consider adding the ${label} response header': 'Consider adding the ${label} setting to improve security',

  // mail-config
  'Publish v=spf1 to authorise legitimate mail senders': 'Add an SPF record so emails from your domain are trusted',
  'Tighten the SPF policy to ~all or -all': 'Update your SPF policy to block unauthorized senders',
  'Publish v=DMARC1 on _dmarc subdomain to prevent spoofing': 'Add a DMARC record to prevent email spoofing',
  'Move from p=none to p=quarantine or p=reject when ready': 'Update your DMARC policy to reject or quarantine bad emails',
  'Publish a DKIM key so receivers can verify message signatures': 'Add a DKIM record so email receivers can verify your messages',

  // ports
  'Close it or restrict access by firewall if not required': "Consider closing this port if you aren't using it to improve security",

  // redirects
  'Collapse intermediate redirects to reduce latency': 'You have too many redirects, which slows down your site',
  'Add a permanent redirect from http:// to https://': 'Make sure to automatically redirect visitors to the secure https:// version of your site',

  // robots-txt
  'Confirm this is intentional, otherwise search engines will not index the site': "Make sure this is intentional, as search engines won't show your site in results",

  // security-txt
  'Add /.well-known/security.txt with disclosure contact info': 'Consider adding a security.txt file so researchers can report issues to you securely',
  'Sign the file to let researchers verify authenticity': "Consider digitally signing your security.txt file to prove it's authentic",

  // server-info
  '${cves}${more}. Patch affected services or block at the firewall': '${cves}${more}. Make sure to update your server software to fix these vulnerabilities',

  // social-tags
  'Add ${missing.join("': 'Add these tags to improve how your site looks when shared on social media: ${missing.join("',

  // ssl
  'Expired ${-days} day(s) ago': 'The certificate expired ${-days} day(s) ago',
  'Expires in ${days} day(s), renew immediately': 'The certificate expires in ${days} day(s) and needs to be renewed immediately',
  'Expires in ${days} day(s), schedule renewal': 'The certificate expires in ${days} day(s), remember to renew it soon',
  'Expires in ${days} day(s)': 'The certificate expires in ${days} day(s)',

  // status
  'Investigate server performance, caching or CDN coverage': 'Your site is responding slowly. You might want to look into performance improvements',

  // threats
  'Site flagged for malware, phishing or unwanted software': 'This site was flagged for malware, phishing, or other unwanted software',

  // tls-client-compat
  '${sample}${more}. Drop legacy ciphers/protocols only after weighing reach': "${sample}${more}. These older clients won't be able to connect to your site",

  // tls-connection
  'Disable TLS 1.0 and 1.1 on the server': 'You should disable older, insecure TLS versions like 1.0 and 1.1',
  'Prefer ECDHE or DHE cipher suites': 'Consider updating your server to prefer stronger encryption methods',
  'Enable OCSP stapling to speed up cert revocation checks': 'Consider enabling OCSP stapling to slightly speed up secure connections',

  // tls-security-audit
  'Review cipher suites, protocol versions and key strength': "Consider reviewing your server's security settings to improve your score",

  // txt-records
  'Replace +all/?all with ~all or -all to reject spoofed mail': 'Update your SPF record to block unauthorized email senders',

  // whois
  'Expired ${-days} day(s) ago, renew before it drops': 'The domain expired ${-days} day(s) ago! Renew it immediately before you lose it',
  'Expires in ${days} day(s), renew immediately': 'The domain expires in ${days} day(s) and needs to be renewed immediately',
  'Expires in ${days} day(s)': 'The domain expires in ${days} day(s)'
};

const files = fs.readdirSync(rulesDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
  const filePath = path.join(rulesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [oldStr, newStr] of Object.entries(replacements)) {
    // Only target strings within `detail: ...`
    // We escape special characters in oldStr for the regex except for template variables
    // A simpler way: just replace the old string with the new string globally.
    // Because these strings are mostly unique to details.
    if (content.includes(oldStr)) {
      content = content.split(oldStr).join(newStr);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
