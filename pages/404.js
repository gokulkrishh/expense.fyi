import Head from 'next/head';

const title = '404 Page Not Found – Expense Tracker';
const metaDescription = '';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        {/* <link href="/static/images/icon.png" rel="shortcut icon" /> */}
      </Head>

      <h1>Page not found</h1>
      <br />
      <h3>
        <span role="img" aria-label="Pensive emoji">
          😔{' '}
        </span>
        We couldn’t find what you were looking for.
      </h3>
      <br />
    </>
  );
}
