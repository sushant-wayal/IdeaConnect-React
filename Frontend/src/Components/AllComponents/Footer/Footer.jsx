import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="w-full flex justify-between py-3 px-2 items-center">
            <div>
                © IdeaConnect | 2024
            </div>
            <div className="flex justify-center gap-10">
                <Link to="/contactUs"> Contact Us </Link>
                <Link to="/privacy"> Privacy </Link>
                <Link to="/about"> About </Link>
            </div>
        </div>
    )
}

export default Footer;