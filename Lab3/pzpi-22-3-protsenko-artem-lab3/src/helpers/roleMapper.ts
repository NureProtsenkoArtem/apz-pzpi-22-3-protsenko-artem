import { UserRole } from "types/user/userRole.enum";

export const mapRoleNameToValue = (roleName: string): UserRole => {
    switch (roleName) {
        case "User":
            return UserRole.User;
        case "Admin":
            return UserRole.Admin;
        case "DbAdmin":
            return UserRole.DbAdmin;
        case "ApplicationAdmin":
            return UserRole.ApplicationAdmin;
        default:
            return UserRole.User;
    }
}

export const mapRoleValueToName = (roleValue: UserRole): string => {
    switch (roleValue) {
        case UserRole.User:
            return "User";
        case UserRole.Admin:
            return "Admin";
        case UserRole.DbAdmin:
            return "DbAdmin";
        case UserRole.ApplicationAdmin:
            return "ApplicationAdmin";
        default:
            return "User";
    }
};