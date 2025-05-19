import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  width: 400px;
`;

export const Title = styled.h2`
  margin-top: 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background: #0d6efd;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #0b5ed7;
  }
`;