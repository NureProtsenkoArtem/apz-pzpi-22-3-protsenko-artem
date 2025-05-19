import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const PetCard = styled.div`
  background-color: #f0f8ff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
`;

export const InfoRow = styled.p`
  margin: 0.3rem 0;
`;

export const Button = styled.button<{ danger?: boolean }>`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.danger ? "#e53935" : "#2196f3")};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;

  &:hover {
    background-color: ${(props) => (props.danger ? "#c62828" : "#1976d2")};
  }

  & + & {
    margin-left: 0.5rem;
  }
`;

export const TableWrapper = styled.div`
  max-width: 800px;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  background-color: #e0e0e0;
`;

export const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
`;

export const ActionCell = styled.td`
  display: flex;
  gap: 0.5rem;
`;