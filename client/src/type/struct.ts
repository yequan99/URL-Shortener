export type UserLoginCredentials = {
    username: string,
    password: string
}

export type LoginReturnToken = {
    msg: string,
    token: string,
    userID: string
}

export type LogoutReturnMsg = {
    msg: string
}

export type LogoutID = {
    userID: string | null
}