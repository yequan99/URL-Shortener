import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import Sidebar from './Sidebar'
import UserData from '../api/UserDataAPI'

export default function DashboardLayout() {

    const navigate = useNavigate()
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        const getUserData = async () => {
            const response = await UserData()
            if (response.status === 401) {
                navigate('/login')
            }
            return response
        }
        getUserData().then((data) => {
            setUsername(data)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <div className="flex flex-row w-full h-full">
            <div className="w-[5%] h-screen bg-teal">
                <Sidebar username={username} />
            </div>
            <div className="w-[95%] h-screen">
                <div className="h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}