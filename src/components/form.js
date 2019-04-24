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
      <h1>College Finder</h1>
      <form onSubmit={handleSubmit}>
        <label>Zipcode:</label>
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
  input {
    display: block;
    margin: 5px 0;
  }
`;

export default StyledName;
