import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* Load runtime environment variables before the app scripts */}
        <Script src="/runtime-env.js" strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
