import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AdminLayout from '../components/adminLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  );
}

export default MyApp;
