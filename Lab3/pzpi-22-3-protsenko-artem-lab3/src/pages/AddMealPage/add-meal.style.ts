import styled from "styled-components";

export const Form = styled.form`
  max-width: 400px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: 0.3rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Button = styled.button`
  padding: 0.6rem;
  background-color: #1976d2;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }
`;