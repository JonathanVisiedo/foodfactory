import {useState} from "react";
import type {AppProps} from 'next/app'
import {UserProvider} from "@auth0/nextjs-auth0";
import Layout from '../components/partials/Layout'
import '../styles/global.scss'
import { ApolloProvider } from "@apollo/client";
import {useApollo} from "../lib/apollo";

function MyApp({Component, pageProps}: AppProps) {

    const client = useApollo(pageProps.initialApolloProps)

    return <UserProvider>
        <ApolloProvider client={client}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    </UserProvider>

}

export default MyApp
