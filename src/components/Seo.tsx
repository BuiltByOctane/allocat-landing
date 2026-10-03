import { Head } from "vite-react-ssg";

const SITE = "https://grow.allocat.xyz";

interface SeoProps {
  title: string;
  description: string;
  /** Route path, e.g. "/" or "/story". */
  path: string;
}

/**
 * Per-page title, description, canonical and social tags. Prerendered into each
 * route's HTML by vite-react-ssg, so crawlers see the right head without JS.
 * index.html deliberately carries none of these, to avoid duplicates.
 */
const Seo = ({ title, description, path }: SeoProps) => {
  const url = `${SITE}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
};

export default Seo;
