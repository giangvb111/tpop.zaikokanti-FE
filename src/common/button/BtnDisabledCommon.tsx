import React from 'react';

interface BtnProps {
  title: string;
  style: string;
  width: number;
  height: number;
  fontSize: number;
}

const BtnDisabledCommon: React.FC<BtnProps> = ({ title, style, width, height, fontSize }) => {
  return (
    <div className={`flex justify-${style} items-center pt-3`}>
      <button
        disabled
        style={{
          width: width,
          height: height,
          fontSize: fontSize
        }}
        className={`bg-white border-[2px] font-bold border-[#A6A6A6] text-[#A6A6A6] transition-colors duration-150 rounded-3xl m-[auto] mr-4 ml-4 truncate cursor-not-allowed`}
      >
        {title}
      </button>
    </div >
  );
};

export default BtnDisabledCommon;
