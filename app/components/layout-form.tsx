import React from "react";

interface ILayoutFormProps {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LayoutForm: React.FC<ILayoutFormProps> = ({ children, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="bg-white w-auto shadow rounded px-8 pt-6 pb-8 mb-4">
            {children}
        </form>
    );
}

export default LayoutForm;