import Card from "./Card"

export default function storage() {

    const store: number[] = [1,2,3]

    return (
        <div className="h-screen mx-16 my-12">
            <h1 className="font-bold text-2xl">Your Shortened URLs</h1>
            <div className="grid grid-cols-2 gap-4 pt-4">
                {store.length > 0 ?
                    store.map((item,index) => (
                        <Card key={index} />
                    )) :
                    <h1>You do not have any links stored!</h1>
                }
            </div>
        </div>
    )
}