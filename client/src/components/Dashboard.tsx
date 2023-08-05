import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';

import UrlData from '../api/UrlDataAPI'
import UserData from '../api/UserDataAPI';
import Navbar from './Navbar'

export default function Dashboard() {

    const navigate = useNavigate()
    const [logout, setLogout] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        const userID = localStorage.getItem("userID")
        const getUrlData = async () => {
            const token = localStorage.getItem("token")
            const userID = localStorage.getItem("userID")
            const response = await UrlData(userID, token)
            if (response.status === 401) {
                navigate('/login')
            }
        }
        getUrlData()
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
    }, [])

    return (
        <div className="w-full h-screen flex-flex-col">
            <div className="bg-blue-600 h-[8%]">
                <Navbar username={username} setLogout={setLogout} />
            </div>
            <div className="h-[92%] pt-4 flex flex-col items-center">
                Content
                <div className={`w-fit ${logout ? "" : "hidden"}`}>
                    <Alert severity="error">Error! Unable to logout</Alert>
                </div>
            </div>
        </div>
    )
}