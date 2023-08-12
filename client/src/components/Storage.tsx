import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircularProgress, Box } from '@mui/material'

import Card from "./Card"
import UserURL from "../api/GetUserURLDataAPI"
import { UserUrlData } from '../type/struct'

export default function Storage() {

    const navigate = useNavigate()
    const [userUrlData, setUserUrlData] = useState<UserUrlData[]>([])
    const [empty, setEmpty] = useState<boolean>(false)

    useEffect(() => {
        const getUserURL = async () => {
            const response = await UserURL()
            console.log("response:", response.data)
            setUserUrlData(response.data)
            if (response.data.length === 0){
                setEmpty(true)
            }
            if (response.status === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('userID')
                alert("Session expired. Please login")
                navigate('/login')
            }
        }
        getUserURL()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="h-screen px-16 py-12">
            <h1 className="font-bold text-2xl">Your Shortened URLs</h1>
            <div className="flex flex-col gap-y-4 lg:grid lg:grid-cols-2 lg:gap-4 pt-4 md:pb-0 pb-36">
                {empty ? 
                    <h1>You do not have any short URL saved!</h1>
                    : 
                    userUrlData.length > 0 ?
                        userUrlData.map((item,index) => (
                            <Card key={index} itemDetails={item} />
                        )) 
                        :
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                }
            </div>
        </div>
    )
}