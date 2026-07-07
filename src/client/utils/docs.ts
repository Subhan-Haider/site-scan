export interface Doc {
  id: string;
  title: string;
  description: string;
  use: string;
  resources: string[] | { title: string; link: string }[];
  screenshot?: string;
}

const docs: Doc[] = [
  {
    id: 'ssl',
    title: 'SSL Certificate',
    description: 'Checks the SSL/TLS certificate for the given domain. Shows the issuer, validity dates, subject, and whether the certificate is currently valid and trusted.',
    use: 'Ensure your certificate is valid and not expired. An expired or self-signed certificate will cause browser warnings for your visitors.',
    resources: [
      { title: 'SSL Labs', link: 'https://www.ssllabs.com/ssltest/' },
      { title: 'Mozilla SSL Configuration', link: 'https://ssl-config.mozilla.org/' },
    ],
  },
  {
    id: 'dns',
    title: 'DNS Records',
    description: 'Fetches all publicly available DNS records for the domain, including A, AAAA, CNAME, MX, NS, TXT, and SOA records.',
    use: 'Verify your DNS configuration is correct. Check that your MX records point to the right mail servers and your A records resolve to the expected IP addresses.',
    resources: [
      { title: 'DNS Checker', link: 'https://dnschecker.org/' },
      { title: 'MXToolbox DNS Lookup', link: 'https://mxtoolbox.com/DNSLookup.aspx' },
    ],
  },
  {
    id: 'headers',
    title: 'HTTP Headers',
    description: 'Fetches and displays the HTTP response headers returned by the server. Highlights security-relevant headers.',
    use: 'HTTP headers control how browsers and other clients interact with your site. Security headers such as Strict-Transport-Security, Content-Security-Policy, and X-Frame-Options protect your users from a variety of attacks.',
    resources: [
      { title: 'OWASP Secure Headers Project', link: 'https://owasp.org/www-project-secure-headers/' },
      { title: 'SecurityHeaders.com', link: 'https://securityheaders.com/' },
    ],
  },
  {
    id: 'http-security',
    title: 'HTTP Security',
    description: 'Analyzes the HTTP response to check for the presence of critical security headers like Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.',
    use: 'Missing security headers are a common finding in web application security audits. Each header helps defend against a specific class of attack (e.g., clickjacking, MIME sniffing, data injection).',
    resources: [
      { title: 'MDN HTTP Headers Reference', link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers' },
    ],
  },
  {
    id: 'hsts',
    title: 'HSTS',
    description: 'Checks if HTTP Strict Transport Security (HSTS) is configured. HSTS tells browsers to only communicate with the server over HTTPS.',
    use: 'Without HSTS, users who type your domain name (without "https://") may be silently downgraded to HTTP on their first visit, making them vulnerable to man-in-the-middle attacks.',
    resources: [
      { title: 'MDN HSTS Guide', link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security' },
      { title: 'HSTS Preload List', link: 'https://hstspreload.org/' },
    ],
  },
  {
    id: 'ports',
    title: 'Open Ports',
    description: 'Scans a predefined list of common service ports to determine which are open and accepting connections on the target host.',
    use: 'Open ports reveal which services are running on a server. Unnecessary open ports increase the attack surface. If a port you did not expect is open, it may indicate a misconfiguration or a compromised service.',
    resources: [
      { title: 'Shodan', link: 'https://www.shodan.io/' },
    ],
  },
  {
    id: 'robots-txt',
    title: 'Robots.txt',
    description: 'Fetches and parses the robots.txt file, which tells web crawlers which parts of the site to index and which to avoid.',
    use: 'Review robots.txt to ensure you are not accidentally blocking search engines from crawling important pages, or exposing sensitive path structures that you intended to keep quiet.',
    resources: [
      { title: 'Google Robots.txt Guide', link: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro' },
    ],
  },
  {
    id: 'dnssec',
    title: 'DNSSEC',
    description: 'Checks whether DNSSEC (DNS Security Extensions) is enabled for the domain. DNSSEC adds a layer of cryptographic verification to DNS responses.',
    use: 'Without DNSSEC, DNS responses can be forged, which could redirect your users to a malicious server without their knowledge (DNS spoofing/cache poisoning).',
    resources: [
      { title: 'ICANN DNSSEC Overview', link: 'https://www.icann.org/resources/pages/dnssec-what-is-it-why-important-2019-03-05-en' },
    ],
  },
  {
    id: 'firewall',
    title: 'Firewall Detection',
    description: 'Attempts to identify whether the target site is protected by a Web Application Firewall (WAF), such as Cloudflare, AWS WAF, or Sucuri.',
    use: 'A WAF protects your application from common exploits and bots. Identifying which WAF is in use helps with understanding the security posture of the target.',
    resources: [
      { title: 'OWASP WAF Overview', link: 'https://owasp.org/www-community/Web_Application_Firewall' },
    ],
  },
  {
    id: 'mail-config',
    title: 'Mail Configuration',
    description: 'Checks the domain\'s email security configuration, including SPF (Sender Policy Framework), DKIM, and DMARC records. These standards help prevent email spoofing.',
    use: 'Without proper SPF/DMARC/DKIM configuration, malicious actors can send emails that appear to come from your domain, damaging your brand and misleading your users.',
    resources: [
      { title: 'MXToolbox Email Health', link: 'https://mxtoolbox.com/emailhealth/' },
      { title: 'DMARC Guide', link: 'https://dmarc.org/overview/' },
    ],
  },
  {
    id: 'security-txt',
    title: 'Security.txt',
    description: 'Checks for the presence of a security.txt file at the standard location (/.well-known/security.txt). This file helps security researchers contact the right team to disclose vulnerabilities.',
    use: 'Having a security.txt file makes it easier for ethical hackers to report vulnerabilities in your site, reducing the time it takes for you to patch critical issues.',
    resources: [
      { title: 'securitytxt.org', link: 'https://securitytxt.org/' },
    ],
  },
  {
    id: 'threats',
    title: 'Known Threats',
    description: 'Checks the domain and IP against public threat intelligence databases to see if it has been flagged for malware, phishing, or other malicious activity.',
    use: 'If your site appears on a blocklist, users with antivirus software or secure browsers may be warned away from visiting it. This check helps you identify and resolve blocklist entries.',
    resources: [
      { title: 'VirusTotal', link: 'https://www.virustotal.com/' },
      { title: 'Google Safe Browsing', link: 'https://safebrowsing.google.com/' },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    description: 'Inspects the HTTP cookies set by the server for security attributes, including HttpOnly, Secure, and SameSite flags.',
    use: 'Insecure cookies (missing HttpOnly or Secure flags) can be stolen via cross-site scripting (XSS) attacks or transmitted over unencrypted HTTP connections, exposing user sessions.',
    resources: [
      { title: 'MDN Cookies Guide', link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies' },
    ],
  },
  {
    id: 'redirects',
    title: 'Redirects',
    description: 'Traces the full chain of HTTP redirects from the initial URL to the final destination, including all intermediate hops.',
    use: 'Unnecessary redirect chains slow down your page load time. This check also helps verify that your HTTP → HTTPS redirect is configured correctly.',
    resources: [
      { title: 'Google on Redirects', link: 'https://developers.google.com/search/docs/crawling-indexing/301-redirects' },
    ],
  },
  {
    id: 'quality',
    title: 'Quality Check',
    description: 'Runs a series of basic quality and performance checks against the URL, evaluating page size, load time, and accessibility signals.',
    use: 'Poor performance directly impacts user experience and SEO rankings. Use this check to identify quick wins for speeding up your website.',
    resources: [
      { title: 'Google PageSpeed Insights', link: 'https://pagespeed.web.dev/' },
      { title: 'WebPageTest', link: 'https://www.webpagetest.org/' },
    ],
  },
];

export default docs;
