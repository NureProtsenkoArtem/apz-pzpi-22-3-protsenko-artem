import styled from "styled-components";

export const Switcher = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #e0e0e0;
  border-radius: 20px;
  padding: 4px;
`;

export const LangButton = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  border: none;
  background-color: ${({ active }) => (active ? '#4CAF50' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  border-radius: 16px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? '#45a049' : '#ccc')};
  }
`;