import React, { useContext } from 'react'
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons'
import { Typography } from 'antd'
import { ThemeContext } from '../../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import { useGetImageQuery } from '../../features/api/imageSlice'

const { Text } = Typography

const Footer = () => {
  const { theme } = useContext(ThemeContext)

  const navigate = useNavigate()

  const { data: imageData, error, isLoading } = useGetImageQuery()

  const getImageBySection = (section) => {
    const image = imageData?.find((img) => img.section === section)
    return image ? image.imageUrl : '' // Return the URL if found, otherwise an empty string
  }

  const handleBecomeMemberButtonClick = (type) => {
    navigate(`my-account#${type}`, { state: { type: type } })
  }

  return (
    <footer
      className="py-8 sm:py-12 px-4 sm:px-5"
      style={{ background: theme.footerBackground }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Logo Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-8 text-center">
          <img
            src={getImageBySection('logo')}
            alt="Central Wine Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-0 sm:mr-4"
          />
          <h1
            className="font-Merriweather m-0 italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ color: theme.footerTextColor }}
          >
            Central Wine
          </h1>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 mt-8 px-4 sm:px-8 lg:px-12">
          {/* Contact Us */}
          <div className="text-center sm:text-left">
            <h4
              className="mb-4 text-lg font-semibold"
              style={{ color: theme.footerTextColor }}
            >
              Contact Us
            </h4>
            <hr className="mb-4 opacity-20" />
            <div className="space-y-3">
              <div className="flex items-center justify-center sm:justify-start">
                <EnvironmentOutlined
                  className="mr-2 flex-shrink-0"
                  style={{ color: theme.footerTextColor }}
                />
                <p className="text-sm text-white opacity-50 italic">
                  35 W 46nd Street Portugal
                </p>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <MailOutlined
                  className="mr-2 flex-shrink-0"
                  style={{ color: theme.footerTextColor }}
                />
                <p className="text-sm text-white opacity-50 italic">
                  vinrouge@dotcreativemarket.com
                </p>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <PhoneOutlined
                  className="mr-2 flex-shrink-0"
                  style={{ color: theme.footerTextColor }}
                />
                <p className="text-sm text-white opacity-50 italic">
                  +(123) 456-7890-456-7890
                </p>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="text-center sm:text-left">
            <h4
              className="mb-4 text-lg font-semibold"
              style={{ color: theme.footerTextColor }}
            >
              Quick Navigation
            </h4>
            <hr className="mb-4 opacity-20" />
            <div className="space-y-2">
              {[
                'Home',
                'Best Sale',
                'Accessories',
                'Become A Member',
                'Great For Gift'
              ].map((item, index) => (
                <div key={index}>
                  <Link
                    to={`/#${item.replaceAll(' ', '')}`}
                    className="text-sm no-underline hover:text-white transition-colors duration-300 text-white opacity-50 italic"
                  >
                    {item}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Account */}
          <div className="text-center sm:text-left">
            <h4
              className="mb-4 text-lg font-semibold"
              style={{ color: theme.footerTextColor }}
            >
              Account
            </h4>
            <hr className="mb-4 opacity-20" />
            <div className="space-y-2">
              {[
                'My Account',
                'Order History',
                'Membership',
                'Address',
                'Payment'
              ].map((item, index) => (
                <div key={index}>
                  <a
                    onClick={() =>
                      handleBecomeMemberButtonClick(item.replaceAll(' ', ''))
                    }
                    className="text-sm no-underline hover:text-white transition-colors duration-300 text-white opacity-50 italic"
                  >
                    {item}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Services */}
          <div className="text-center sm:text-left">
            <h4
              className="mb-4 text-lg font-semibold"
              style={{ color: theme.footerTextColor }}
            >
              Customer Services
            </h4>
            <hr className="mb-4 opacity-20" />
            <div className="space-y-2">
              {[
                'Contact & FAQ',
                'Returns & Refunds',
                'Shipping & Delivery',
                'Interest Free Finance',
                'Cipmoney'
              ].map((item, index) => (
                <div key={index}>
                  <a
                    href="#"
                    className="text-sm no-underline hover:text-white transition-colors duration-300 text-white opacity-50 italic"
                  >
                    {item}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center pt-4 border-t border-white/10">
          <Text className="text-xs sm:text-sm italic text-white opacity-50">
            © 2024 Central Wines | Engineered by{' '}
            <span className="italic">Cenzios IT Solutions Pvt Ltd</span>
          </Text>
        </div>
      </div>
    </footer>
  )
}

export default Footer
