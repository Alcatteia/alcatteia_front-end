import { FaRegClock } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";


const InProgress = () => {
    return (
        <section className="mt-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6">
            <div className="bg-[#7c50aa9a] p-5 flex items-center gap-5 rounded-xl w-full">
                <div className="h-9 w-9 rounded-full bg-yellow-400"></div>
                <span className="text-white text-xl font-semibold md:text-2xl">Reuniões em andamento:</span>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-10 lg:gap-16">
                <div className="bg-[#331A4E] text-white p-5 rounded-xl">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-xl font-semibold sm:text-2xl lg:text-3xl">Alinhamento</h3>
                            <p className="opacity-80 md:text-lg">Administrador(a): Isabelle Gomes</p>
                        </div>

                        <div className="flex items-center h-max px-2 py-1 rounded-full italic gap-2 bg-yellow-950">
                            <div className="h-4 w-4 rounded-full bg-yellow-600"></div>
                            Ao vivo
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <FaRegClock />
                                <span className="opacity-80 md:text-lg">Qui, 05/05/2025, 07h30</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <IoPeopleSharp />
                                <span className="opacity-80 md:text-lg">5 integrantes</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-7">
                        <button className="py-2 w-full font-semibold bg-[#F4C712] rounded-full text-2xl text-black">Juntar-se a reunião</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InProgress