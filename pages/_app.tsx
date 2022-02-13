import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider, ColorScheme } from '@mantine/core';
import { useState } from 'react';
import HtmlHead from '../components/htmlHead';

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <HtmlHead />
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          colorScheme: colorScheme,
          fontFamily: 'Open Sans',
          primaryColor: 'blue',
        }}>
        <>
          <Component {...pageProps} />
        </>
      </MantineProvider>
    </>
  );
}

export default MyApp;
