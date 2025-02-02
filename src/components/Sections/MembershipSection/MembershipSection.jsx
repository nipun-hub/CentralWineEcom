import React, { useState } from 'react'
import CustomButton from '../../CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AccessDenied from '../../CustomModel/AccessDenied'

const MembershipSection = ({ backgroundImage }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const navigate = useNavigate()
  const handleShopButtonClick = () => {
    navigate(`shop#Spirits}`, { state: { navigateCategory: 'Spirits' } })
  }

  const handleBecomeMemberButtonClick = () => {
    navigate('my-account', { state: { type: 'Membership' } })
  }

  return (
    <section
      className="w-full bg-colorBlack950 text-colorTextWhite py-16 relative"
      id="BecomeAMember"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Title */}
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-Merriweather mb-12">
          Become A Member Of Central
        </h1>

        {/* Membership Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 px-12">
          {/* Free Membership */}
          <div>
            <h4 className="text-2xl md:text-3xl font-Merriweather mb-4">
              FREE MEMBERSHIP
            </h4>
            <p className="text-colorTextGray text-sm md:text-base">
              FOR EVERY DOLLAR YOU SPEND, YOU GET A POINT, FOR
              <br />
              EVERY 200 POINTS, YOU WILL RECEIVE A $10 CREDIT.
            </p>
            <p className="text-colorTextGray text-sm md:text-base">
              CASE (12 BOTTLES) DISCOUNTS OFF
            </p>
          </div>

          {/* Paid Membership */}
          <div>
            <h4 className="text-2xl md:text-3xl font-Merriweather mb-4">
              PAID MEMBERSHIP
            </h4>
            <p className="text-colorTextGray text-sm md:text-base">
              FOR EVERY DOLLAR YOU SPEND, YOU GET A POINT, FOR
              <br />
              EVERY 200 POINTS, YOU WILL RECEIVE A $10 CREDIT.
            </p>
            <p className="text-colorTextGray text-sm md:text-base">
              STORE WIDE ALL OFF (EXCLUDING ON SALE,
              <br />
              CANNOT COMBINE OFFER/PROMO)
            </p>
            <p className="text-colorTextGray text-sm md:text-base">
              20% OFF 12 BOTTLES
            </p>
            <p className="text-colorTextGray text-sm md:text-base">
              PAID MEMBER SPECIAL PRICES
              <br />
              6MONTHS - $50 / 12MONTHS - $80
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <CustomButton onClick={handleShopButtonClick} text={'Shop Now'} />
          <CustomButton
            onClick={handleBecomeMemberButtonClick}
            text={'Become Member'}
          />
        </div>
      </div>

    </section>
  )
}

export default MembershipSection
