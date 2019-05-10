import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Info from "./schoolInfo";

const SchoolCard = ({ school, className }) => (
  <StyledSchoolCard
    to={`/school/${school.scid}`}
    key={school.scid}
    className={className}
  >
    <div>
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
        <Info title="Total Enrolled" data={school.generalInfo.campus_enroll} />
        <Info
          title="Average freshmen GPA"
          data={school.academics.ave_fresh_GPA}
        />
        <Info title="Address" data={school.address} />
      </div>
    </div>
  </StyledSchoolCard>
);

const StyledSchoolCard = styled(Link)`
  margin: 20px 0;
  padding: 10px;
  max-width: 500px;
  box-shadow: var(--box-shadow);
  border: var(--border);
  border-radius: 6px;
  color: #000;
  display: block;
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
`;

export default SchoolCard;
