import axios from 'axios'
import { DeleteUrlMsg } from '../type/struct'

export default async function DeleteURL(itemID: DeleteUrlMsg) {
    try {
        const response = await axios.post(
            '/url/delete',
            itemID,
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