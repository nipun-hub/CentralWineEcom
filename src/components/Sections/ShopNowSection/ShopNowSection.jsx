import React from 'react';
import CustomButton2 from '../../CustomButton2/CustomButton2';
import { useNavigate } from 'react-router-dom';

const ShopNowSection = ({ shopImage, spiritImage }) => {
  const navigate = useNavigate();

  const handleShopWineClick = () => {
    navigate(`shop#RedWine`, { state: { navigateCategory: 'Red Wine' } })
  };

  const handleShopSpiritClick = () => {
    navigate(`shop#Spirits}`, { state: { navigateCategory: 'Spirits' } })
  };

  return (
    <section className="w-full bg-colorBlack950">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left Image with Text */}
        <div className="relative group">
          <img
            src={shopImage}
            alt="Shop Wine"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white flex flex-col gap-5 ms-5">
            <h3 className="text-4xl font-bold mb-2 cursor-pointer">Shop Wine</h3>
            <CustomButton2 onClick={handleShopWineClick} text="Shop Now" />
          </div>
        </div>

        {/* Right Image with Text */}
        <div className="relative group">
          <img
            src={spiritImage}
            alt="Shop Spirit"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 text-white flex flex-col gap-5 me-5">
            <h3 className="text-4xl font-bold mb-2 cursor-pointer">Shop Spirit</h3>
            <CustomButton2 onClick={handleShopSpiritClick} text="Shop Now" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopNowSection;
