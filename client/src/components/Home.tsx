import { useEffect, useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiLink } from 'react-icons/bi'

import UserData from '../api/UserDataAPI'

export default function Home() {

    const navigate = useNavigate()
    // const [username, setUsername] = useState<string>("")
    const [longurl, setLongurl] = useState<string>("")
    const [shorturl, setShorturl] = useState<string>("link to copy")
    const [copied, setCopied] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const userID = localStorage.getItem("userID")
        // const getUserData = async () => {
        //     const response = await UserData(userID, token)
        //     if (response.status === 401) {
        //         navigate('/login')
        //     }
        //     return response
        // }
        // getUserData().then((data) => {
        //     setUsername(data)
        // })
        // eslint-disable-next-line
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLongurl(e.target.value)
    }

    const copyClipboard = () => {
        navigator.clipboard.writeText(shorturl)
        setCopied(true)
    }

    return (
        <div className="h-screen mx-16 my-12">
            <h1 className="pb-4">URL Shortener: {longurl}</h1>
            <div className="grid grid-cols-4 gap-8">
                <div className="border-2 border-slate-200 bg-slate-200 rounded-lg col-span-3 h-12 flex flex-row items-center">
                    <div className="px-4">
                        <BiLink className="text-2xl" />
                    </div>
                    <form>
                        <input type="text" value={longurl} onChange={handleChange} />
                    </form>
                </div>
                <div>
                    <div className="border-2 border-teal bg-teal rounded-lg h-12 flex justify-center items-center cursor-pointer transition ease-in-out delay-350 hover:-translate-y-1">
                        <h1 className="text-white">Shorten</h1>
                    </div>
                </div>
            </div>
            <div className="pt-12 pb-4">Shortened URL:</div>
            <div className="grid grid-cols-8 gap-8">
                <div className="border-2 border-slate-200 bg-slate-200 rounded-lg col-span-4 h-12 flex flex-row items-center pl-4">
                    {shorturl}
                </div>
                <div>
                    <div className="border-2 border-teal bg-teal rounded-lg col-span-1 h-12 flex justify-center items-center cursor-pointer transition ease-in-out delay-350 hover:-translate-y-1" onClick={copyClipboard}>
                        {copied ? <h1 className="text-white">Copied!</h1> : <h1 className="text-white">Copy</h1>}
                    </div>
                </div>
            </div>
        </div>
    )
}