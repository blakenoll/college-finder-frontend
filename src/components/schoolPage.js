import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";
import Info from "./schoolInfo";
import gql from "graphql-tag";
import Loader from "./loader";

const getSchoolByID = gql`
  query getSchoolByID($scid: Int!) {
    getSchoolByID(scid: $scid) {
      name
      www_url
      address
      city
      state
      scid
      zip
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

const SchoolPage = ({ match, className }) => {
  const props = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(100vw)" },
    config: config.default
  });
  return (
    <Query
      query={getSchoolByID}
      variables={{ scid: parseInt(match.params.id) }}
    >
      {({ loading, error, data }) => {
        if (loading) return <Loader />;
        if (error) {
          console.log(error);
          return <p>Error</p>;
        }
        const school = data.getSchoolByID;
        return (
          <AnimatedDiv style={props}>
            <BackButton to="/">Back</BackButton>
            <h1>{school.name}</h1>
            <p>{school.blurb}</p>
            <Info
              title="Total Enrolled"
              data={school.generalInfo.campus_enroll}
            />
            <Info
              title="Average freshmen GPA"
              data={school.academics.ave_fresh_GPA}
            />
            <Info title="Address" data={school.address} />
          </AnimatedDiv>
        );
      }}
    </Query>
  );
};

const BackButton = styled(Link)`
  padding: 10px 20px;
  background: linear-gradient(to top right, #267871, #136a8a);
  color: #eee;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 30px;
  display: inline-block;
  margin: 5px;
  width: auto;
  box-shadow: 0 7px 13px -3px rgba(45, 35, 66, 0.3),
    0 2px 4px 0 rgba(45, 35, 66, 0.4), inset 0 -2px 0 0 teal;
`;

const AnimatedDiv = styled(animated.div)`
  font-size: 1rem;
  h1 {
    color: #3a416f;
    font-size: 1.8rem;
  }
`;

export default SchoolPage;
