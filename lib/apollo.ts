import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: `${API_URL}/graphql`,
      credentials: "same-origin",
    }),
    cache: new InMemoryCache(),
  });

let apolloClient: ApolloClient<NormalizedCacheObject>;
export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  if (typeof window === "undefined") return _apolloClient;
  apolloClient = apolloClient ?? _apolloClient;
  return _apolloClient;
};
const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
export default useApollo;
