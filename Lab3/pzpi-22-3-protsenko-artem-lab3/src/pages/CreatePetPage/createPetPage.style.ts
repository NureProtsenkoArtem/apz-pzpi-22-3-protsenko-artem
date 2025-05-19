import styled from "styled-components";

export const FormWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

export const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const Error = styled.div`
  color: red;
  margin-bottom: 12px;
`;
