import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
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
          <div className={className}>
            <Link to="/">Back</Link>
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
          </div>
        );
      }}
    </Query>
  );
};

const StyledSchoolPage = styled(SchoolPage)`
  font-size: 2rem;
`;

export default StyledSchoolPage;
