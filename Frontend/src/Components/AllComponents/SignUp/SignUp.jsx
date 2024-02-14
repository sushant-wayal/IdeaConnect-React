import Footer from "../Footer/Footer"
import SignInUpNav from "../SignInUpNav/SignInUpNav"

const SignUp = () => {
    const imageUpload = () => {
        let form = document.createElement("form");
        form.enctype = "multipart/form-data";
        let input = document.createElement("input");
        input.type = "file";
        form.append(input);
        let submit = document.createElement("button");
        submit.type = "submit";
        form.append(submit);
        input.click();
        input.addEventListener("change", () => {
            document.body.append(form);
            submit.click();
            form.remove();
        })
    }
    return (
        <div className="flex flex-col justify-between items-center">
            <SignInUpNav/>
            <div className="flex flex-col justify-between gap-5 items-center w-full relative top-20">
                <form className="flex flex-col gap-7 p-4 w-2/6 backdrop-blur-sm border-2 border-black border-solid rounded-3xl">
                    <img onClick={imageUpload} className="h-40 w-40 object-center rounded-full border-2 border-black border-solid relative left-1/2 -translate-x-1/2" src="../../../../images/ProfileImageUpload/defaultOther.jpg" alt="Profile Photo"/>
                    <div className="flex justify-between gap-3">
                        <input className="py-1 px-3 w-full bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="text" placeholder="First"/>
                        <input className="py-1 px-3 w-full bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="text" placeholder="Last (optional)"/>
                    </div>
                    <input className="py-1 px-3 w-60 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="text" placeholder="Username"/>
                    <div className="relative">
                        <input className="py-1 px-3 w-60 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="password" placeholder="Password"/>
                        <img className="absolute h-7 left-[200px] bottom-1 cursor-pointer" src="../../../../images/see.png" alt="see"/>
                    </div>
                    <div className="flex justify-start items-center gap-5 text-lg">
                        <p> Gender : </p>
                        <label htmlFor="male">
                            <input id="male" type="radio" value="male" name="gender"/> Male
                        </label>
                        <label htmlFor="female">
                            <input id="female" type="radio" value="female" name="gender"/> Female
                        </label>
                        <label htmlFor="other">
                            <input id="other" type="radio" value="other" name="gender"/> other
                        </label>
                    </div>
                    <div className="flex justify-start gap-5 items-center">
                        <p> DOB : </p>
                        <input className="py-1 px-3 w-40 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full" type="date"/>
                    </div>
                    <select defaultValue={"Select the Country"} className="py-1 px-3 w-60 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full">
                        <option disabled> Select the Country </option>
                    </select>
                    <div className="flex flex-col justify-center gap-3">
                        <div className="flex justify-start gap-3">
                            <select defaultValue={"Country Code"} className="py-1 px-3 w-52 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full">
                                <option disabled> Country Code </option>
                            </select>
                            <input className="py-1 px-3 w-60 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="number" placeholder="Phone Number"/>
                        </div>
                        <input className="py-1 px-3 w-60 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="email" placeholder="Email"/>
                    </div>
                    <input className="py-1 px-3 w-60 bg-gray-600 bg-opacity-80 border-2 border-black border-solid rounded-full placeholder:text-white placeholder:opacity-80" type="text" placeholder="Nickname"/>
                    <button className="p-1 border-2 border-black border-solid rounded-2xl relative left-1/2 -translate-x-1/2 w-24"> Register </button>
                </form>
                <Footer/>
            </div>
        </div>
    )
}

export default SignUp