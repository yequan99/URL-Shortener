import { Outlet } from 'react-router-dom'
import urlshortenerLogo from '../assets/urlshortener.png'

export default function LoginLayout() {
    return (
        <div className="flex flex-row w-full h-screen">
            <div className="hidden md:flex md:justify-center md:items-center md:w-[50%] bg-teal">
                <img className="w-[80%]" src={urlshortenerLogo} alt="logo" />
            </div>
            <div className="md:w-[50%] w-screen md:bg-white bg-teal">
                <Outlet />
            </div>
        </div>
    )
}