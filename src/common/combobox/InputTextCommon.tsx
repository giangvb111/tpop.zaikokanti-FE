import React from 'react';

interface inputText {
    id: string;
    value: string;
    onChange: (value: string) => void;
    width: number;
    requid: boolean;
    errorMess: string[];
}

const InputTextCommon: React.FC<inputText> = ({ value, onChange, id, width, requid, errorMess }) => {
    return (
        <div className={`block justify-start items-center`}>
            <input
                value={value}
                style={{
                    width: width
                }}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                id={id}
                className={`border h-8 border-[#595959] text-[#595959] px-2 rounded-lg ${requid && !value ? "bg-[#F8BABB]" : ""}`}
            />
            {
                errorMess.length > 0 && (
                    <div>
                        {errorMess.map((message, index) => (
                            <p key={index} className='text-left text-red-500'>{message}</p>
                        ))}
                    </div>
                )
            }
        </div>
    );
};


export default InputTextCommon;
