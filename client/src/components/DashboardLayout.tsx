import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
    return (
        <div className="flex flex-row w-full h-full">
            <div className="w-[5%] h-screen bg-teal">
                <Sidebar />
            </div>
            <div className="w-[95%] h-screen">
                <div className="h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}