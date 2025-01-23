import React, { useEffect, useState } from 'react'
import HeroSection from '../../components/Sections/HeroSection/HeroSection'
import CategorySection from '../../components/Sections/CategorySection/CategorySection'
import BestSaleSection from '../../components/Sections/BestSaleSection/BestSaleSection'
import CardSection from '../../components/Sections/CardSection/CardSection'
import AccessoriesSection from '../../components/Sections/AccessoriesSection/AccessoriesSection'
import MembershipSection from '../../components/Sections/MembershipSection/MembershipSection'
import ShopNowSection from '../../components/Sections/ShopNowSection/ShopNowSection'
import GiftSection from '../../components/Sections/GiftSection/GiftSection'
import { useGetImageQuery } from '../../features/api/imageSlice'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { data: imageData, error, isLoading } = useGetImageQuery()

  const navigate = useNavigate()

  // Helper function to get image by section
  const getImageBySection = (section) => {
    const image = imageData?.find((img) => img.section === section)
    return image ? image.imageUrl : '' // Return the URL if found, otherwise an empty string
  }

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])

  return (
    <>
      <HeroSection
        heroImage={getImageBySection('hero')}
        backgroundImage={getImageBySection('heroBg')}
      />
      <CategorySection categoryImage={getImageBySection('categoryBg')} />
      <BestSaleSection />
      <CardSection
        card1Image={getImageBySection('card1')}
        card2Image={getImageBySection('card2')}
        card3Image={getImageBySection('card3')}
        card4Image={getImageBySection('card4')}
      />

      {/* First Promotional Section */}
      <section className="w-full bg-colorBlack950">
        <div className=" mx-auto">
          <img
            src={getImageBySection('promo1')} // Dynamically load banner image
            alt="Promotional Image"
            className="w-full h-auto object-cover shadow-lg"
          />
        </div>
      </section>

      <AccessoriesSection />
      <MembershipSection backgroundImage={getImageBySection('memberBg')} />
      <ShopNowSection
        shopImage={getImageBySection('shopWine')}
        spiritImage={getImageBySection('shopSpirits')}
      />
      <GiftSection />

      {/* Second Promotional Section with Two Images */}
      <section className="w-full h-[460px] bg-colorBlack950">
        <div className="container flex flex-col md:flex-row mx-auto w-full">
          <img
            src={getImageBySection('promo2')} // Dynamically load promotion image
            alt="Promotional Image"
            className="w-full md:w-1/2 h-[460px] object-cover shadow-lg"
          />
          <img
            src={getImageBySection('promo3')} // Dynamically load another promotion image
            alt="Promotional Image"
            className="w-full md:w-1/2 h-[460px] object-cover shadow-lg"
          />
        </div>
      </section>
    </>
  )
}

export default Home
