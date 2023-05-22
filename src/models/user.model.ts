export interface User {
    id?: number,
    uuid?: string,
    username?: string,
    password?: string,
    deleted_by?: string,
}

export interface CreateUser {
    username?: string,
    password?: string,
    name?: string,
    created_by?: string
}

export interface SearchUser {
    id?: string,
    username?: string,
    name?: string,
}