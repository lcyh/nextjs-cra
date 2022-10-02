import '../styles/globals.css'
import App from 'next/app'
import type { AppProps, AppContext } from 'next/app'
import Head from 'next/head'
import { Layout, ILayoutProps } from '@/components/layout'
import code from "@/public/code.png";
import axios from "axios";
import { LOCALDOMAIN } from "@/utils";

//_app.tsx 是所有页面的入口页面
function MyApp(data: AppProps & ILayoutProps) {
    const { Component, pageProps, navbarData, footerData } = data;
    return (
        <div>
            <Head>
                <title>A Demo for 《深入浅出SSR官网开发指南》</title>
                <meta name="description" content="A Demo for 《深入浅出SSR官网开发指南》" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout navbarData={navbarData} footerData={footerData}>
                <Component {...pageProps} />
            </Layout>
        </div>
    )
}
MyApp.getInitialProps = async (context: AppContext) => {
    const pageProps = await App.getInitialProps(context);
    console.log('pageProps', pageProps);
    const { data = {} } = await axios.get(`${LOCALDOMAIN}/api/layout`);

    return {
        ...pageProps,
        ...data,
    };
};

export default MyApp
