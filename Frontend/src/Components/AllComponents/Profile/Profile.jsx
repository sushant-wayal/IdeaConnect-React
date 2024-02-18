import { Link, useParams } from "react-router-dom"
import SideNav from "../SideNav/SideNav";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Profile.css"
import Idea from "../Idea/Idea";

const Profile = () => {
    const { username } = useParams();
    const [activeUsername, setActiveUsername] = useState("");
    const [user, setUser] = useState({});
    const [following, setFollowing] = useState(false);
    const [ideas, setIdeas] = useState([]);
    useEffect(() => {
        const getUsername = async () => {
            const { data } = await axios.get("http://localhost:3000/activeUser",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (data.authenticated) {
                setActiveUsername(data.username);
            }
        };
        getUsername();
        const getUser = async () => {
            const { data } = await axios.get(`http://localhost:3000/profile/${username}`);
            setUser(data);
        }
        getUser();
        const checkFollow = async () => {
            const { data } = await axios.get(`http://localhost:3000/checkFollow/${activeUsername}/${username}`);
            setFollowing(data.follow);
        }
        checkFollow();
        const getIdeas = async () => {
            const { data } = await axios.get(`http://localhost:3000/ideas/${username}/${activeUsername}`);
            setIdeas(data.ideas);
        }
        getIdeas();
    },[activeUsername, following, username])
    return (
        <div className="flex justify-end p-2">
            <SideNav/>
            <div className="relative w-[calc(100vw*5.4/6.5)] flex flex-col justify-center gap-2">
                <div className="border-2 border-black border-solid rounded-2xl p-2">
                    <div className="backdrop-blur-sm flex flex-col gap-1 items-center justify-center p-5 rounded-t-2xl relative">
                        <img className="object-cover h-32 w-32 rounded-full border-2 border-black border-solid" src={user.profileImage} alt="Profile Image"/>
                        <p>{user.username}</p>
                        <div className="flex justify-center gap-5">
                            <div className="w-24 flex flex-col justify-center items-center gap-px p-px rounded-2xl border-2 border-black border-solid">
                                <p>Followers</p>
                                <p>{user.followers}</p>
                            </div>
                            <div className="w-24 flex flex-col justify-center items-center gap-px p-px rounded-2xl border-2 border-black border-solid">
                                <p>Following</p>
                                <p>{user.following}</p>
                            </div>
                            <div className="w-24 flex flex-col justify-center items-center gap-px p-px rounded-2xl border-2 border-black border-solid">
                                <p>Ideas</p>
                                <p>{user.noOfIdeas}</p>
                            </div>
                        </div>
                        <div className="border-2 border-black border-solid rounded-2xl p-1 w-80">
                            <p className="border-b-2 border-b-black border-b-solid">{user.firstName} {user.lastName}</p>
                            <p id="bio" className="overflow-y-scroll h-14">{user.secret}</p>
                        </div>
                        {activeUsername == username ?
                        <>
                            <Link className="absolute top-2 right-2 bg-gray-500 border-2 border-black border-solid py-1 px-2 rounded-2xl">Edit Profile</Link>
                            <Link className="absolute top-48 right-1/4 bg-gray-500 border-2 border-black border-solid py-1 px-2 rounded-2xl" to="/newIdea">Publish New Idea</Link>
                        </>
                        :
                        <>
                            <button className="absolute top-48 right-[375px] bg-gray-500 border-2 border-black border-solid py-1 px-2 rounded-2xl">{following ? "Following" : "Follow"}</button>
                            <Link className="absolute top-48 right-[275px] bg-gray-500 border-2 border-black border-solid py-1 px-2 rounded-2xl">Message</Link>
                        </>
                        }
                    </div>
                    {user.noOfIdeas > 0 ? 
                    <>
                    <p className="border-t-2 border-b-2 border-black border-solid text-center backdrop-blur-sm text-lg mb-2">My Ideas</p>
                    <div className="flex flex-start flex-wrap gap-4">
                        {ideas.map(val => (
                            <>
                                <Idea key={val.ideaId} thisIdea={{
                                    idea: val.idea,
                                    profileImage: val.profileImage,
                                    intrested: val.intrested,
                                    ideaOf: val.ideaOf,
                                }}/>
                            </>
                        ))}
                    </div>
                    </>:<></>}
                </div>
                <Footer styling={`border-2 border-black border-solid rounded-2xl pr-5 backdrop-blur-sm ${user.noOfIdeas == 0 ? "absolute -bottom-[345px]" : ""}`}/>
            </div>
        </div>
    )
}

export default Profile