

const Input = ({ text, type, icon }) => {
    return (
        <div
            className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center mb-8"
        >
            <input
                name={type}
                required=""
                aria-invalid="false"
                placeholder=""
                spellCheck="false"
                autoComplete="off"
                id={type}
                type={type}
                className="peer dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full text-inherit block text-left border border-zinc-500 border-solid dark:bg-[#140e1b] rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-[#9160cb] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[##9060cb45 dark:focus-visible:ring-[#9060cb18]"
            />
            <label
                className="cursor-text text-[--clr] inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[32px] peer-focus-visible:text-[#d3afff] peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                htmlFor={type}
            >
                {text}
            </label>
            <span
                className="pointer-events-none absolute z-[+1] left-0 top-0 bottom-0 flex items-center justify-center size-[40px] text-[--clr] peer-focus-visible:hidden peer-[:not(:placeholder-shown)]:hidden"
            >
                {icon}
            </span>
        </div>
    )
}

export default Input