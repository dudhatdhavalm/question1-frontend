
import React from 'react';
import styled from '@emotion/styled';

const Select = styled.select`
  padding: 10px;
  font-size: 1em;
  margin: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Dropdown = ({ options, selectedOption, onSelect }) => {
  return (
    <div>
      <label htmlFor="workflow">Select Workflow:</label>
      <Select
        id="workflow"
        value={selectedOption}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
