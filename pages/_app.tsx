import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {UserProvider} from "@auth0/nextjs-auth0";
import Header from '../components/partials/Header'
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return <UserProvider loginUrl={"/api/auth/login"} profileUrl={"/api/auth/me"}>
    <Head>
      <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <title>FoodFactory | Because eating is a pleasure</title>
    </Head>
    <Header/>
    <Component {...pageProps} />
  </UserProvider>
}

export default MyApp
