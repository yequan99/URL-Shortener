import { useState, Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoutID } from "../type/struct"
import UserLogout from "../api/LogoutAPI"

export default function Navbar({setLogout}: {setLogout: Dispatch<SetStateAction<boolean>>}) {

    const navigate = useNavigate()

    const Logout = async () => {
        const userID = localStorage.getItem("userID")
        const logoutID: LogoutID = { userID: userID }
        const response = await UserLogout(logoutID)
        if (response.status === 200) {
            navigate('/login')
        } else {
            setLogout(true)
        }
    }

    return (
        <div className="flex flex-row justify-between px-4 h-full items-center">
            <div className="flex flex-row">
                <p className="pr-1">Welcome</p>
                <p>yq</p>
            </div>
            <div className="text-2xl font-bold">
                URL Shortener
            </div>
            <div className="cursor-pointer hover:underline" onClick={Logout}>
                Logout
            </div>
        </div>
    )
}