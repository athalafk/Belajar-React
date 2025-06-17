import Label from "./Label";
import Input from "./Input";
import { forwardRef } from "react";

const InputForm = forwardRef((props, ref) => {
    const { label, name, type, placeholder, classname } = props;
    return (
        <div className="mb-4">
            <Label 
            htmlFor={name}
            >
            {label}
            </Label>
            <Input
                type={type}
                placeholder={placeholder}
                classname={classname}
                name={name}
                ref={ref}
            />
        </div> 
    )
})

export default InputForm;