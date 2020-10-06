import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "../styles/theme";

require("../node_modules/codemirror/lib/codemirror.css");
require("../node_modules/codemirror/theme/idea.css");

export default class MyApp extends App {
    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');

        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }

    }

    static async getInitialProps({Component, router, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return {pageProps}
    }

    render() {
        const {Component, pageProps, router} = this.props;

        return (
            <React.Fragment>
                <Head>
                    <title>Scheemy</title>
                    <meta
                        key="description"
                        name="description"
                        content="Shopify schema editor"
                    />
                </Head>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} key={router.route}/>
                </ThemeProvider>
            </React.Fragment>
        );
    }
}