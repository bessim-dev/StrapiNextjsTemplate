import { ApolloProvider } from "@apollo/client";
import React from "react";
import Layout from "../components/Layout";
import useApollo from "../lib/apollo";
const App = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};
export default App;
