import { useState } from "react"

const TopNav = () => {
    const [prompt, setPrompt] = useState("");
    return (
        <div className="fixed top-2 sm:top-0 sm:right-0 sm:w-[calc(100vw*(5.4/6.5))] w-[95vw] right-1/2 translate-x-1/2 sm:translate-x-0 sm:h-[calc(100vh/10)] h-20 px-2 py-1 flex flex-col sm:flex-row justify-between sm:items-center sm:m-2 border-2 border-black border-solid rounded-2xl backdrop-blur-sm">
            <img className="w-[15vmax]" src="../../../../images/logo.png" alt="Logo"/>
            <input className="bg-transparent border-2 border-black border-solid rounded-full pl-8 py-1" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Search Ideas"/>
            <p className="absolute top-[44px] sm:top-6 right-[325px] sm:right-[250px]">🔎</p>
        </div>
    )
}

export default TopNav