import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Content = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const InnerContent = styled.div`
  width: 1440px;
  padding: 24px 0;
`;