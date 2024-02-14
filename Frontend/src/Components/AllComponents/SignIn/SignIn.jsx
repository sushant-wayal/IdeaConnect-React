import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import SignInUpNav from "../SignInUpNav/SignInUpNav"
import { useState } from "react";

const SignIn = () => {
    const [see, setSee] = useState(false);
    return (
        <div className="h-lvh w-lvw flex flex-col justify-between items-center">
            <SignInUpNav/>
            <form className="relative top-1/2 -translate-y-1/2 h-96 w-80 flex flex-col justify-between items-center gap-7 border-2 border-black border-solid rounded-3xl p-3 py-5 backdrop-blur-sm">
                <h3 className="text-4xl font-semibold mb-5"> Log In </h3>
                <div className="relative w-full flex flex-col justify-center gap-2">
                    <input className="py-1 px-3 w-full bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="text" placeholder="Username"/>
                    <input className="py-1 px-3 w-full bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type={`${see ? "text" : "password"}`} placeholder="Password"/>
                    <img onClick={() => setSee(!see)} className="absolute h-7 right-3 top-12 cursor-pointer" src={`../../../../images/${!see ? "see" : "hide"}.png`} alt="see"/>
                </div>
                <p style={{display: "none"}} className="absolute left-5 top-44 text-red-600 font-bold"> Display Error Message </p>
                <label className="relative -left-20" htmlFor="rememberMe">
                    <input name="rememberMe" id="rememberMe" type="checkbox"/> Remenber Me
                </label>
                <button className="p-2 border-2 border-black border-solid rounded-2xl" type="submit"> Log in </button>
                <Link className="underline" to="/signUp"> <i> Create New Account </i> </Link>
            </form>
            <Footer/>
        </div>
    )
}

export default SignIn;