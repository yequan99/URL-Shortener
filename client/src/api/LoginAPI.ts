import axios from 'axios'
import { UserLoginCredentials, LoginReturnToken } from '../type/struct'

export default async function UserLogin(credentials: UserLoginCredentials) {
    try {
        const response = await axios.post<LoginReturnToken>(
            '/users/login',
            credentials,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        )
        return response
    } catch (err: any) {
        if (err.response) {
            return err.response
        } else {
            return err
        }
    }
}