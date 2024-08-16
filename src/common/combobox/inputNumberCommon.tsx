import React from 'react';

interface inputNumber {
    id: string;
    value: string;
    onChange: (value: string) => void;
    width: number;
    requid: boolean;
    errorMess: string[];
}

const InputNumberCommon: React.FC<inputNumber> = ({ value, onChange, id, width, requid, errorMess }) => {
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
                className={`border h-8 border-[#595959] text-[#595959] px-2 rounded-lg ${requid && !value ? "bg-[#F8BABB]" : ""}`}
            />
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


export default InputNumberCommon;
