import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import { FiExternalLink } from 'react-icons/fi'
import { BiSolidCopy } from 'react-icons/bi'

import QrCodeDialog from './QrCodeDialog'
import DeleteURL from '../api/DeleteURLDataAPI'
import { DeleteUrlMsg, ProcessedUserUrlData } from '../type/struct'

export default function Card({itemDetails}: {itemDetails: ProcessedUserUrlData}) {

    const navigate = useNavigate()
    
    const getDateDiff = (date: Date) => {
        const dateTimeAgo = moment(new Date(date)).fromNow()
        return dateTimeAgo
    }

    const deleteURL = async (itemID: number, longurl: string, urlcode: string) => {
        const deleteMsg: DeleteUrlMsg = { "itemID": itemID, "longurl": longurl, "urlcode": urlcode}
        const response = await DeleteURL(deleteMsg)
        if (response.status === 200) {
            window.location.reload()
        } else if (response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('userID')
            alert("Session expired. Please login")
            navigate('/login')
        }
    }

    return (
        <div className="group border-2 border-slate-300 w-full">
            <div className="p-4 flex flex-row h-full">
                <div className="w-[80%] flex flex-col justify-between">
                    <div>
                        <div className="flex md:flex-row flex-col md:items-center">
                            <h1 className="font-bold md:text-md text-sm pr-2">{itemDetails.shorturl}</h1>
                            <div className="cursor-pointer" onClick={() => navigator.clipboard.writeText(itemDetails.shorturl)}>
                                <BiSolidCopy />
                            </div>
                        </div>
                        <h1 className="text-xs py-2 text-green-600 break-words">{itemDetails.longurl}</h1>
                    </div>
                    <h1 className="italic text-xs text-slate-500">{getDateDiff(itemDetails.createdAt)}</h1>
                </div>
                <div className="w-[20%] flex flex-col items-end justify-between invisible group-hover:visible">
                    <div className="cursor-pointer" onClick={() => deleteURL(itemDetails._id, itemDetails.longurl,itemDetails.urlcode)}>
                        <RxCross2 />
                    </div>
                    <div>
                        <QrCodeDialog qrCode={itemDetails.qrCode} />
                    </div>
                    <div className="cursor-pointer">
                        <a href={itemDetails.shorturl} target="_blank" rel="noopener noreferrer">
                            <FiExternalLink />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}