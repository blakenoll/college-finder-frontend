import React from "react";
import Navbar from "./components/navbar";
import HomePage from "./components/home";
import Results from "./components/showResults";
import SchoolPage from "./components/schoolPage";
import Callback from "./components/callback";
import auth from "./Auth";
import { GlobalStyle } from "./components/globalStyle";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { StateProvider } from "./components/state";
import { BrowserRouter as Router, Route } from "react-router-dom";

const client = new ApolloClient({
  uri: "https://college-finder-backend.herokuapp.com/",
  request: operation => {
    operation.setContext(context => {
      return {
        headers: {
          ...context.headers,
          authorization: auth.getIdToken()
        }
      };
    });
  }
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
          <Navbar />
          <Route path="/" exact component={HomePage} />
          <Route path="/search" exact component={Results} />
          <Route path="/school/:id" component={SchoolPage} />
          <Route path="/callback" component={Callback} />
        </Router>
      </StateProvider>
    </ApolloProvider>
  );
};

export default App;
