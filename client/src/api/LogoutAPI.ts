import axios from 'axios'
import { LogoutReturnMsg, LogoutID } from '../type/struct'

export default async function UserLogout(userID: LogoutID) {
    try {
        const response = await axios.post<LogoutReturnMsg>(
            '/users/logout',
            userID,
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