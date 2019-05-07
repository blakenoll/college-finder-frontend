import React, { useState } from "react";
import styled from "styled-components";

const Image = ({ src, alt, className }) => {
  const [status, setStatus] = useState("");

  return (
    <div className={`${className} ${status}`}>
      <img src={src} alt={alt} onLoad={() => setStatus("loaded")} />
    </div>
  );
};

const StyledImage = styled(Image)`
  height: ${props => (props.height ? props.height : "auto")};
  opacity: 0;
  &.loaded {
    opacity: 1;
    transition: opacity 1s ease-out;
  }
  img {
    width: ${props => (props.width ? props.width : "auto")};
    height: ${props => (props.height ? props.height : "auto")};
    object-fit: ${props => (props.objectFit ? props.objectFit : "none")};
    margin: ${props => (props.margin ? props.margin : "none")};
  }
`;

export default StyledImage;
