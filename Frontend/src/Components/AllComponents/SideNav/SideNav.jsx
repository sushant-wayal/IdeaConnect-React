import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiMenu3Line } from "@remixicon/react"

const SideNav = () => {
    const active = (isActive) => {
        let style = "p-1 border-2 border-black border-solid rounded-full text-center w-full";
        if (isActive) {
            style += " bg-black text-white";
        }
        return style;
    }
    const [username,setUsername] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const getUsername = async () => {
            const { data } = await axios.get("http://172.16.17.183:3000/activeUser",{
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
    const logout = () => {
        localStorage.setItem("token",null);
        navigate("/");
    }
    const [seeing, setSeeing] = useState(false);
    return (
        <>
            <RiMenu3Line className="sm:hidden fixed right-5 top-4 z-50"/>
            <div className="h-[calc(98vh)] fixed left-0 top-0 p-3 sm:flex flex-col justify-between w-[calc(100vw/6.5)] m-2 border-2 border-black border-solid rounded-2xl backdrop-blur-sm hidden" onClick={() => setSeeing(!seeing)}>
                <div className="flex flex-col justify-center gap-5 w-full">
                    <NavLink className={({isActive}) => active(isActive)} to="/ideas"> Feed </NavLink>
                    <NavLink className={({isActive}) => active(isActive)} to="/myIdeas"> My Ideas </NavLink>
                    <NavLink className={({isActive}) => active(isActive)} to="/invitedIdeas"> Invited Ideas </NavLink>
                    <NavLink className={({isActive}) => active(isActive)} to="/exploreIdeas"> Explore Ideas </NavLink>
                    <NavLink className={({isActive}) => active(isActive)} to="/collaboratedIdeas"> Collaborated Ideas </NavLink>
                    <NavLink className={({isActive}) => active(isActive)} to="/intrestedIdeas"> Intrested Ideas </NavLink>
                </div>
                <div className="flex flex-col justify-center gap-5 w-full">
                    <button onClick={logout} className="p-1 border-2 border-black border-solid rounded-full text-center w-full"> Logout </button>
                    <NavLink className={({isActive}) => active(isActive)} to={`/profile/${username}`}> Profile </NavLink>
                    <NavLink className={({isActive}) => active(isActive)} to="/settings"> Settings </NavLink>
                </div>
            </div>
        </>
    )
}

export default SideNav