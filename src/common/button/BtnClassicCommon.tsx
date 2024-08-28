import React from 'react';

interface BtnProps {
  title: string;
  action: () => void;
  style: string;
  width: number;
  height: number;
  fontSize: number;
  border: number;
  disabled: boolean
}

const BtnClassicCommon: React.FC<BtnProps> = ({ title, action, style, width, height, fontSize, border, disabled }) => {
  return (
    <div className={`flex justify-center items-center pt-3`}>
      <button
        onClick={action}
        style={{
          width: width,
          height: height,
          fontSize: fontSize,
          borderRadius: border
        }}
        disabled={disabled}
        className={` ${disabled ? "border-[#A6A6A6] text-[#A6A6A6] cursor-not-allowed" : "border-[#595959] bg-white text-[#595959]"} border-[2px] font-bold transition-colors duration-150 hover:bg-[#548EA6]/75 rounded-full truncate focus:shadow-outline m-[auto] mx-4`}
      >
        {title}
      </button>
    </div >
  );
};

export default BtnClassicCommon;
