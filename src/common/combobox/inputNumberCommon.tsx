import React from 'react';

interface inputNumber {
    id: string;
    value: string;
    onChange: (value: string) => void;
    width: number;
    requid: boolean;
    errorMess: string[];
    disabled: boolean
}

const InputNumberCommon: React.FC<inputNumber> = ({ value, onChange, id, width, requid, errorMess, disabled }) => {
    return (
        <div className={`block justify-start items-center`}>
            <input
                value={value}
                style={{
                    width: width
                }}
                onChange={(e) => onChange(e.target.value)}
                type="number"
                id={id}
                disabled={disabled}
                className={`${disabled ? "border-[#A6A6A6] text-[#A6A6A6] cursor-not-allowed" : "border-[#595959] text-[#595959]"} border h-8 px-2 rounded-lg ${requid && !disabled && !value ? "bg-[#F8BABB]" : ""}`}
            />
            {
                errorMess?.length > 0 && (
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


export default InputNumberCommon;
