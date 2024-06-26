import axios from 'axios'
import { LongURLMsg } from '../type/struct'

export default async function ShortenURL(longURL: LongURLMsg) {
    try {
        const response = await axios.post(
            '/url/shorten',
            longURL,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'x-auth-token': localStorage.getItem("token"),
                    'x-user-id': localStorage.getItem("userID"),
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