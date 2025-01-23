import React from 'react';
import CustomButton from '../../CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ backgroundImage, heroImage }) => {
  const navigate = useNavigate();
  const handleShopButtonClick = () => {
    navigate("shop")
  };

  return (
    <section
      className="relative w-full min-h-screen bg-black bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto flex flex-col-reverse lg:flex-row items-center justify-around h-full p-4 sm:p-6 md:p-8 lg:p-16">

        {/* Left side - Text Box */}
        <div className="w-full lg:w-1/2 text-white text-center lg:text-left space-y-2 md:space-y-3 lg:space-y-4 mt-8 lg:mt-0">
          <p className="text-sm md:text-base lg:text-lg">
            At CENTRAL WINE,
          </p>

          <div className="space-y-2 md:space-y-3">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
              Where Every Bottle
            </h1>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
              Tells a Story.
            </h1>
          </div>

          <p className="text-xs md:text-sm lg:text-base leading-relaxed max-w-prose mx-auto lg:mx-0">
            Explore our curated selection of world-class wines, handpicked for
            the connoisseur in you. Whether you're seeking a classic vintage or
            a bold new discovery, CENTRAL WINE offers an unparalleled
            experience, bringing the essence of global vineyards to the heart of
            New York.
          </p>

          <div className="pt-4">
            <CustomButton onClick={handleShopButtonClick} text="Shop Now" />
          </div>
        </div>

        {/* Right side - Image */}
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-5/12">
          <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
            {heroImage ?
              <img
                loading='lazy'
                src={heroImage}
                alt="Hero Wine Image"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg object-cover"
              />
              :
              <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-white opacity-60 font-black text-sm text-center'>
                <p>Loading...</p>
              </div>
            }

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;