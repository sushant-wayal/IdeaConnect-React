import axios from "axios";
import Footer from "../Footer/Footer"
import SignInUpNav from "../SignInUpNav/SignInUpNav"
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [profileImage, setProfileImage] = useState("../../../../images/ProfileImageUpload/defaultOther.jpg");
    const [profileImageSet, setProfileImageSet] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [DOB, setDOB] = useState("dd-mm-yyyy");
    const [country, setCountry] = useState("Select the Country");
    const [countryCode, setCountryCode] = useState("Select Country Code");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email,setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [see,setSee] = useState(false);

    const countries = useLoaderData();

    const [countryCodes, setCountryCodes] = useState([["Select Country Code",true]]);

    const navigate = useNavigate();

    const countryChange = async (e) => {
        const thisCountry = e.target.value;
        setCountry(thisCountry);
        setCountryCodes([]);
        let { data } = await axios.get(`https://restcountries.com/v3.1/name/${thisCountry}?fullText=true`);
        const { root, suffixes } = data[0].idd;
        if (suffixes.length > 1) {
            setCountryCodes(prev => [...prev, ["Select Country Code",true]]);
            suffixes.forEach(suffix => {
                setCountryCodes(prev => [...prev, [root+suffix,false]]);
            })
        }
        else {
            setCountryCodes([[root+suffixes[0],false]]);
        }
    }

    const upload = async (formData) => {
        const { data } = await axios.post("http://localhost:3000/upload",formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })

        if (data.success) {
            setProfileImageSet(true);
            setProfileImage(data.url);
        }
        else {
            console.log("Check BackEnd");
        }
    }
    const fileChange = async (e) => {
        let formData = new FormData();
        formData.append("file",e.target.files[0]);
        await upload(formData);
        document.querySelector("#profileImage").remove();
    }
    const imageUpload = () => {
        let input = document.createElement("input");
        input.type = "file";
        input.id = "profileImage";
        document.body.append(input);
        input.onchange = fileChange;
        input.click();
    }
    const genderChange = (e) => {
        if (!profileImageSet) {
            if (e.target.value == "male") {
                setGender("male");
                setProfileImage("../../../../images/ProfileImageUpload/defaultMale.jpg")
            }
            else if (e.target.value == "female") {
                setGender("female");
                setProfileImage("../../../../images/ProfileImageUpload/defaultFemale.jpeg");
            }
            else {
                setGender("other");
                setProfileImage("../../../../images/ProfileImageUpload/defaultOther.jpg");
            }
        }
    }
    const register = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("http://localhost:3000/register",{
            username,
            password,
            firstName,
            secondName,
            countryCode,
            phoneNumber,
            email,
            DOB,
            gender,
            nickname,
            profileImage,
        });
        if (data.authenticated) {
            localStorage.setItem("token",data.token);
            navigate("/ideas");
        }
        else {
            alert("Something went wrong. Please try Again");
        }
    }
    return (
        <div className="flex flex-col justify-between items-center">
            <SignInUpNav/>
            <div className="flex flex-col justify-between gap-5 items-center w-full relative top-20">
                <form onSubmit={register} className="flex flex-col gap-7 p-4 w-2/6 backdrop-blur-sm border-2 border-black border-solid rounded-3xl">
                    <img onClick={imageUpload} className="h-40 w-40 object-cover rounded-full border-2 border-black border-solid relative left-1/2 -translate-x-1/2 cursor-pointer" src={profileImage} alt="Profile Photo"/>
                    <div className="flex justify-between gap-3">
                        <input onChange={(e) => setFirstName(e.target.value)} value={firstName} className="py-1 px-3 w-full bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="text" placeholder="First"/>
                        <input onChange={(e) => setSecondName(e.target.value)} value={secondName} className="py-1 px-3 w-full bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="text" placeholder="Last (optional)"/>
                    </div>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} className="py-1 px-3 w-60 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="text" placeholder="Username"/>
                    <div className="relative">
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className="py-1 px-3 w-60 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type={see ? "text" : "password"} placeholder="Password"/>
                        <img onClick={() => setSee(!see)} className="absolute h-7 left-[200px] bottom-1 cursor-pointer" src={`../../../../images/${see ? "hide" : "see"}.png`} alt="see"/>
                    </div>
                    <div className="flex justify-start items-center gap-5 text-lg">
                        <p> Gender : </p>
                        <label className="cursor-pointer" htmlFor="male">
                            <input onChange={genderChange} checked={gender == "male"} id="male" type="radio" value="male" name="gender"/> Male
                        </label>
                        <label className="cursor-pointer" htmlFor="female">
                            <input onChange={genderChange} checked={gender == "female"} id="female" type="radio" value="female" name="gender"/> Female
                        </label>
                        <label className="cursor-pointer" htmlFor="other">
                            <input onChange={genderChange} checked={gender == "other"} id="other" type="radio" value="other" name="gender"/> other
                        </label>
                    </div>
                    <div className="flex justify-start gap-5 items-center">
                        <p> DOB : </p>
                        <input onChange={(e) => setDOB(e.target.value)} value={DOB} className="py-1 px-3 w-40 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full" type="date"/>
                    </div>
                    <select value={country} onChange={countryChange} className="py-1 px-3 w-60 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full">
                        <option disabled> Select the Country </option>
                        {countries.map(country => (
                            <option key={country}>{country}</option>
                        ))}
                    </select>
                    <div className="flex flex-col justify-center gap-3">
                        <div className="flex justify-start gap-3">
                            <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="py-1 px-3 w-52 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full">
                                {countryCodes.map(thisCode => (
                                    <option disabled={thisCode[1]} key={thisCode[0]}>{thisCode[0]}</option>
                                ))}
                            </select>
                            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="py-1 px-3 w-60 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="number" placeholder="Phone Number"/>
                        </div>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="py-1 px-3 w-60 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="email" placeholder="Email"/>
                    </div>
                    <input value={nickname} onChange={(e) => setNickname(e.target.value)} className="py-1 px-3 w-60 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="text" placeholder="Nickname"/>
                    <button type="submit" className="p-1 border-2 border-black border-solid rounded-2xl relative left-1/2 -translate-x-1/2 w-24"> Register </button>
                </form>
                <Footer styling={""}/>
            </div>
        </div>
    )
}

export default SignUp

export const fecthData = async () => {
    const { data } = await axios.get("https://restcountries.com/v3/all");
    let countries = [];
	data.forEach(country => {
		countries.push(country.name.common);
	})
	countries = countries.sort();
    return countries;
}