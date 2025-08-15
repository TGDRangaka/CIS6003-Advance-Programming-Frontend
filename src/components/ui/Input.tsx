import React from "react";

type InputProps = {
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
};

const Input: React.FC<InputProps> = ({ label, value, onChange, type = "text", required }) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{label}</label>
            <input
                type={type}
                required={required}
                value={value}
                onChange={onChange}
                className="border rounded px-3 py-2 outline-none focus:ring w-full"
            />
        </div>
    );
};

export default Input;
