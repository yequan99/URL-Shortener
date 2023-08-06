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
        <div className="flex flex-col-reverse md:flex-row w-full h-screen">
            <div className="w-full h-[3.5rem] md:w-[3.5rem] md:h-screen bg-teal fixed bottom md:relative md:bottom-auto">
                <Sidebar username={username} />
            </div>
            <div className="flex-1 h-screen md:overflow-y-auto">
                <div className="h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}