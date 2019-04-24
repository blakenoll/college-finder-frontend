import React from "react";

const Select = ({ name, onChange, options, value }) => {
  return (
    <select name={name} onChange={onChange} value={value}>
      {options.map((o, i) => {
        return (
          <option value={o} key={i}>
            {o}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
