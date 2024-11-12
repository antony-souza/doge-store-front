import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface IInputProps {
    type?: string;
    placeholder?: string;
    label?: string;
    value?: string | number;
    name?: string;
    minLength?: number;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputsCase: React.FC<IInputProps> = ({ type, name, value, label, placeholder, minLength, required, onChange }) => {
    return (
        <>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    {label}
                </label>
                <Input
                    className="w-60"
                    type={type}
                    name={name}
                    value={value}
                    minLength={minLength}
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                    
                />
            </div>
        </>
    );
}

export default InputsCase;