import React from "react";
import styled from "styled-components";
import Form from "./form";

const Navbar = ({ className }) => {
  return (
    <div className={className}>
      <Form />
    </div>
  );
};

const StyledNavbar = styled(Navbar)`
  display: flex;
  justify-content: center
  padding: 20px 0;
  background: linear-gradient(to top right,#267871,#136a8a);
  color: #eeeeee;
`;

export default StyledNavbar;
