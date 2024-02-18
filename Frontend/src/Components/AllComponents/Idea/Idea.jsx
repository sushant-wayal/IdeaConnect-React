import axios from "axios";
import { useEffect, useState } from "react";

const Idea = ({ thisIdea }) => {
    const { idea, profileImage, intrested, ideaOf } = thisIdea;
    const [username,setUsername] = useState("");
    useEffect(() => {
        const getUsername = async () => {
            const { data } = await axios.get("http://localhost:3000/activeUser",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (data.authenticated) {
                setUsername(data.username);
            }
        };
        getUsername();
    })
    return (
        <div className="w-[302px] h-[450px] border-2 border-black border-solid backdrop-blur-sm rounded-2xl p-2 flex flex-col gap-2">
            <div className="flex justify-center items-center relative border-b-2 border-b-black border-b-solid">
                <img className="absolute left-1 -top-[6px] w-7 h-7 rounded-full border-2" src={profileImage} alt="profile"/>
                <p>
                    {idea.title}
                </p>
            </div>
            <div className="w-full rounded-xl relative h-[280px] flex-shrink">
                <img className="w-full h-full rounded-xl flex-shrink" src={idea.media} alt="media"/>
                <div className="absolute top-2 left-2 px-2 py-1 bg-gray-600 rounded-xl">
                    <p>Category</p>
                </div>
                <div className="absolute top-2 right-2 px-2 py-1 bg-gray-600 rounded-xl">
                    <p>{username == ideaOf ? `${idea.intrested} Intrested` : intrested ? "Intrested" : "Intrested ?"}</p>
                </div>
            </div>
            <div className="flex flex-col gap-0">
                <p className="overflow-y-hidden border-2 border-black border-solid border-b-0 rounded-t-2xl p-[3px] leading-5 h-[50px]">
                    {idea.description}
                </p>
                <div className="bg-black w-full h-2"></div>
                <div className="flex justify-around border-2 border-black border-solid border-t-0 rounded-b-2xl p-1">
                    <div className="flex gap-1 justify-center items-center">
                        <img className="h-4 w-4" src="../../../../images/like.svg"/>
                        <p>{idea.likes}</p>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                        <img className="h-4 w-4" src="../../../../images/comment.svg"/>
                        <p>{idea.noOfComments}</p>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                        <img className="h-4 w-4" src="../../../../images/share.svg"/>
                        <p>{idea.noOfShare}</p>
                    </div>
                </div>
            </div>
            <p className="-mt-2 ml-3">
                {ideaOf}
            </p>
        </div>
    )
}

export default Idea;