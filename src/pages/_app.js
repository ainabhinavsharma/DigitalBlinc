import '../styles/globals.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Digital Blinc</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#4F46E5" />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        <Component {...pageProps} />
      </div>
    </>
  );
}