import { useState } from "react"

const TopNav = () => {
    const [prompt, setPrompt] = useState("");
    return (
        <div className="fixed top-0 right-0 w-[calc(100vw*(5.4/6.5))] h-[calc(100vh/10)] px-2 py-1 flex justify-between items-center m-2 border-2 border-black border-solid rounded-2xl backdrop-blur-sm">
            <img className="h-full" src="../../../../images/logo.png" alt="Logo"/>
            <input className="bg-transparent border-2 border-black border-solid rounded-full pl-8 py-1" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Search Ideas"/>
            <p className="absolute right-[250px]">🔎</p>
        </div>
    )
}

export default TopNav