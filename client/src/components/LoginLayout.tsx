import { Outlet } from 'react-router-dom'
import urlshortenerLogo from '../assets/urlshortener.png'

export default function LoginLayout() {
    return (
        <div className="flex flex-row w-full h-screen">
            <div className="flex justify-center items-center w-[50%] bg-teal">
                <img className="w-[80%]" src={urlshortenerLogo} alt="logo" />
            </div>
            <div className="w-[50%]">
                <Outlet />
            </div>
        </div>
    )
}