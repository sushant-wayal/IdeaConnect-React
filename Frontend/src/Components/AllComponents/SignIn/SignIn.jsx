import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import SignInUpNav from "../SignInUpNav/SignInUpNav"
import { useState } from "react";
import axios from "axios";

const SignIn = () => {
    const [see, setSee] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const login = (e) => {
        e.preventDefault();
        axios.post("http://172.16.17.183:3000/login", {
            username,
            password,
        })
        .then(({data}) => {
            if (data.authenticated) {
                setErrorMsg("");
                localStorage.setItem("token",data.token);
                navigate("/ideas");
            }
            else {
                setErrorMsg("Invalid Username or Password. Try Again");
            }
        })
        .catch(error => {
            console.error(error.message);
        })
    }
    return (
        <div className="h-lvh w-lvw flex flex-col justify-between items-center">
            <SignInUpNav/>
            <form onSubmit={login} className="relative top-1/2 -translate-y-1/2 sm:h-96 h-[400px] w-80 flex flex-col justify-between items-center sm:gap-7 gap-0 border-2 border-black border-solid rounded-3xl p-3 py-5 backdrop-blur-sm">
                <h3 className="sm:text-4xl text-5xl font-semibold sm:mb-5"> Log In </h3>
                <div className="relative w-full flex flex-col justify-center gap-2">
                    <input onChange={(e) => setUsername(e.target.value)} className="py-1 px-3 w-full bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="text" placeholder="Username"/>
                    <input onChange={(e) => setPassword(e.target.value)} className="py-1 px-3 w-full bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type={`${see ? "text" : "password"}`} placeholder="Password"/>
                    <img onClick={() => setSee(!see)} className="absolute h-7 right-3 top-12 cursor-pointer" src={`../../../../images/${!see ? "see" : "hide"}.png`} alt="see"/>
                </div>
                <p className="absolute left-5 top-48 text-red-600 font-semibold text-sm"> {errorMsg} </p>
                <label className="relative -left-20" htmlFor="rememberMe">
                    <input name="rememberMe" id="rememberMe" type="checkbox"/> Remember Me
                </label>
                <button className="p-2 border-2 border-black border-solid rounded-2xl sm:text-sm text-2xl sm:w-20 w-32" type="submit"> Log    in </button>
                <Link className="underline sm:text-sm text-lg" to="/signUp"> <i> Create New Account </i> </Link>
            </form>
            <Footer styling={""}/>
        </div>
    )
}

export default SignIn;