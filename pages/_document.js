import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'


export default class MyDocument extends Document {
    // static async getInitialProps(ctx) {
    //     const initialProps = await Document.getInitialProps(ctx);
    //     return {...initialProps}
    // }

    render() {
        return (
            <html>
            <Head>
                <meta charSet="utf-8"/>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0"
                />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css"/>
                {/*<link rel="stylesheet" href="https://cdn.plyr.io/3.5.2/plyr.css" />*/}
                <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css'
                      integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ'
                      crossOrigin='anonymous'/>
            </Head>
            <body>
            <Main/>
            <script defer src="https://code.getmdl.io/1.3.0/material.min.js"/>
            <NextScript/>
            </body>
            </html>
        )
    }
}
