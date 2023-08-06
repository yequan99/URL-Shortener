import { useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { BiHomeAlt2, BiData, BiSolidUser } from 'react-icons/bi'
import { Tooltip, IconButton } from '@mui/material'

import { LogoutID } from "../type/struct"
import UserLogout from "../api/LogoutAPI"

export default function Sidebar({username}: {username: string}) {

    const navigate = useNavigate()

    const Logout = async () => {
        const userID = localStorage.getItem("userID")
        const logoutID: LogoutID = { userID: userID }
        const response = await UserLogout(logoutID)
        if (response.status === 200) {
            navigate('/login')
        }
    }

    return (
        <div className="flex flex-col h-full justify-between py-4 items-center">
            <div>
                <Tooltip title={username} placement="right">
                    <IconButton>
                        <BiSolidUser color="#EDE9E8" className="text-2xl" />
                    </IconButton>
                </Tooltip>
            </div>
            <div>
                <div className="cursor-pointer" onClick={() => navigate('/')}>
                    <BiHomeAlt2 color="#EDE9E8" className="text-2xl" />
                </div>
                <div className="pt-8 cursor-pointer" onClick={() => navigate('/storage')}>
                    <BiData color="#EDE9E8" className="text-2xl" />
                </div>
            </div>
            <div className="cursor-pointer" onClick={Logout}>
                <HiOutlineLogout color="#EDE9E8" className="text-2xl" />
            </div>
        </div>
    )
}