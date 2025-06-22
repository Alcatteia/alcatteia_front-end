import { FaRegClock } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";

import { FaCalendarAlt } from "react-icons/fa";


const ScheduledMeetings = () => {
    return (
        <section className="mt-24 max-w-[1221px] mx-auto px-8">
            <div className="bg-[#43009a9d] p-5 flex items-center gap-5 rounded-xl w-full">
                <FaCalendarAlt className="text-3xl text-white" />
                <span className="text-white text-xl font-semibold md:text-2xl">Reuniões agendadas:</span>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-10 lg:gap-16">
                <div className="bg-[#331A4E] text-white p-5 rounded-xl">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-xl font-semibold sm:text-2xl lg:text-3xl">Retrospectiva</h3>
                            <p className="opacity-80 md:text-lg">Administrador(a): Isabelle Gomes</p>
                        </div>

                        <div className="flex items-center h-max px-2 py-1 rounded-full italic gap-2 bg-blue-950">
                            <div className="h-4 w-4 rounded-full bg-blue-300"></div>
                            Agendada
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <FaRegClock />
                                <span className="opacity-80 md:text-lg">Ter, 10/05/2025, 11h30</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <IoPeopleSharp />
                                <span className="opacity-80 md:text-lg">8 integrantes</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-7 items-center gap-3 font-semibold text-white bg-blue-700 py-2 px-3 rounded-full">
                        <FaCalendarAlt className="text-2xl" />
                        <span className="opacity-80 md:text-lg">Adicionar ao calendário</span>
                    </div>
                </div>

                <div className="bg-[#331A4E] text-white p-5 rounded-xl">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-xl font-semibold sm:text-2xl lg:text-3xl">Próximo projeto</h3>
                            <p className="opacity-80 md:text-lg">Administrador(a): Isabelle Gomes</p>
                        </div>

                        <div className="flex items-center h-max px-2 py-1 rounded-full italic gap-2 bg-blue-950">
                            <div className="h-4 w-4 rounded-full bg-blue-300"></div>
                            Agendada
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <FaRegClock />
                                <span className="opacity-80 md:text-lg">Qua, 18/05/2025, 15h00</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <IoPeopleSharp />
                                <span className="opacity-80 md:text-lg">8 integrantes</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-7 items-center gap-3 font-semibold text-white bg-blue-700 py-2 px-3 rounded-full">
                        <FaCalendarAlt className="text-2xl" />
                        <span className="opacity-80 md:text-lg">Adicionar ao calendário</span>
                    </div>
                </div>

                <div className="bg-[#331A4E] text-white p-5 rounded-xl">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-xl font-semibold sm:text-2xl lg:text-3xl">Definição de backlog</h3>
                            <p className="opacity-80 md:text-lg">Administrador(a): Isabelle Gomes</p>
                        </div>

                        <div className="flex items-center h-max px-2 py-1 rounded-full italic gap-2 bg-blue-950">
                            <div className="h-4 w-4 rounded-full bg-blue-300"></div>
                            Agendada
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <FaRegClock />
                                <span className="opacity-80 md:text-lg">Sex, 27/05/2025, 19h00</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <IoPeopleSharp />
                                <span className="opacity-80 md:text-lg">8 integrantes</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-7 items-center gap-3 font-semibold text-white bg-blue-700 py-2 px-3 rounded-full">
                        <FaCalendarAlt className="text-2xl" />
                        <span className="opacity-80 md:text-lg">Adicionar ao calendário</span>
                    </div>
                </div>

                <div className="bg-[#331A4E] text-white p-5 rounded-xl">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-xl font-semibold sm:text-2xl lg:text-3xl">Separação de tasks</h3>
                            <p className="opacity-80 md:text-lg">Administrador(a): Isabelle Gomes</p>
                        </div>

                        <div className="flex items-center h-max px-2 py-1 rounded-full italic gap-2 bg-blue-950">
                            <div className="h-4 w-4 rounded-full bg-blue-300"></div>
                            Agendada
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <FaRegClock />
                                <span className="opacity-80 md:text-lg">Seg, 30/05/2025, 13h00</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <IoPeopleSharp />
                                <span className="opacity-80 md:text-lg">8 integrantes</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-7 items-center gap-3 font-semibold text-white bg-blue-700 py-2 px-3 rounded-full">
                        <FaCalendarAlt className="text-2xl" />
                        <span className="opacity-80 md:text-lg">Adicionar ao calendário</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ScheduledMeetings