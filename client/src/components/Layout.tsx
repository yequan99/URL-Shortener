import { Outlet } from 'react-router-dom'
import urlshortenerLogo from '../assets/urlshortener.png'

export default function Layout () {
    return (
        <div className="flex flex-row w-full h-screen">
            <div className="flex justify-center items-center w-[50%] bg-blue-600">
                <img className="w-[80%]" src={urlshortenerLogo} alt="logo" />
            </div>
            <div className="w-[50%]">
                <Outlet />
            </div>
        </div>
    )
}