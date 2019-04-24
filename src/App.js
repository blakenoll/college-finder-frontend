import React from "react";
import Form from "./components/form";
import SchoolPage from "./components/schoolPage";
import { GlobalStyle } from "./components/globalStyle";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { StateProvider } from "./components/state";
import { BrowserRouter as Router, Route } from "react-router-dom";

const client = new ApolloClient({
  uri: "https://college-finder-backend.herokuapp.com/"
});

const App = () => {
  const initialState = {
    zipcode: "",
    distance: "10",
    submitted: false,
    queryResults: {}
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "changeZip":
        return {
          ...state,
          zipcode: action.newZipcode
        };
      case "changeDistance":
        return {
          ...state,
          distance: action.newDistance
        };
      case "changeQuery":
        return {
          ...state,
          queryResults: action.newQueryResults
        };
      default:
        return state;
    }
  };
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <StateProvider initialState={initialState} reducer={reducer}>
        <Router>
          <Route path="/" exact component={Form} />
          <Route path="/school/:id" component={SchoolPage} />
        </Router>
      </StateProvider>
    </ApolloProvider>
  );
};

export default App;
