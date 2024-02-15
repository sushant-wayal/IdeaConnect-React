import { NavLink } from "react-router-dom"

const SideNav = () => {
    const active = (isActive) => {
        let style = "p-1 border-2 border-black border-solid rounded-full text-center w-full";
        if (isActive) {
            style += " bg-black text-white";
        }
        return style;
    }
    return (
        <div className="h-[calc(98vh)] fixed left-0 top-0 p-3 flex flex-col justify-between w-[calc(100vw/6.5)] m-2 border-2 border-black border-solid rounded-2xl backdrop-blur-sm">
            <div className="flex flex-col justify-center gap-5 w-full">
                <NavLink className={({isActive}) => active(isActive)} to="../ideas"> Feed </NavLink>
                <NavLink className={({isActive}) => active(isActive)} to="../myIdeas"> My Ideas </NavLink>
                <NavLink className={({isActive}) => active(isActive)} to="../invitedIdeas"> Invited Ideas </NavLink>
                <NavLink className={({isActive}) => active(isActive)} to="../exploreIdeas"> Explore Ideas </NavLink>
                <NavLink className={({isActive}) => active(isActive)} to="../collaboratedIdeas"> Collaborated Ideas </NavLink>
                <NavLink className={({isActive}) => active(isActive)} to="../intrestedIdeas"> Intrested Ideas </NavLink>
            </div>
            <div className="flex flex-col justify-center gap-5 w-full">
                <NavLink className={({isActive}) => active(isActive)} to="../logout"> Logout </NavLink>
                <NavLink className={({isActive}) => active(isActive)} to="/profile/<%= user.username %>"> Profile </NavLink>
                <NavLink className={({isActive}) => active(isActive)} to="../settings"> Settings </NavLink>
            </div>
        </div>
    )
}

export default SideNav