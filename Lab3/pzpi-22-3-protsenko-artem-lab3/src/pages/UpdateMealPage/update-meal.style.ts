import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  font-size: 16px;
`;

export const Input = styled.input`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-top: 4px;
`;

export const Checkbox = styled.input`
  margin-right: 8px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #303f9f;
  }
`;
