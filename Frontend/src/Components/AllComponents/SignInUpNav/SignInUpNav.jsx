import { NavLink } from "react-router-dom"


const SignInUpNav = () => {
    const active = (isActive) => {
        let style = "p-3";
        if (isActive) {
            style += " border-2 border-black border-solid rounded-3xl";
        }
        return style;
    }
    return (
        <div className="fixed top-0 w-full flex h-20 py-1 px-2 pr-5 justify-between items-center">
            <img className="h-full" src="../../../../images/logo.png" alt="IdeaConnect"/>
            <div className="flex justify-center gap-10">
                <NavLink className={({isActive}) => active(isActive)} to="/" > Sign In </NavLink>
                <NavLink className={({isActive}) => active(isActive)} to="/signUp"> Sign Up </NavLink>
            </div>
	    </div>
    )
}

export default SignInUpNav