import Idea from "../Idea/Idea";
import SideNav from "../SideNav/SideNav";
import TopNav from "../TopNav/TopNav";
import "./Ideas.css"
import Footer from "../Footer/Footer";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const Ideas = () => {
    const data = useLoaderData();
    console.log(data.authenticated);
    let ideas = [];
    if (data.authenticated) {
        ideas = data.ideas;
    }
    if (ideas.length > 0) {
        return (
            <div>
                <SideNav/>
                <TopNav/>
                <div id="ideas" className="fixed right-2 h-[calc(90vh-22px)] top-[calc(10vh+16px)] w-[calc(100vw*(5.4/6.5))] flex justify-start gap-4 p-2 pb-0 flex-wrap overflow-scroll">
                    {ideas.map(val => (
                        <Idea key={val.ideaId} thisIdea={{
                            idea: val.idea,
                            profileImage: val.profileImage,
                            intrested: val.intrested,
                            ideaOf: val.ideaOf,
                        }}/>
                    ))}
                    <Footer styling={"border-2 border-black border-solid rounded-2xl pr-5 backdrop-blur-sm"}/>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <SideNav/>
                <TopNav/>
                <div id="ideas" className="fixed right-2 h-[calc(90vh-22px)] top-[calc(10vh+16px)] w-[calc(100vw*(5.4/6.5))] flex justify-center items-center gap-4 p-2 pb-0 flex-wrap overflow-scroll">
                    <p className="w-72 text-center backdrop-blur-sm rounded-2xl text-5xl p-4 border-2 border-black border-solid">No Ideas in Your Feed</p>
                    <Footer styling={"border-2 border-black border-solid rounded-2xl pr-5 absolute bottom-0 right-0 backdrop-blur-sm"}/>
                </div>
            </div>
        )
    }
}

export default Ideas;

export const getFeed = async () => {
    const jwt = localStorage.getItem("token");
    const { data } = await axios.get("http://localhost:3000/ideas/feed",{
        headers: {
            "Authorization" : `Bearer ${jwt}`,
        }
    });
    return data;
}