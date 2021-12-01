import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import {useMemo} from "react";

const createApolloClient = () => {

    return new ApolloClient({
        link: new HttpLink({
            uri:'https://integral-cougar-77.hasura.app/v1/graphql',
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': 'wIsvSNSN13AaxRMCB65JZYpU6Bl8O0UUPTpF3zccNzQa6M7Al0NNNpKnqKB5kLEK'
            }
        }),
        cache: new InMemoryCache()
    })

}


let apolloClient: ApolloClient<any>;

export default function initializeApollo(initialState:any[] = [] ) {
    const _apolloClient = apolloClient ?? createApolloClient()

    if (initialState) {
        // fetch the cache of client
        const existingCache = _apolloClient.extract();
        // restore the cache
        _apolloClient.cache.restore({...existingCache, ...initialState});
    }

    // if mode is ssr
    if (typeof window === 'undefined') return _apolloClient

    // create client once on frontend
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;

}

export function useApollo(initialState:any) {
    return useMemo(() => initializeApollo(initialState), [initialState])

}
