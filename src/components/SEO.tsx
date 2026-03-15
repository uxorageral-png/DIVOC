import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

const SITE_NAME = 'DIVOC';
const DEFAULT_DESCRIPTION = 'DIVOC - Streetwear premium com raízes africanas. Veste a tua identidade. Hoodies, T-Shirts e mais.';
const DEFAULT_IMAGE = 'https://www.divocluxury.com/og-image.png';
const BASE_URL = 'https://www.divocluxury.com';

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  type = 'website',
  image = DEFAULT_IMAGE,
  noindex = false,
  jsonLd,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Streetwear Premium com Raízes Africanas`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
