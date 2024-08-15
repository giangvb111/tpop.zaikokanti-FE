import React from 'react';

interface BtnProps {
  title: string;
  action: () => void;
  style: string;
  width: number;
  height: number;
  fontSize: number;
}

const BtnEntryCommon: React.FC<BtnProps> = ({ title, action, style, width, height, fontSize }) => {
  return (
    <div className={`flex justify-${style} items-center pt-3`}>
      <button
        onClick={action}
        style={{
          width: width,
          height: height,
          fontSize: fontSize
        }}
        className={`px-5 bg-[#548EA6] border-[2px] border-[#595959] font-bold text-white transition-colors duration-150 rounded-md focus:shadow-outline hover:bg-cyan-700 truncate`}
        >
        {title}
      </button>
    </div >
  );
};

export default BtnEntryCommon;
