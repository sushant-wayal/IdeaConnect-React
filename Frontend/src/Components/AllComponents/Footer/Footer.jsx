import { Link } from "react-router-dom";

const Footer = ({ styling }) => {
    return (
        <div className={`w-full flex flex-col sm:flex-row  gap-2 sm:justify-between py-3 px-2 sm:items-center ${styling}`}>
            <div>
                © IdeaConnect | 2024
            </div>
            <div className="flex justify-center gap-28 sm:gap-10">
                <Link to="/contactUs"> Contact Us </Link>
                <Link to="/privacy"> Privacy </Link>
                <Link to="/about"> About </Link>
            </div>
        </div>
    )
}

export default Footer;