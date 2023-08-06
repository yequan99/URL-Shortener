import moment from 'moment'

export default function Card({itemID, longurl, shorturl, date}: {itemID: number, longurl: string, shorturl: string, date: Date}) {
    
    const getDateDiff = (date: Date) => {
        const dateTimeAgo = moment(new Date(date)).fromNow()
        return dateTimeAgo
    }

    return (
        <div className="border-2 border-slate-300">
            <div className="m-4">
                <h1 className="font-bold">{shorturl}</h1>
                <h1 className="text-xs py-2 text-green-600">{longurl}</h1>
                <h1 className="italic text-xs text-slate-500">{getDateDiff(date)}</h1>
            </div>
        </div>
    )
}