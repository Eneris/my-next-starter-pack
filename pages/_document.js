import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

import stylesheet from '../styles/main.scss'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <title>{this.props.pageTitle}</title>
          {this.props.styleTags}
          <meta charSet="utf-8" />
          <meta name="viewport" content={'user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height'} />
        </Head>
        <body>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
