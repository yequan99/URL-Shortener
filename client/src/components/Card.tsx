import moment from 'moment'
import { RxCross2 } from 'react-icons/rx'
import { FiExternalLink } from 'react-icons/fi'
import DeleteURL from '../api/DeleteURLDataAPI'
import { DeleteUrlMsg, UserUrlData } from '../type/struct'

export default function Card({itemDetails}: {itemDetails: UserUrlData}) {
    
    const getDateDiff = (date: Date) => {
        const dateTimeAgo = moment(new Date(date)).fromNow()
        return dateTimeAgo
    }

    const deleteURL = async (itemID: number) => {
        const deleteMsg: DeleteUrlMsg = { "itemID": itemID }
        const response = await DeleteURL(deleteMsg)
        if (response.status === 200) {
            window.location.reload()
        }
    }

    return (
        <div className="group border-2 border-slate-300 w-full">
            <div className="m-4 flex flex-row">
                <div className="w-[80%]">
                    <h1 className="font-bold">{itemDetails.shorturl}</h1>
                    <h1 className="text-xs py-2 text-green-600 break-words">{itemDetails.longurl}</h1>
                    <h1 className="italic text-xs text-slate-500">{getDateDiff(itemDetails.createdAt)}</h1>
                </div>
                <div className="w-[20%] flex flex-col items-end justify-between invisible cursor-pointer group-hover:visible">
                    <div onClick={() => deleteURL(itemDetails._id)}><RxCross2 /></div>
                    <a href={itemDetails.shorturl} target="_blank" rel="noopener noreferrer">
                        <FiExternalLink />
                    </a>
                </div>

            </div>
        </div>
    )
}