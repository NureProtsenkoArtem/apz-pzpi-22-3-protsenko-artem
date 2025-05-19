import styled from "styled-components";

export const VerificationContainer = styled.div`
    max-width: 400px;
    margin: 3rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
`;

export const VerificationTitle = styled.h2`
    text-align: center;
    margin-bottom: 1.5rem;
`;

export const VerificationForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Input = styled.input`
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

export const Button = styled.button`
    padding: 0.75rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    &:disabled {
        background-color: #9e9e9e;
    }
`;

export const Message = styled.p<{ success?: boolean; error?: boolean }>`
    color: ${(props) => (props.success ? "green" : props.error ? "red" : "inherit")};
    text-align: center;
    font-weight: 500;
`;
