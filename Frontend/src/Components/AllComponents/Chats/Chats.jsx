const Chats = () => {
    return (
        <div className="h-lvh w-lvw flex p-2">
            <div className="h-full w-60 rounded-2xl border-2 border-black border-solid flex flex-col p-2 backdrop-blur-sm">
                <div className="border-b-2 border-black border-solid pb-1 flex justify-between items-center">
                    <p className="text-xl font-semibold">
                        Chats
                    </p>
                    <div className="rounded-full relative">
                        <input className="rounded-full w-40 bg-transparent border-2 border-black border-solid pl-8" type="search"/>
                        <p className="absolute top-1/2 -translate-y-1/2 left-2">🔎</p>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div></div>
        </div>
    )
}

export default Chats