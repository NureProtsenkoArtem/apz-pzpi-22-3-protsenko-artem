import styled from "styled-components";

export const Section = styled.section`
  margin-bottom: 32px;
  padding: 24px;
  background-color: #f7f9fb;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  padding: 8px;
  width: 100%;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-top: 4px;
`;

export const Button = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

export const StatusText = styled.p`
  font-size: 16px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
