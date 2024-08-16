import React from 'react';

interface BtnProps {
  title: string;
  action: () => void;
  style: string;
  width: number;
  height: number;
  fontSize: number;
  border: number;
}

const BtnClassicCommon: React.FC<BtnProps> = ({ title, action, style, width, height, fontSize, border }) => {
  return (
    <div className={`flex justify-${style} items-center pt-3`}>
      <button
        onClick={action}
        style={{
          width: width,
          height: height,
          fontSize: fontSize,
          borderRadius: border
        }}
        className={`bg-white border-[2px] font-bold border-[#595959] text-[#595959] transition-colors duration-150 hover:bg-[#548EA6]/75 rounded-full truncate focus:shadow-outline m-[auto] mr-4 ml-4`}
      >
        {title}
      </button>
    </div >
  );
};

export default BtnClassicCommon;
