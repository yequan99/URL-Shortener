import axios from 'axios'
import { LongURLMsg } from '../type/struct'

export default async function ShortenURL(token: string | null, userID: string | null, longURL: LongURLMsg) {
    try {
        const response = await axios.post(
            '/url/shorten',
            longURL,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'x-auth-token': token,
                    'x-user-id': userID,
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