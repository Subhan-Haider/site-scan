import type { APIRoute } from 'astro';

const pages = [
  '',
  'about',
  'check',
  'docs',
  'blog',
  'privacy',
  'terms',
  'self-hosted-setup',
  'blog/hello-world',
  'blog/importance-of-dnssec',
  'blog/protecting-against-bots',
];

export const GET: APIRoute = async ({ site }) => {
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
        <url>
          <loc>${site ? site.origin : 'https://site-scan.subhan.tech'}/${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
      `
        )
        .join('')}
    </urlset>
  `.trim();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
