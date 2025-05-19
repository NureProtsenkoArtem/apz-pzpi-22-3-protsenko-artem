import { FC, ReactNode } from "react";
import { Content, InnerContent, LayoutWrapper } from "./layout.style";
import { Header } from "@components/header/header";

interface MainLayoutProps {
    children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <LayoutWrapper>
            <Header />
            <Content>
                <InnerContent>
                    {children}
                </InnerContent>
            </Content>
        </LayoutWrapper>
    );
};