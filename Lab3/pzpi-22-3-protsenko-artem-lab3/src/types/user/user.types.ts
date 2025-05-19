import { UserRole } from "./userRole.enum";

export interface IUser {
    userId: string;
    name: string;
    email: string;
    password: string;
    userRole: UserRole;
    verificationCode: string;
    createdAt: string;
    isVerified: boolean
}