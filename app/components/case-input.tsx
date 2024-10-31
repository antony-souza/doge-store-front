import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface IInputProps {
    type?: string;
    placeholder?: string;
    label?: string;
    value?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputsCase: React.FC<IInputProps> = ({ type, name, value, label, placeholder, onChange }) => {
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
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </div>
        </>
    );
}

export default InputsCase;