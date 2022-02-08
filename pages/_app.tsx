import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AdminLayout from '../components/adminLayout';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import { useState } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          colorScheme: colorScheme,
        }}>
        <AdminLayout toggleColorScheme={toggleColorScheme}>
          <Component {...pageProps} />
        </AdminLayout>
      </MantineProvider>
    </>
  );
}

export default MyApp;
