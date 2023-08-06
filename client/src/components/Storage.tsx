import { useEffect, useState } from 'react'
import Card from "./Card"
import UserURL from "../api/GetUserURLDataAPI"
import { UserUrlData } from '../type/struct'

export default function Storage() {

    const [userUrlData, setUserUrlData] = useState<UserUrlData[]>([])

    useEffect(() => {
        const getUserURL = async () => {
            const response = await UserURL()
            console.log("Response:", response.data)
            setUserUrlData(response.data)
        }
        getUserURL()
    }, [])

    return (
        <div className="h-screen mx-16 my-12">
            <h1 className="font-bold text-2xl">Your Shortened URLs</h1>
            <div className="grid grid-cols-2 gap-4 pt-4">
                {userUrlData.length > 0 ?
                    userUrlData.map((item,index) => (
                        <Card key={index} itemDetails={item} />
                    )) :
                    <h1>You do not have any links stored!</h1>
                }
            </div>
        </div>
    )
}