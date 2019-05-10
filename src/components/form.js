import React from "react";
import Select from "./select";
import { useStateValue } from "./state";
import styled from "styled-components";
import { withRouter } from "react-router";

const Form = ({ className, history }) => {
  const [{ zipcode, distance }, dispatch] = useStateValue();

  const distances = [10, 20, 30, 50, 100];

  function handleSubmit(event) {
    event.preventDefault();
    // clear query results if new search is made
    dispatch({ type: "changeQuery", newQueryResults: {} });
    history.push("/search");
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={e =>
            dispatch({ type: "changeZip", newZipcode: e.target.value })
          }
          value={zipcode}
          placeholder="Address or Zipcode"
          id="zipcode"
        />
        <label htmlFor="distance">Distance:</label>
        <Select
          name="size"
          onChange={e =>
            dispatch({ type: "changeDistance", newDistance: e.target.value })
          }
          options={distances}
          value={distance}
          id="distance"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

const StyledName = styled(withRouter(Form))`
  color: #eee;
  font-size: 1rem;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 10px;
  input {
    display: inline;
    margin: 5px 0;
    max-width: 500px;
    padding: 10px 10px;
    font-size: 1.1rem;
    border-radius: 6px;
    border: var(--border);
    box-shadow: var(--box-shadow);
    -webkit-appearance: none;
  }
  input[type="submit"] {
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
    margin-left: 5px;
  }
`;

export default StyledName;
