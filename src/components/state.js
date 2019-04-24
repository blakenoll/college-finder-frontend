import React, { createContext, useContext, useReducer } from "react";

// create an inital context
export const StateContext = createContext();

// create provider to wrap components
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// custom hook to get current global state.
// returns value prop from StateProvider
export const useStateValue = () => useContext(StateContext);
