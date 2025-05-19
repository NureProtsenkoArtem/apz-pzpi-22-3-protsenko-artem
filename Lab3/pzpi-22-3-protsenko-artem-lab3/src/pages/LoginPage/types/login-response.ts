import { IUser } from "types/user/user.types";

export interface LoginResponse {
    accessToken: string,
    user: IUser
}