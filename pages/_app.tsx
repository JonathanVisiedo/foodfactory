import type {AppProps} from 'next/app'
import {UserProvider} from "@auth0/nextjs-auth0";
import Layout from '../components/partials/Layout'
import '../styles/global.scss'
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {useState} from "react";

function MyApp({Component, pageProps}: AppProps) {

    const createApolloClient = (secret: string|undefined) => {
        return new ApolloClient({
            link: new HttpLink({
                uri: "https://integral-cougar-77.hasura.app/v1/graphql",
                headers: {
                    "x-hasura-admin-secret": `${secret}`
                }
            }),
            cache: new InMemoryCache()
        });
    }

    const [client] = useState(createApolloClient(process.env.HASURA_APP_SECRET));

    return <UserProvider>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </UserProvider>

}

export default MyApp
