import { FC } from "react";
import { Button, HeaderContainer, InnerContainer, LeftButtons, NavElement, Title } from "./header.style";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@pages/router/routes.enums";
import { LanguageSwitcher } from "@ui/switcher/language-switch";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@pages/LoginPage/store/auth-store";

export const Header: FC = () => {
    const user = useAuthStore(state => state.user);


    const navigate = useNavigate()
    const { t } = useTranslation();

    return (
        <HeaderContainer>
            <InnerContainer>
                <Title onClick={() => navigate(ROUTES.HOME)}>PetHouse</Title>
                <LeftButtons>

                    {user ? (
                        <>
                            {user.userRole === "DbAdmin" &&
                                <NavElement onClick={() => navigate(ROUTES.DB_ADMIN_PAGE)}>
                                    {t("db_admin_panel")}
                                </NavElement>
                            }
                            {user.userRole === "ApplicationAdmin" &&
                                <NavElement onClick={() => navigate(ROUTES.SYSTEM_ADMIN_PAGE)}>
                                    {t("system_admin")}
                                </NavElement>
                            }
                            {user.userRole === "Admin" &&
                                <NavElement onClick={() => navigate(ROUTES.LOCAL_ADMIN_PAGE)}>
                                    {t("localAdmin")}
                                </NavElement>
                            }

                            <NavElement onClick={() => navigate(ROUTES.USER_PROFILE.replace(":id", user.userId))}>
                                {t("welcome")} {user.email}
                            </NavElement>
                            <Button onClick={() => {
                                useAuthStore.getState().logout();
                                navigate(ROUTES.HOME);
                            }}>
                                {t("logout")}
                            </Button>
                            <Button onClick={() => navigate(ROUTES.CREATE_PET_PAGE)}>{t("create_pet")}</Button>
                            <Button onClick={() => navigate(ROUTES.PET_LIST_PAGE.replace(":id", user.userId))}>
                                {t("pet_list")}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => navigate(ROUTES.LOGIN_PAGE)}>{t("login")}</Button>
                            <Button onClick={() => navigate(ROUTES.REGISTRATION_PAGE)}>{t("register")}</Button>
                        </>
                    )}
                    <LanguageSwitcher />
                </LeftButtons>
            </InnerContainer>
        </HeaderContainer>
    );
};