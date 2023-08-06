import { useState, ChangeEvent } from 'react'
import { BiLink } from 'react-icons/bi'

import ShortenURL from '../api/ShortenUrlAPI'
import { LongURLMsg } from '../type/struct'

export default function Home() {

    const [longurl, setLongurl] = useState<LongURLMsg>({ "longURL": ""})
    const [shorturl, setShorturl] = useState<string>("")
    const [copied, setCopied] = useState<boolean>(false)
    const [invalid, setInvalid] = useState<boolean>(false)

    const getShortURL = async () => {
        // Validate URL before shortening
        if (isValidUrl(longurl.longURL)) {
            const response = await ShortenURL(longurl)
            if (response.status === 200) {
                setShorturl(response.data.shortURL)
            }
        } else {
            setInvalid(true)
        }
    }

    const isValidUrl = (urlString: string) => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLongurl({ "longURL": e.target.value })
        setInvalid(false)
    }

    const copyClipboard = () => {
        navigator.clipboard.writeText(shorturl)
        setCopied(true)
    }

    return (
        <div className="h-screen mx-16 my-12">
            <h1 className="pb-4">URL Shortener:</h1>
            <div className="grid grid-cols-4 gap-8">
                <div className="border-2 border-slate-200 bg-slate-200 rounded-lg col-span-3 h-12 flex flex-row items-center">
                    <div className="px-4">
                        <BiLink className="text-2xl" />
                    </div>
                    <input className="w-full mr-4 bg-slate-200" placeholder='Enter Link' type="text" value={longurl.longURL} onChange={handleChange} />
                </div>
                <div>
                    <div className="border-2 border-teal bg-teal rounded-lg h-12 flex justify-center items-center cursor-pointer transition ease-in-out delay-350 hover:-translate-y-1" onClick={getShortURL}>
                        <h1 className="text-white">Shorten</h1>
                    </div>
                </div>
            </div>
            <div className={`text-red-600 ${invalid ? "" : "hidden"}`}>Invalid URL!</div>
            <div className="pt-12 pb-4">Shortened URL:</div>
            <div className="grid grid-cols-8 gap-8">
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