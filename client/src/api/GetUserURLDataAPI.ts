import axios from 'axios'

export default async function UserURL() {
    try {
        const response = await axios.get(
            '/url',
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