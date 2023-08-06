import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import UrlData from '../api/UrlDataAPI'
import UserData from '../api/UserDataAPI'
import Sidebar from './Sidebar'

export default function Dashboard() {

    const navigate = useNavigate()
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        const getUrlData = async () => {
            const response = await UrlData()
            if (response.status === 401) {
                navigate('/login')
            }
        }
        getUrlData()
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
        <>
            {username ? 
                <div className="flex flex-row w-full h-full">
                    <div className="w-[5%] h-screen bg-teal">
                        <Sidebar />
                    </div>
                    <div className="w-[95%] h-screen">
                        <div className="h-full">
                            <p>Content</p>
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    )
}