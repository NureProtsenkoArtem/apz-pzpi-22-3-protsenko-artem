import styled from "styled-components";

export const PageWrapper = styled.div`
  margin: 0 auto ;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;

export const Card = styled.div`
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 1rem;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Name = styled.h3`
  margin: 0.5rem 0 0.25rem;
`;

export const Info = styled.p`
  margin: 0.25rem 0;
`;

export const Button = styled.button`
  margin-top: auto;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #45a049;
  }
`;