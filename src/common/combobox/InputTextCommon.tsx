import React from 'react';

interface inputText {
    id: string;
    value: string;
    onChange: (value: string) => void;
    width: number;
    requid: boolean;
    errorMess: string[];
    disabled: boolean
}

const InputTextCommon: React.FC<inputText> = ({ value, onChange, id, width, requid, errorMess, disabled }) => {
    return (
        <div className={`block justify-start items-center`}>
            <input
                value={value}
                style={{
                    width: width
                }}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                id={id}
                className={`${disabled ? "border-[#A6A6A6] text-[#A6A6A6] cursor-not-allowed" : "border-[#595959] text-[#595959]"} border h-8 px-2 rounded-lg ${errorMess?.length > 0 ? "bg-[#F8BABB]" : ""}`}
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


export default InputTextCommon;
