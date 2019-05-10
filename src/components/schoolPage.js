import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";
import Info from "./schoolInfo";
import SchoolLink from "./schoolLink";
import Image from "./image";
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
        primeofficer
        primetitle
        main_phone
        year_estab
      }
      academics {
        ave_fresh_GPA
        majors_highest_1
      }
      financialAid {
        average_debt
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
        console.log(school);
        return (
          <AnimatedDiv style={props}>
            <Image
              src="https://source.unsplash.com/random"
              alt="header"
              width="100vw"
              height="300px"
              margin="0 calc(-50vw + 50%)"
              objectFit="cover"
            />
            <BackButton to="/search">Back</BackButton>
            <h1>{school.name}</h1>
            <p>{school.blurb}</p>
            <h2>General Info</h2>
            <SchoolLink title="Website" link={school.www_url} />
            <Info title="Phone" data={school.generalInfo.main_phone} />
            <Info title="Address" data={school.address} />
            <Info title="City" data={school.city} />
            <Info title="State" data={school.state} />
            <Info
              title="Year Established"
              data={school.generalInfo.year_estab}
            />
            <Info
              title="Total Enrolled"
              data={school.generalInfo.campus_enroll}
            />

            <Info
              title={school.generalInfo.primetitle}
              data={school.generalInfo.primeofficer}
            />

            <h2>Academics</h2>
            <Info
              title="Average freshmen GPA"
              data={school.academics.ave_fresh_GPA}
            />
            <Info title="Top Major" data={school.academics.majors_highest_1} />
            <h2>Financial Aid</h2>
            <Info title="Avg Debt" data={school.financialAid.average_debt} />
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
  width: auto;
  position: absolute;
  top: 10px;
  box-shadow: 0 7px 13px -3px rgba(45, 35, 66, 0.3),
    0 2px 4px 0 rgba(45, 35, 66, 0.4), inset 0 -2px 0 0 teal;
`;

const AnimatedDiv = styled(animated.div)`
  font-size: 1rem;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 5px;
  h1 {
    color: #3a416f;
    font-size: 1.8rem;
  }
  h2 {
    color: var(--purple);
  }
`;

export default SchoolPage;
