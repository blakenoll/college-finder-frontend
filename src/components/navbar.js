import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Form from "./form";
import auth from "../Auth";

const Navbar = ({ className, history }) => {
  function logout() {
    auth.logout();
    history.replace("/");
  }
  return (
    <div className={className}>
      <Form />
      {auth.isAuthenticated() ? (
        <button onClick={() => logout()}>Logout {auth.email}</button>
      ) : (
        <button onClick={() => auth.login()}>Login</button>
      )}
    </div>
  );
};

const StyledNavbar = styled(Navbar)`
  display: flex;
  justify-content: center
  padding: 20px 0;
  background: linear-gradient(to top right,#267871,#136a8a);
  color: #eeeeee;
  button {
    padding: 10px 20px;
    background: var(--purple);
    color: #eee;
    border: var(--border);
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 30px;
    display: inline;
    margin: 5px 0;
    width: auto;
    box-shadow: var(--box-shadow);
    -webkit-appearance: none;
  }
`;

export default withRouter(StyledNavbar);
