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
    qrCode: {
        type: string,
        data: number[]
    },
    createdAt: Date
}

export type ProcessedUserUrlData = {
    _id : number
    userID: string,
    longurl: string,
    shorturl: string,
    urlcode: string,
    qrCode: Blob,
    createdAt: Date
}

export type DeleteUrlMsg = {
    itemID: number,
    longurl: string,
    urlcode: string
}