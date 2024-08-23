import React from 'react';

interface InputCheckboxProps {
    id: string;
    value: number;
    onChange: (value: number) => void;
    width: number;
    requid: boolean;
    errorMess: string[];
    disabled: boolean;
}

const InputCheckboxCommon: React.FC<InputCheckboxProps> = ({ value, onChange, id, width, requid, errorMess, disabled }) => {
    return (
        <div className="block justify-start items-center">
            <label style={{ width: width, height: width }} className="flex items-center">
                <input
                    type="checkbox"
                    id={id}
                    checked={value === 1}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.checked ? 1 : 0)}
                    className="hidden"
                />
                <span style={{ width: width, height: width }}
                    className={`flex justify-center items-center border-2 ${value === 1 ? "bg-white text-black" : "bg-transparent"} ${disabled ? "border-gray-400 text-gray-400 cursor-not-allowed" : "border-gray-600 text-gray-600 cursor-pointer"} w-${width} h-${width} rounded-sm`}
                >
                    {value === 1 && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                        </svg>
                    )}
                </span>
            </label>
            {
                errorMess?.length > 0 && (
                    <div className="pt-0.5">
                        {errorMess.map((message, index) => (
                            <p key={index} className="text-left text-sm text-red-500">{message}</p>
                        ))}
                    </div>
                )
            }
        </div >
    );
};

export default InputCheckboxCommon;
