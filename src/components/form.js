import React, { useState, useEffect } from "react";
import Select from "./select";
import { useStateValue } from "./state";
import styled from "styled-components";
import Results from "./showResults";

const Form = ({ className }) => {
  const [submitted, setSubmitted] = useState(false);
  const [{ zipcode, distance, queryResults }, dispatch] = useStateValue();

  const distances = [10, 20, 30, 50, 100];

  function handleSubmit(event) {
    event.preventDefault();
    // clear query results if new search is made
    dispatch({ type: "changeQuery", newQueryResults: {} });
    setSubmitted(true);
  }

  useEffect(() => {
    if (queryResults.findWithinDistance) {
      setSubmitted(true);
    }
  }, []); // show results if global state contains results on mount

  return (
    <div className={className}>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <label>Address:</label>
        <input
          type="text"
          onChange={e =>
            dispatch({ type: "changeZip", newZipcode: e.target.value })
          }
          value={zipcode}
        />
        <label>Distance:</label>
        <Select
          name="size"
          onChange={e =>
            dispatch({ type: "changeDistance", newDistance: e.target.value })
          }
          options={distances}
          value={distance}
        />
        <input type="submit" value="Submit" />
      </form>
      {submitted && <Results distance={distance} zipcode={zipcode} />}
    </div>
  );
};

const StyledName = styled(Form)`
  color: #0c2340;
  font-size: 1rem;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 10px;
  input {
    display: block;
    margin: 5px 0;
    max-width: 500px;
    width: 100%;
    padding: 10px 5px;
    font-size: 1.1rem;
    border-radius: 6px;
    border: var(--border);
    box-shadow: var(--box-shadow);
    -webkit-appearance: none;
  }
  input[type="submit"] {
    padding: 10px 20px;
    background: linear-gradient(to top right, #267871, #136a8a);
    color: #eee;
    border: none;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 30px;
    display: block;
    margin: 5px 0;
    width: auto;
    box-shadow: 0 7px 13px -3px rgba(45, 35, 66, 0.3),
      0 2px 4px 0 rgba(45, 35, 66, 0.4), inset 0 -2px 0 0 teal;
    -webkit-appearance: none;
  }
  select {
    font-size: 1.1rem;
    padding: 10px 5px;
    margin: 5px 10px;
    border-radius: 6px;
    border: var(--border);
    box-shadow: var(--box-shadow);
  }
  label {
    font-size: 1.3rem;
  }
`;

export default StyledName;
