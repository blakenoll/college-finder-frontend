import React, { createContext, useContext, useReducer } from "react";

// create an inital context
export const StateContext = createContext();

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

// create provider to wrap components
export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// custom hook to get current global state.
// returns value prop from StateContext.Provider
export const useStateValue = () => useContext(StateContext);
