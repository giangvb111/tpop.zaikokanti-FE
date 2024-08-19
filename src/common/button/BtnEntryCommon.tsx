import React from 'react';

interface BtnProps {
  title: string;
  action: () => void;
  style: string;
  width: number;
  height: number;
  fontSize: number;
  disabled: boolean
  background: string;
}

const BtnEntryCommon: React.FC<BtnProps> = ({ title, action, style, width, height, fontSize, background, disabled }) => {
  return (
    <div className={`flex justify-${style} items-center pt-3`}>
      <button
        onClick={action}
        style={{
          width: width,
          height: height,
          fontSize: fontSize,
        }}
        disabled={disabled}
        className={`px-5 border-[2px] ${disabled ? "border-[#A6A6A6] text-[#A6A6A6] cursor-not-allowed" : `bg-[${background}] border-[#595959] text-white`} font-bold transition-colors duration-150 rounded-md focus:shadow-outline hover:bg-cyan-700 truncate`}
      >
        {title}
      </button>
    </div >
  );
};

export default BtnEntryCommon;
