import { FC } from "react";
import { MainLayout } from "@ui/layout/layout";
import { useTranslation } from "react-i18next";
import { useUsers, useChangeUserRole } from "./hooks/useLocalAdmin";
import {
    Container,
    Title,
    Table,
    TableRow,
    TableCell,
    Select,
    Message,
} from "./local-admin.style";
import { IUser } from "types/user/user.types";
import { useAuthStore } from "@pages/LoginPage/store/auth-store";
import { UserRole } from "types/user/userRole.enum";
import { mapRoleNameToValue } from "helpers/roleMapper";
export const LocalAdminPage: FC = () => {
    const { t } = useTranslation();
    const { data: users = [], isLoading } = useUsers();
    const { mutate: changeRole, isPending } = useChangeUserRole();
    const user = useAuthStore(state => state.user);

    const handleRoleChange = (userId: string, newRole: string) => {
        changeRole({ userId, userRole: Number(newRole) as UserRole });
    };

    return (
        <MainLayout>
            <Container>
                <Title>{t("admin.title")}</Title>

                {isLoading ? (
                    <Message>Loading...</Message>
                ) : (
                    <Table>
                        <thead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>{t("admin.role")}</TableCell>
                            </TableRow>
                        </thead>
                        <tbody>
                            {users
                                .filter((u) => u.userId !== user?.userId)
                                .map((user: IUser) => (
                                    <TableRow key={user.userId}>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Select
                                                value={mapRoleNameToValue(user.userRole)}
                                                onChange={(e) =>
                                                    handleRoleChange(user.userId, e.target.value)
                                                }
                                                disabled={isPending}
                                            >
                                                <option value={UserRole.User}>
                                                    {t("admin.roles.User")}
                                                </option>
                                                <option value={UserRole.Admin}>
                                                    {t("admin.roles.Admin")}
                                                </option>
                                                <option value={UserRole.DbAdmin}>
                                                    {t("admin.roles.DbAdmin")}
                                                </option>
                                                <option value={UserRole.ApplicationAdmin}>
                                                    {t("admin.roles.ApplicationAdmin")}
                                                </option>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </tbody>
                    </Table>
                )}
            </Container>
        </MainLayout>
    );
};
