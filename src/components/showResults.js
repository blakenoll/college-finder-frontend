import React from "react";
import { Query } from "react-apollo";
import { useTrail, animated, config } from "react-spring";
import gql from "graphql-tag";
import { useStateValue } from "./state";
import SchoolCard from "./schoolCard";
import Loader from "./loader";

const getData = gql`
  query FindSchools($zip: String!, $miles: String!) {
    findWithinDistance(zip: $zip, miles: $miles) {
      name
      www_url
      address
      city
      state
      scid
      zip
      distance
      blurb
      geo {
        lng
        lat
      }
      generalInfo {
        campus_enroll
      }
      academics {
        ave_fresh_GPA
        majors_highest_1
      }
    }
  }
`;

const Results = ({ distance, zipcode }) => {
  const [{ queryResults }, dispatch] = useStateValue();
  const length = queryResults.findWithinDistance
    ? queryResults.findWithinDistance.length
    : 0;
  const trail = useTrail(length, {
    config: config.default,
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.95)" }
  });

  // if global state contains results dont fetch new data
  if (queryResults.findWithinDistance) {
    return (
      <div>
        <p style={{ fontSize: "1.2rem" }}>
          {queryResults.findWithinDistance.length} results
        </p>
        {trail.map((props, index) => (
          <animated.div
            key={queryResults.findWithinDistance[index].scid}
            style={props}
          >
            <SchoolCard school={queryResults.findWithinDistance[index]} />
          </animated.div>
        ))}
      </div>
    );
  } else {
    return (
      <Query query={getData} variables={{ zip: zipcode, miles: distance }}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) {
            console.log(error);
            return <p>Error</p>;
          }
          // if new data is fetched update global state
          dispatch({ type: "changeQuery", newQueryResults: data });
          return "";
        }}
      </Query>
    );
  }
};

export default Results;
