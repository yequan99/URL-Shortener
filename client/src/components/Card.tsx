export default function Card() {
    return (
        <div className="border-2 border-slate-300">
            <div className="m-4">
                <h1 className="font-bold">Shortened URL</h1>
                <h1 className="text-xs py-2 text-green-600">Long URL</h1>
                <h1 className="italic text-xs text-slate-500">17 hours ago</h1>
            </div>
        </div>
    )
}