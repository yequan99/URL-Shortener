import { useEffect, useState } from 'react'
import { CircularProgress, Box } from '@mui/material'

import Card from "./Card"
import UserURL from "../api/GetUserURLDataAPI"
import { UserUrlData } from '../type/struct'

export default function Storage() {

    const [userUrlData, setUserUrlData] = useState<UserUrlData[]>([])
    const [empty, setEmpty] = useState<boolean>(false)

    useEffect(() => {
        const getUserURL = async () => {
            const response = await UserURL()
            console.log("Response:", response.data)
            setUserUrlData(response.data)
            if (response.data.length === 0){
                setEmpty(true)
            }
        }
        getUserURL()
    }, [])

    return (
        <div className="h-screen mx-16 my-12">
            <h1 className="font-bold text-2xl">Your Shortened URLs</h1>
            <div className="grid grid-cols-2 gap-4 pt-4">
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