import React from 'react';
import { Button } from 'antd';

const CustomButton = ({ onClick, text }) => {
  return (
    <button
      className="
        shop-button
        text-xl 
        text-center
        text-colorTextWhite 
        bg-colorBlack950 
        border-colorGold50 border-[1px]
        w-[214px] h-[55px] 
        rounded-lg 
        hover:border-[2px] 
        hover:border-colorGold50 
        hover:bg-[#FEFFC1] 
        hover:text-[#560015]
        transition-all duration-300 ease-in-out
      "
      onClick={onClick}
      type="text"
    // ghost="" 
    >
      {text}
    </button>
  );
};

export default CustomButton;
