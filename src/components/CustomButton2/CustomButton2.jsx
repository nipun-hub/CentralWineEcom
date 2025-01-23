import React from 'react';
import { Button } from 'antd';

const CustomButton2 = ({ onClick, text }) => {
  return (
    <button
      className="
        shop-button
        text-xl 
        text-center
        text-colorTextBlack950 
        bg-colorWhite950 
        border-colorGold50 border-[1px]
        w-[214px] h-[55px] 
        rounded-full
        hover:border-[2px] 
        hover:border-colorGold50 
        hover:bg-yellow-100
        hover:scale-105
        hover:text-colorTextGold950
        transition-all duration-300 ease-in-out
      "
      onClick={onClick}
      type="text"
    // ghost={false} 
    >
      {text}
    </button>
  );
};

export default CustomButton2;