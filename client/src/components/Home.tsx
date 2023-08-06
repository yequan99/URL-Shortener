import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiLink } from 'react-icons/bi'

import ShortenURL from '../api/ShortenUrlAPI'
import { LongURLMsg } from '../type/struct'

export default function Home() {

    const navigate = useNavigate()
    const [longurl, setLongurl] = useState<LongURLMsg>({ "longURL": ""})
    const [shorturl, setShorturl] = useState<string>("")
    const [copied, setCopied] = useState<boolean>(false)
    const [invalid, setInvalid] = useState<boolean>(false)

    const getShortURL = async () => {
        const response = await ShortenURL(longurl)
        if (response.status === 200) {
            setShorturl(response.data.shortURL)
        } else if (response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('userID')
            navigate('/login')
        } else {
            setInvalid(true)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLongurl({ "longURL": e.target.value })
        setInvalid(false)
        setShorturl("")
    }

    const copyClipboard = () => {
        navigator.clipboard.writeText(shorturl)
        setCopied(true)
    }

    return (
        <div className="h-screen px-16 py-12">
            <h1 className="pb-4">URL Shortener:</h1>
            <div className="flex flex-col gap-y-4 lg:grid lg:grid-cols-4 lg:gap-8">
                <div className="border-2 border-slate-200 bg-slate-200 rounded-lg col-span-3 h-12 flex flex-row items-center">
                    <div className="px-4">
                        <BiLink className="text-2xl" />
                    </div>
                    <input className="w-full p-1 mr-4 bg-slate-200" placeholder='Enter Link' type="text" value={longurl.longURL} onChange={handleChange} />
                </div>
                <div>
                    <div className="border-2 border-teal bg-teal rounded-lg h-12 flex justify-center items-center cursor-pointer transition ease-in-out delay-350 hover:-translate-y-1" onClick={getShortURL}>
                        <h1 className="text-white">Shorten</h1>
                    </div>
                </div>
            </div>
            <div className={`text-red-600 ${invalid ? "" : "invisible"}`}>Invalid URL!</div>
            <div className="pt-12 pb-4">Shortened URL:</div>
            <div className="flex flex-col gap-y-4 lg:grid lg:grid-cols-8 lg:gap-8">
                <div className="border-2 border-slate-200 bg-slate-200 rounded-lg col-span-4 h-12 flex flex-row items-center pl-4">
                <input disabled className="w-full mr-4 bg-slate-200" placeholder='Generated link' type="text" value={shorturl} />
                </div>
                <div>
                    <div className="border-2 border-teal bg-teal rounded-lg col-span-1 h-12 flex justify-center items-center cursor-pointer transition ease-in-out delay-350" onClick={copyClipboard}>
                        {copied ? <h1 className="text-white">Copied!</h1> : <h1 className="text-white">Copy</h1>}
                    </div>
                </div>
            </div>
        </div>
    )
}