import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  padding: 16px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const InnerContainer = styled.div`
  width: 1440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const NavElement = styled.p`
  margin: 0;
  font-size: 14px;
  align-self: center;
  gap: 12px;
  cursor: pointer;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
`;