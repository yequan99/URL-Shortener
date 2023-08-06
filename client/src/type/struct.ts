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

export type LongURLMsg = {
    longURL: string
}

export type UserUrlData = {
    _id : number
    userID: string,
    longurl: string,
    shorturl: string,
    urlcode: string,
    createdAt: Date
}

export type DeleteUrlMsg = {
    itemID: number
}