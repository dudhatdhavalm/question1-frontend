import React from 'react';
import styled from '@emotion/styled';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const DateInput = styled.input`
  padding: 10px;
  margin: 10px;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Label = styled.label`
  margin: 10px;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  margin: 10px;
  cursor: pointer;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  
  &:hover {
    background-color: #0056b3;
  }
`;


const WorkflowDetails = ({ details, formData, onInputChange, onSubmit }) => {
  return (
    <Form>
    <h2>{details.title}</h2>
    <p>{details.description}</p>
    {details.params.map((param) => (
      <div key={param.name}>
        <Label>{param.name}</Label>
        {param.type === 'string' ? (
          <Input
            type="text"
            name={param.name}
            value={formData[param.name]}
            onChange={onInputChange}
          />
        ) : param.type === 'date' ? (
          <DateInput
            type="date"
            name={param.name}
            value={formData[param.name]}
            onChange={onInputChange}
          />
        ) : null}
      </div>
    ))}
    <Button type="button" onClick={onSubmit}>Submit</Button>
  </Form>
  );
};

export default WorkflowDetails;
