import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 400px;
  margin: 2rem auto;
`;

export const Label = styled.label`
  font-weight: 500;
  margin-top: 20px;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
`;

export const Button = styled.button`
  padding: 0.6rem 1rem;
  background-color: #2196f3;
  color: white;
  font-weight: 500;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1976d2;
  }
`;