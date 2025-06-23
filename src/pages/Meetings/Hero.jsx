
import ToggleViewButton from "./ToggleViewButton"

const Hero = () => {
    return (
        <section className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6">
            <div className="text-center md:text-left">
                <h1 className="font-semibold text-4xl leading-11 text-white md:text-5xl">
                    <span className="text-[#F4C712]">Chamadas</span> e <span className="text-[#0CC0DF]">reuniões</span>
                </h1>
                <p className="text-white mt-4 text-lg lg:text-xl">Reúna-se com a matilha para alinhamentos e conexões!</p>
            </div>

            <div className="mt-10 flex justify-center md:justify-end">
                <ToggleViewButton />
            </div>
        </section>
    )
}

export default Hero