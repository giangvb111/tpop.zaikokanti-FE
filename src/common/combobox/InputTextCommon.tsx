import React from 'react';

interface inputText {
    id: string;
    value: string;
    onChange: (value: string) => void;
    width: number;
    requid: boolean;
}

const InputTextCommon: React.FC<inputText> = ({ value, onChange, id, width, requid }) => {
    return (
        <div className={`flex justify-start items-center`}>
            <input
                value={value}
                style={{
                    width: width
                }}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                name=""
                id={id}
                className=
                {`border h-8 border-[#595959] text-[#595959] px-2 rounded-lg ${requid && (value === null || value === "") ? "bg-[#F8BABB]" : ""}`} />
        </div>
    );
};

export default InputTextCommon;
