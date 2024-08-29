import React, { useState, useEffect, useRef } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOption[] | null;
    value: string;
    onChange: (value: string) => void;
    id?: string;
    width: number;
    requid: boolean;
    errorMess: string[];
    disabled: boolean;
}

const SelectCommon: React.FC<SelectProps> = ({ options, value, onChange, id, width, requid, errorMess, disabled }) => {    
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (value: string) => {
        onChange(value);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const selectedLabel = options?.find(option => option.value == value)?.label || '';    

    return (
        <div className="relative block" ref={selectRef}>
            <div
                id={id}
                style={{ width, maxWidth: width }}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`${disabled ? "border-[#A6A6A6] text-[#A6A6A6] cursor-not-allowed" : "border-[#595959] text-[#595959] cursor-pointer"} bg-white border h-8 px-2 rounded-lg focus:outline-none ${errorMess?.length > 0 ? "bg-[#F8BABB]" : ""} flex items-center justify-between`}
            >
                <span className='truncate'>{selectedLabel}</span>
                <span className="ml-2">&#9660;</span>
            </div>
            {isOpen && options && options.length > 0 && (
                <div
                    className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto"
                >
                    {options.map(option => (
                        <div
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                            className={`px-4 py-2 hover:bg-[#548EA6] hover:text-white truncate ${option.value === value ? "bg-gray-200" : ""}`}
                            style={{ maxWidth: width - 20 }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
            {errorMess?.length > 0 && (
                <div className="pt-0.5">
                    {errorMess.map((message, index) => (
                        <p key={index} className="text-left text-sm text-red-500">{message}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectCommon;
