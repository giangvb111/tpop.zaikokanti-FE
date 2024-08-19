import React, { useEffect } from 'react';

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
    disabled: boolean
}

const SelectCommon: React.FC<SelectProps> = ({ options, value, onChange, id, width, requid, errorMess, disabled }) => {

    const isValidValue = options?.some(option => option.value === value && value !== "");
    return (
        <div className={`block justify-left items-center`}>
            <select
                id={id}
                value={isValidValue ? value : ""}
                style={{
                    width: width
                }}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                className={`${disabled ? "border-[#A6A6A6] text-[#A6A6A6] cursor-not-allowed" : "border-[#595959] text-[#595959]"} border h-8 px-2 rounded-lg focus:outline-none focus:border-[#595959] ${requid && !disabled && (value === null || value === "") ? "bg-[#F8BABB]" : ""}`}
            >
                <option value=""></option>
                {
                    options != null && options.length > 0
                        ? options.map(option => (
                            <option className='hover:bg-[#548EA6]' key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))
                        : <option disabled>-- Not data --</option>
                }
            </select>
            {
                errorMess.length > 0 && (
                    <div className='pt-0.5'>
                        {errorMess.map((message, index) => (
                            <p key={index} className='text-left text-sm text-red-500'>{message}</p>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default SelectCommon;
