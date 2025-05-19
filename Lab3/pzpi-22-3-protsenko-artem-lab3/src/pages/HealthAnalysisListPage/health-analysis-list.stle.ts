import { Link } from "react-router-dom";
import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 32px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

export const CreateButton = styled.button`
  padding: 10px 20px;
  background-color: #0d6efd;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0b5ed7;
  }
`;

export const CardList = styled.div`
  display: grid;
  gap: 24px;
`;

export const Card = styled.div`
  padding: 20px;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

export const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  color: #343a40;
`;

export const CardInfo = styled.p`
  margin: 4px 0;
  color: #495057;
`;