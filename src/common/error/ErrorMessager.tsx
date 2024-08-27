import React from 'react';

interface ErrorMessagerProps {
    titles: string[];
}

const ErrorMessager: React.FC<ErrorMessagerProps> = ({ titles }) => {
    return (
        <div className='w-full text-left pt-5 z-20 max-h-16 overflow-y-auto	mt-3'>
            {titles.map((title, index) => (
                <h1 key={index} className='text-base text-left text-red-500'>
                    {title}
                </h1>
            ))}
        </div>
    );
};

export default ErrorMessager;
