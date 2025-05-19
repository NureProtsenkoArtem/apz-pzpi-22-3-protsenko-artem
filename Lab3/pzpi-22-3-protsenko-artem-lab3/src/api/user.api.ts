import { $api } from "./base.api"

export const getUserById = async (id: string) => {
    const { data } = await $api.get(`/User/${id}`)
    return data
}

export const getAllUsers = async () => {
    const { data } = await $api.get("/User/")
    return data;
}