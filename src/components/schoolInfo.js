import React from "react";
import styled from "styled-components";

const InfoData = ({ title, data, className }) => {
  if (data) {
    return (
      <div className={className}>
        <span>{title}: </span>
        <span>{data}</span>
      </div>
    );
  } else {
    return "";
  }
};

const StyledInfo = styled(InfoData)`
  margin-bottom: 3px;
  span:nth-child(2) {
    color: var(--purple);
    font-weight: 200;
  }
`;

export default StyledInfo;
