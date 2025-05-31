import { useState } from "react";
import styled from "styled-components";
import { QRCodeCanvas } from "qrcode.react";

interface TabButtonProps {
  active?: boolean;
  left?: boolean;
}

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Container = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 1.5rem;
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button<TabButtonProps>`
  padding: 0.5rem 1.5rem;
  border: none;
  background: ${(props) => (props.active ? "#007bff" : "#e0e0e0")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border-radius: ${(props) =>
    props.left ? "20px 0 0 20px" : "0 20px 20px 0"};
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.active ? "#0069d9" : "#ccc")};
  }
`;

const DownloadLink = styled.a`
  display: inline-block;
  margin-top: 1rem;
  background: #007bff;
  color: #fff;
  padding: 0.6rem 1.4rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState("exe");

  return (
    <Wrapper>
      <Container>
        <Title>Завантаження системи</Title>
        <TabHeader>
          <TabButton
            onClick={() => setActiveTab("exe")}
            active={activeTab === "exe"}
            left
          >
            Windows
          </TabButton>
          <TabButton
            onClick={() => setActiveTab("mobile")}
            active={activeTab === "mobile"}
          >
            Мобільна
          </TabButton>
        </TabHeader>
        {activeTab === "exe" ? (
          <>
            <p>Завантажити сервер та веб-клієнт:</p>
            <DownloadLink href="http://localhost:5000/download">
              Завантажити .exe
            </DownloadLink>
          </>
        ) : (
          <>
            <p style={{ marginTop: "1.5rem" }}>Відскануйте QR код для встановлення мобільного додатку:</p>
            <QRCodeCanvas value="http://192.168.16.101:5000/download-apk" size={128} />
          </>
        )}

      </Container>
    </Wrapper>
  );
}

export default App;
