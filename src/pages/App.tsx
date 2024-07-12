import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown, { DropdownItem } from '../components/Dropdown';
import WorkflowDetails from '../components/WorkflowDetails';
import styled from '@emotion/styled';


const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Header = styled.header`
  font-size: 2em;
  margin: 20px 0;
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

const ResultContainer = styled.div`
  margin-top: 20px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
`;

const Text = styled.p`
  font-size: 1.2em;
  margin-top: 10px;
`;

export interface Detail {
  title: string,
  description: string,
  params: Record<string, string>[]
}

interface TextResult {
  type: "text",
  value: string
}

interface ImageResult {
  type: "image",
  value: string
}

type ExecutionResult = TextResult | ImageResult;


const App = () => {
  const [options, setOptions] = useState<DropdownItem[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [workflowDetails, setWorkflowDetails] = useState<Detail | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [executionResult, setExecutionResult] = useState<ExecutionResult[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/workflow`);
        setOptions(response.data);
      } catch (error) {
        console.error("There was an error fetching the workflow data!", error);
      }
    };

    fetchOptions();
  }, []);

  const handleSelect = (workflowKey: string) => {
    setSelectedOption(workflowKey);
  };

  const handleNext = async () => {
    if (!selectedOption) {
      alert('Please select a workflow');
      return;
    }

    try {
      const response = await axios.get<Detail>(`${process.env.REACT_APP_API_BASE_URL}/description/${selectedOption}`);
      setWorkflowDetails(response.data);

      const initialFormData: Record<string, string> = {};
      response.data.params.forEach(param => {
        initialFormData[param.name] = '';
      });
      setFormData(initialFormData);

    } catch (error) {
      console.error("There was an error fetching the workflow description!", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post<ExecutionResult[]>(`${process.env.REACT_APP_API_BASE_URL}/execute`, {
        workflow_key: selectedOption,
        parameters: formData
      });
      setExecutionResult(response.data);
    } catch (error) {
      console.error("There was an error executing the workflow!", error);
    }
  };

  return (
    <Container>
      <Header>Workflow Executor</Header>
      <Dropdown
        options={options}
        selectedOption={selectedOption}
        onSelect={handleSelect}
      />
      <Button onClick={handleNext}>Next</Button>
      {workflowDetails && (
        <WorkflowDetails
          details={workflowDetails}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      )}
      <ResultContainer>
        {executionResult.map((result, index) => (
          <div key={index}>
            {result.type === 'text' && <Text>{result.value}</Text>}
            {result.type === 'image' && <Image src={result.value} alt="Result" />}
          </div>
        ))}
      </ResultContainer>
    </Container>
  );
}

export default App;
