import React from 'react';

interface ErrorMessagerProps {
    titles: string[];
}

const ErrorMessager: React.FC<ErrorMessagerProps> = ({ titles }) => {
    return (
        <div className='w-full text-left pt-5 z-20 max-h-40 overflow-y-auto	'>
            {titles.map((title, index) => (
                <h1 key={index} className='text-xl text-center text-red-500'>
                    {title}
                </h1>
            ))}
        </div>
    );
};

export default ErrorMessager;
