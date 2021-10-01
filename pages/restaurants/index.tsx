import React, { useState } from "react";
import { Col, Input, InputGroup, InputGroupAddon, Row } from "reactstrap";
import RestaurantList from "../../components/RestaurantList";
import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "../../lib/apollo";

const RESTAURANTS_QUERY = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;
function Restaurants() {
  const [query, updateQuery] = useState("");
  const { loading, error, data } = useQuery(RESTAURANTS_QUERY);
  if (error) return <p>Error loading restaurants</p>;
  if (loading) return <h1>Fetching</h1>;
  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <div className="search">
            <InputGroup>
              <InputGroupAddon addonType="append"> Search </InputGroupAddon>
              <Input
                onChange={(e) =>
                  updateQuery(e.target.value.toLocaleLowerCase())
                }
                value={query}
              />
            </InputGroup>
          </div>
          <RestaurantList search={query} data={data} />
        </Col>
      </Row>
      <style jsx>
        {`
          .search {
            margin: 20px;
            width: 500px;
          }
        `}
      </style>
    </div>
  );
}
export async function getStaticProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: RESTAURANTS_QUERY,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
export default Restaurants;
