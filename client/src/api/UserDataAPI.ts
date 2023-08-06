import axios from 'axios'

export default async function UserData() {
    try {
        const response = await axios.get(
            '/users',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'x-auth-token': localStorage.getItem("token"),
                    'x-user-id': localStorage.getItem("userID"),
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