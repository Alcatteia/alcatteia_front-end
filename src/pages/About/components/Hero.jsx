import Lupin from "../../../assets/about/wolfs/lupin_about.svg";

const Hero = () => {
    return (
        <section className="mt-20 bg-gradient-to-br from-gray-900 via-[#2f0846] to-black">
            <div className="max-w-[1221px] mx-auto flex flex-col items-center gap-10 text-center  px-8 lg:flex-row lg:text-left">
                <div>
                    <img src={Lupin} alt="Mascote Lupin" />
                </div>
                <div className="max-w-lg md:max-w-xl ">
                    <h1 className="font-semibold text-3xl leading-11 text-white md:text-4xl md:leading-12 lg:text-5xl lg:leading-14">
                        <span className="text-[#FFFF59]">Mais</span> que uma <span className="text-[#FF59FC]">plataforma</span>, um movimento pela gestão <span className="text-[#5980FF]">humana</span>
                    </h1>
                </div>
            </div>
        </section>
    )
}

export default Hero