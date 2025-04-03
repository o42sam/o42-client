import { user as userStore } from "../../stores/user";

export const createUser: (user: Object) => Object = (user: Object) => {
    return user;
}

export const updateUser: (data: any, userId: string) => Object = (data: string, userId: string) => {
    return {}
}

export const updateUserStore: (user: Object) => Object = (user: Object) => {
    userStore.set(user);
    return {};
}

export const getTransactions: (userId: string) => Array<Object> = (userId: string) => {
    return []
}