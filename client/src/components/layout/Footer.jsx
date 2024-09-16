import { FaLinkedin } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { SiMicrosoftoutlook } from "react-icons/si";
import { toast } from "react-toastify";

export const Footer = () => {

    return (
        <>
            <footer className={`bg-slate-700 text-neutral-200 pb-5 scale-0 invisible sm:scale-100 sm:visible`}>
                <div className="text-center text-sm mt-4 mb-3">
                    © 2024 AgustinM12 All Rights Reserved
                </div>

                <div className="flex justify-around">
                    <a href="#" className="hover:text-[#0077B5] duration-300 text-2xl"
                    ><FaLinkedin /></a>

                    <a href="#" className="hover:text-[#0077B5] duration-300 text-2xl"
                    ><FaGithub /></a>

                    <a href="#" className="hover:text-[#0077B5] duration-300 text-2xl"
                    ><FaWhatsapp /></a>

                    <a href="#" className="hover:text-[#0077B5] duration-300 text-2xl"
                    ><SiMicrosoftoutlook /></a>

                    <a href="#" className="hover:text-[#0077B5] duration-300 text-2xl"
                    ><SiGmail /></a>

                </div>
            </footer>
        </>
    )
}