import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

import Layout from 'components/Layout';

import 'styles/globals.css';

function MyApp({ Component, pageProps, ...otherProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} {...otherProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
