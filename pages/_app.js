import { ThemeProvider } from 'next-themes';

import Layout from 'components/Layout';

import 'styles/globals.css';

function MyApp({ Component, pageProps, ...otherProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} {...otherProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
