import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

interface InputDateProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
    width: number;
    requid: boolean;
    errorMess: string[];
    disabled: boolean
}

const InputDateCommon: React.FC<InputDateProps> = ({ value, onChange, id, width, requid, errorMess, disabled }) => {
    const handleDateChange = (date: Date | null) => {
        if (date) {
            onChange(format(date, 'yyyy-MM-dd'));
        } else {
            onChange('');
        }
    };

    return (
        <div className={`block justify-center items-center pt-3`}>
            <DatePicker
                id={id}
                selected={value ? new Date(value) : null}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                disabled={disabled}
                className={`${disabled ? "border-[#A6A6A6] text-[#A6A6A6] cursor-not-allowed" : "border-[#595959] text-[#595959]"} border h-8 w-[${width}px] min-w-[${width}px] px-2 rounded-lg ${errorMess?.length > 0 ? "bg-[#F8BABB]" : ""}`}
            />
            {errorMess?.length > 0 && (
                <div className='pt-0.5'>
                    {errorMess.map((message, index) => (
                        <p key={index} className='text-left text-sm text-red-500'>{message}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InputDateCommon;
