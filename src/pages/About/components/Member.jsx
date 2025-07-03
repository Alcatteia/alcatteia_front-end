import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";

const Member = ({ image, icon, name }) => {
    return (
        <div className="relative">
            <img src={icon} alt="Lobo" className="absolute bottom-[295px]" />

            <div className="bg-[#000000] p-5 py-6 rounded-xl">
                <div className="h-52 w-52 mx-auto rounded-sm">
                    <img 
                        src={image} 
                        alt={`Integrante: ${name}`} 
                        className="h-48 rounded-xl" 
                    />
                </div>

                <div>
                    <span className="text-center font-semibold uppercase w-full inline-block text-lg text-white">{name}</span>
                    <div className="flex gap-4 justify-center mt-2 text-2xl text-gray-300">
                        <BsLinkedin />
                        <BsInstagram />
                        <BsFacebook />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Member