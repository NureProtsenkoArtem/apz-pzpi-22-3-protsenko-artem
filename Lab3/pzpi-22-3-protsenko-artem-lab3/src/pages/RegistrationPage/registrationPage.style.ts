import styled from "styled-components";

export const FormWrapper = styled.div`
  max-width: 400px;
  background: #fff;
  margin: 0 auto;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Title = styled.h2`
  margin-bottom: 24px;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 12px;
`;