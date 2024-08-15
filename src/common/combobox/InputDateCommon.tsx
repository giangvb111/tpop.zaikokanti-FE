import React from 'react';

interface inputDate {
    id: string;
    value: string;
    onChange: (value: string) => void;
    width: number;
    requid: boolean;
}

const InputDateCommon: React.FC<inputDate> = ({ value, onChange, id, width, requid }) => {
    return (
        <div className={`flex justify-center items-center pt-3`}>
            <input
                value={value}
                style={{
                    width: width
                }}
                onChange={(e) => onChange(e.target.value)}
                type="date"
                name=""
                id={id}
                className=
                {`border h-8 border-[#595959] text-[#595959] px-2 rounded-lg ${requid && (value === null || value === "") ? "bg-[#F8BABB]" : ""}`} />
        </div>
    );
};

export default InputDateCommon;
