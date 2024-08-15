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
}

const SelectCommon: React.FC<SelectProps> = ({ options, value, onChange, id, width, requid }) => {

    const isValidValue = options?.some(option => option.value === value && value !== "");

    useEffect(() => {
        if (!isValidValue) {
            onChange("");
        }
    }, [isValidValue, onChange]);

    return (
        <div className={`flex justify-left items-center`}>
            <select
                id={id}
                value={isValidValue ? value : ""}
                style={{
                    width: width
                }}
                onChange={(e) => onChange(e.target.value)}
                className={`border h-8 border-[#595959] px-2 rounded-lg focus:outline-none focus:border-[#595959] ${requid && (value === null || value === "") ? "bg-[#F8BABB]" : ""}`}
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
        </div>
    );
};

export default SelectCommon;
