

const Mission = () => {
    return (
        <section>
            <div className="flex flex-col gap-14 bg-[#22172d] mx-8 rounded-3xl px-8 max-w-[1121px] py-10 pb-16 mt-20 lg:mx-auto lg:mt-0 lg:pt-14 lg:px-10 lg:gap-28">
                <div className="bg-[#2D1D3D] rounded-lg shadow-xl shadow-[#e75c5c2d] p-5 max-w-[610px] mx-auto">
                    <h3 className="text-3xl font-bold text-[#E62020]">Missão</h3>
                    <p className="text-white mt-3 md:text-lg lg:text-xl">Transformar o modo como cuidamos de equipes com a cultura alcatteia a fim de tornar a gestão mais assertiva e eficaz para gerar produtividade e bem-estar.</p>
                </div>

                <div className="flex flex-col gap-14 lg:flex lg:flex-row lg:items-center lg:gap-16">
                    <div className="bg-[#2D1D3D] rounded-lg shadow-xl shadow-[#00e5ff23] p-5 max-w-[610px] mx-auto lg:max-w-[500px]">
                        <h3 className="text-3xl font-bold text-[#00E5FF]">Visão</h3>
                        <p className="text-white mt-3 md:text-lg lg:text-xl">Ser referência em lideranças humanas que guiam equipes unidas, engajadas, conscientes, produtivas e bem sucedidas no mercado Brasileiro.</p>
                    </div>

                    <div className="bg-[#2D1D3D] rounded-lg shadow-xl shadow-[#fe883e2d] p-5 max-w-[610px] mx-auto lg:relative lg:bottom-14">
                        <h3 className="text-3xl font-bold text-[#FE883E]">Valores</h3>
                        <p className="text-white mt-3 md:text-lg lg:text-xl">liderança assertiva, trabalho em equipe, comunicação, respeito, união e empatia</p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Mission