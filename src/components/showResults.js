import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Info from "./schoolInfo";
import SchoolLink from "./schoolLink";
import { useStateValue } from "./state";
import Loader from "./loader";
import { Link } from "react-router-dom";

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

const ResultCards = ({ data, className }) => (
  <div className={className}>
    <p>{data.findWithinDistance.length} results</p>
    {data.findWithinDistance.map(school => (
      <div key={school.scid} className="card">
        <Link to={`/school/${school.scid}`}>
          <div className="school">
            <span>{school.name}</span>
          </div>
          <div className="location">
            <span>City: {school.city}</span>
            <span>Distance: {school.distance} miles</span>
          </div>
          <p>{school.blurb}</p>
          <div className="info">
            <span className="header">Info:</span>
            <div className="links">
              <SchoolLink title="website" link={school.www_url} />
            </div>
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
        </Link>
      </div>
    ))}
  </div>
);

const Results = ({ distance, zipcode }) => {
  const [{ queryResults }, dispatch] = useStateValue();
  // global state contains results dont fetch new data
  if (queryResults.findWithinDistance) {
    return <StyledResults data={queryResults} />;
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

const StyledResults = styled(ResultCards)`
  .card {
    margin: 20px 10px;
    padding: 5px;
    max-width: 500px;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    .school {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .location {
      font-size: 14px;
      span {
        margin-right: 10px;
      }
    }
    .info {
      .header {
        font-weight: bold;
        display: block;
        margin-bottom: 10px;
      }
    }
    .links {
      margin-bottom: 3px;
    }
    a {
      color: dodgerblue;
    }
    p {
      font-size: 14px;
    }
  }
`;

export default Results;
