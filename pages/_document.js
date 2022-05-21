import Document, {Html, Head, Main, NextScript} from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://curiosity.vercel.app" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
