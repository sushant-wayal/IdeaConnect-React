import Idea from "../Idea/Idea";
import SideNav from "../SideNav/SideNav";
import TopNav from "../TopNav/TopNav";
import { useState } from "react";
import "./Ideas.css"
import Footer from "../Footer/Footer";

const Ideas = () => {
    const [ideas, setIdeas] = useState(["","","","","",""]);
    return (
        <div>
            <SideNav/>
            <TopNav/>
            <div id="ideas" className="fixed right-2 h-[calc(90vh-22px)] top-[calc(10vh+16px)] w-[calc(100vw*(5.4/6.5))] flex justify-start gap-4 p-2 pb-0 flex-wrap overflow-scroll">
                {ideas.map(val => (
                    <Idea key={val} idea={val}/>
                ))}
                <Footer styling={"border-2 border-black border-solid rounded-2xl pr-5"}/>
            </div>
        </div>
    )
}

export default Ideas;