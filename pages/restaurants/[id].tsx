import { gql, useQuery } from "@apollo/client";

import { initializeApollo } from "../../lib/apollo";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;
function Restaurant({ id }) {
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id },
  });

  if (error) return <p>"Error Loading Dishes"</p>;
  if (loading) return <h1>Loading ...</h1>;
  if (data.restaurant) {
    const { restaurant } = data;
    return (
      <>
        <h1>{restaurant.name}</h1>
        <Row>
          {restaurant.dishes.map((res) => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Button outline color="primary">
                    + Add To Cart
                  </Button>

                  <style jsx>
                    {`
                      a {
                        color: white;
                      }
                      a:link {
                        text-decoration: none;
                        color: white;
                      }
                      .container-fluid {
                        margin-bottom: 30px;
                      }
                      .btn-outline-primary {
                        color: #007bff !important;
                      }
                      a:hover {
                        color: white !important;
                      }
                    `}
                  </style>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  }
  return <h1>Add Dishes</h1>;
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GET_RESTAURANT_DISHES,
    variables: { id },
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      id,
    },
  };
}
export default Restaurant;
