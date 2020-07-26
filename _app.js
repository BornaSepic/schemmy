import React from 'react';
import App from 'next/app';
import Layout from "../components/layout/Layout";
import {PageTransition} from 'next-page-transitions';

export default class MyApp extends App {

    render() {
        const {Component, pageProps, router} = this.props;

        return (
            <React.Fragment>
                <Layout>
                    <PageTransition timeout={500} classNames="page-transition">
                        <Component {...pageProps} key={router.route}/>
                    </PageTransition>
                </Layout>
            </React.Fragment>
        );
    }
}
