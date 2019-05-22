import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Loader from "./loader";
import auth from "../Auth";

const Callback = ({ history }) => {
  useEffect(() => {
    async function handleAuth() {
      await auth.handleAuth();
      history.replace("/");
    }
    handleAuth();
  });

  return <Loader />;
};

export default withRouter(Callback);
