import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
    const { type = "text", placeholder = "", classname = "bg-white", name = ""} = props;
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`w-full px-2 py-3 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${classname}`}
            name={name}
            id={name}
            ref={ref}
        />
    );
})

export default Input;