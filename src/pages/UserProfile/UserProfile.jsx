import LogoPerfil from "../../assets/login/logo_login.svg";

import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import EditProfileModal from "./EditProfileModal";

import { useState } from "react";



const UserProfile = () => {

    const [editProfile, setEditProfile] = useState(false);

    return (
        <section className="pl-4 sm:pl-6 md:pl-8 lg:pl-12 xl:px-16 xl:pr-5 pb-6 min-h-scree text-white grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#16032C] rounded-2xl p-10 col-span-1 flex flex-col gap-4">
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <div className="bg-purple-700 rounded-full w-max">
                                <img src={LogoPerfil} alt="Logo Alcatteia" />
                            </div>
                            <h2 className="text-xl lg:text-2xl xl:text-4xl font-bold mt-4">Talita Vitória</h2>
                            <p className="text-sm lg:text-base xl:text-lg text-purple-300">Desenvolvedora backend</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-white">
                                <MdEmail size={16} className="text-blue-600" />
                                <span className="lg:text-lg">talitinha.dev@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-white">
                                <FaPhoneAlt size={16} className="text-blue-600" />
                                <span className="lg:text-lg">(11)91347-2137</span>
                            </div>
                            <div className="flex items-center gap-3 text-white">
                                <FaLocationDot size={16} className="text-blue-600" />
                                <span className="lg:text-lg">São Paulo, Brazil</span>
                            </div>
                            <div className="flex items-center gap-3 text-white">
                                <SlCalender size={16} className="text-blue-600" />
                                <span className="lg:text-lg">Entrou 04/02/2025</span>
                            </div>
                        </div>
                    </div>

                    {/* Sobre */}
                    <div className="mt-5">
                        <h3 className="font-bold text-lg lg:text-xl xl:text-2xl mb-1">Sobre</h3>
                        <p className="mt-2 text-sm lg:text-base text-purple-200">
                            Desenvolvendo soluções backend robustas e escaláveis para sistemas corporativos com foco em performance e qualidade.
                        </p>
                    </div>

                    <button
                        className="bg-blue-700 font-semibold hover:bg-blue-600 transition rounded-xl py-2 w-full mt-7 text-sm lg:text-lg"
                        onClick={() => setEditProfile(true)}
                    >
                        Editar perfil
                    </button>
                </div>


                {/* Equipe */}
                <div className="mt-5">
                    <h3 className="font-bold text-lg lg:text-xl xl:text-2xl mb-1">Equipe</h3>
                    <div className="bg-[#2c0e4e] mt-5 rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-base lg:text-lg xl:text-xl">Alcatteia</p>
                            <div className="flex mt-4">
                                <div className="bg-purple-700 mr-[-15px] h-10 w-10 rounded-full">
                                    <img src={LogoPerfil} alt="Logo Alcatteia" className="w-full h-full" />
                                </div>
                                <div className="bg-red-700 h-10 w-10 mr-[-15px] rounded-full">
                                    <img src={LogoPerfil} alt="Logo Alcatteia" className="w-full h-full" />
                                </div>
                                <div className="bg-blue-700 h-10 w-10 mr-[-15px] rounded-full">
                                    <img src={LogoPerfil} alt="Logo Alcatteia" className="w-full h-full" />
                                </div>
                                <div className="bg-green-700 h-10 w-10 rounded-full">
                                    <img src={LogoPerfil} alt="Logo Alcatteia" className="w-full h-full" />
                                </div>
                                <span className="text-sm lg:text-lg xl:text-xl text-purple-200 ml-2">4+</span>
                            </div>
                        </div>
                        <button className="text-sm lg:text-lg underline">Ver equipe</button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                {/* Desempenho */}
                <div className="bg-[#16032C] rounded-2xl p-6 flex-1/2 col-span-1">
                    <h3 className="font-bold text-lg lg:text-xl xl:text-2xl mb-4">Meu desempenho</h3>
                    <div className="flex justify-center mb-4">
                        <div className="relative w-24 h-24 lg:w-28 lg:h-28 xl:w-40 xl:h-40 border-8 rounded-full border-[#FE6211]">
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-2xl lg:text-3xl xl:text-5xl font-bold">70%</div>
                        </div>
                    </div>
                    <button className="bg-orange-700 hover:bg-orange-600 transition rounded-xl mt-5 font-semibold py-2 w-full text-sm lg:text-lg">Ver dashboard</button>
                </div>

                {/* Reuniões */}
                <div className="bg-[#16032C] mt-6 rounded-2xl flex-1/2 p-6 col-span-1">
                    <h3 className="font-bold text-lg lg:text-xl xl:text-2xl mb-4">Reuniões</h3>
                    <div className="space-y-3">
                        <div className="border-2 border-pink-900 rounded-xl p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-base lg:text-lg">Daily Standup</p>
                                <p className="text-xs lg:text-sm text-pink-300">Hoje às 09:00</p>
                            </div>
                        </div>
                        <div className="border-2 border-pink-900 rounded-xl p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-base lg:text-lg">Sprint Review</p>
                                <p className="text-xs lg:text-sm text-pink-300">Amanhã às 14:00</p>
                            </div>
                        </div>
                    </div>
                    <button className="mt-4 bg-pink-800 hover:bg-pink-700 transition font-semibold rounded-xl py-2 w-full text-sm lg:text-lg">Ver reuniões</button>
                </div>
            </div>

            <EditProfileModal
                editProfile={editProfile}
                setEditProfile={setEditProfile}
            />
        </section>
    )
}

export default UserProfile;
