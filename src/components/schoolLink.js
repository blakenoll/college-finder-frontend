import React from "react";
import styled from "styled-components";

const SchoolLink = ({ title, link, className }) => {
  if (link) {
    return (
      <div className={className}>
        <span>
          {title}: <a href={link}>{link}</a>
        </span>
      </div>
    );
  } else {
    return "";
  }
};

const StyledLink = styled(SchoolLink)`
  margin-bottom: 3px;
  a {
    color: dodgerblue;
  }
`;

export default StyledLink;
