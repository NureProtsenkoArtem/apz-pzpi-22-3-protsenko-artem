import styled from "styled-components";

export const Container = styled.div`
    padding: 24px;
`;

export const Tabs = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
`;

export const Tab = styled.button<{ active: boolean }>`
    padding: 8px 16px;
    background: ${({ active }) => (active ? "#007bff" : "#f0f0f0")};
    color: ${({ active }) => (active ? "#fff" : "#000")};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
`;

export const TableRow = styled.tr`
    border-bottom: 1px solid #ccc;
`;

export const TableCell = styled.td`
    padding: 12px;
    text-align: left;
`;

export const SectionTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 16px;
`;

export const Pagination = styled.div`
    display: flex;
    gap: 8px;

    button {
        padding: 6px 12px;
        border: 1px solid #ccc;
        background: white;
        cursor: pointer;
        border-radius: 4px;

        &:disabled {
            background: #007bff;
            color: white;
            cursor: default;
        }
    }
`;

export const StatusBlock = styled.div`
    font-size: 16px;
    line-height: 1.6;
`;

export const ConfigBlock = styled.div`
    background: #f8f8f8;
    padding: 16px;
    border-radius: 8px;
    font-family: monospace;
`;

export const Textarea = styled.textarea`
  width: 100%;
  font-family: monospace;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 12px;
`;

export const SaveButton = styled.button`
  padding: 10px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const DeleteLogsBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const DeleteLabel = styled.label`
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
        padding: 0.4rem 0.6rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        width: 80px;
    }
`;

export const DeleteButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #ff5252;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s ease;

    &:hover:enabled {
        background-color: #e53935;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 500px;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
`;

export const Input = styled.input`
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
`;

export const SubmitButton = styled.button`
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #a0c1f5;
        cursor: not-allowed;
    }
`;