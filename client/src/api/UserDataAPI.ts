import axios from 'axios'

export default async function UserData(userID: string | null, token: string | null) {
    try {
        const response = await axios.get(
            '/users',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'x-auth-token': token,
                    'x-user-id': userID,
                },
            },
        )
        return response.data.username
    } catch (err: any) {
        if (err.response) {
            return err.response
        } else {
            return err
        }
    }
}