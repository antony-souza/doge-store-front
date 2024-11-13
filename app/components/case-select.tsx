import React from 'react';

interface IOptions {
    value: string;
    label: string;
}

interface ISelectProps {
    label: string;
    name: string;
    value?: string;
    options: IOptions[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
}

const SelectCase: React.FC<ISelectProps> = ({ label, name, value, options, onChange }) => {
    return (
        <div className="mb-4 w-60">
            <label htmlFor={name} className="block text-sm font-bold text-gray-700">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectCase;
