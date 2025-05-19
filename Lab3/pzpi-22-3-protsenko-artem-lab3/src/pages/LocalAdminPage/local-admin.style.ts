// local-admin.style.ts
import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 0.75rem;
`;

export const Select = styled.select`
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Message = styled.p`
  margin-top: 1rem;
`;
