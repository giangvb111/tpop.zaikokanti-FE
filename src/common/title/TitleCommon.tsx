import React from 'react';

interface TitleProps {
    title: string;
}

const TitleCommon: React.FC<TitleProps> = ({ title }) => {
    return (
        <div className='w-full text-left pt-5 z-20 pl-10'>
            <h1 className='text-4xl text-[#595959] font-bold'>{title}</h1>
        </div>
    );
};

export default TitleCommon;
