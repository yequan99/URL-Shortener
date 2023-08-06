import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import UserData from '../api/UserDataAPI'

export default function Home() {

    const navigate = useNavigate()
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        const userID = localStorage.getItem("userID")
        const getUserData = async () => {
            const response = await UserData(userID, token)
            if (response.status === 401) {
                navigate('/login')
            }
            return response
        }
        getUserData().then((data) => {
            setUsername(data)
        })
        // eslint-disable-next-line
    })

    return (
        <div className="h-screen container mx-auto">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold">URL Shortener</h1>
            </div>
        </div>
    )
}