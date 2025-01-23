import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { ThemeContext } from '../../context/ThemeContext'
import { Input, Button, Radio, Divider, Card } from 'antd'
import {
  CreditCardOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  ExportOutlined,
  HistoryOutlined,
  IdcardOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons'
import Cart from '../Cart/Cart'
import AccessoriesCard from '../../components/Cards/AccessoriesCard'
import CustomModelOne from '../../components/CustomModel/CustomModel'
import CustomModelViewProduct from '../../components/CustomModel/CustomModelViewProduct'
import MyAccount from './MyAccount'
import OrderHistory from './OrderHistory'
import Membership from './Membership'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import AddressBlock from './AddressBlock'
import PaymentMethod from './PaymentMethord'

const Account = () => {
  const { theme } = useContext(ThemeContext)
  const user = useSelector((state) => state.auth)
  const navigate = useNavigate()

  // get navigate data
  const location = useLocation()
  const { type: navigationType } = location.state || {}

  if (!user?.isAuthenticated) {
    navigate('/')
  }

  const [currentSlide, setCurrentSlide] = useState('MyAccount')

  useEffect(() => {
    if (navigationType && currentSlide != navigationType) {
      setCurrentSlide(navigationType)
    } else {
      if (location.hash) {
        setCurrentSlide(location.hash.substring(1))
      }
    }
  }, [navigate, location])

  return (
    <div style={{ backgroundColor: theme.background }}>
      <div className=" lg:container mx-auto p-6 ">
        <div className="flex ">
          <div className="md:w-1/4 h-screen flex flex-col justify-center gap-10">
            <div
              className={`flex items-center space-x-2 text-sm lg:text-lg font-semibold ${currentSlide == 'MyAccount' ? 'opacity-100' : 'opacity-60 hover:opacity-70'}`}
              style={{ color: theme.textColor }}
              onClick={() => setCurrentSlide('MyAccount')}
            >
              <UserOutlined
                className={`text-sm lg:text-lg p-2 rounded-full  ${currentSlide == 'MyAccount' ? 'bg-gray-300' : 'bg-transparent'}`}
              />
              <div className="hidden sm:flex">My Account</div>
            </div>
            <div className="space-y-4 text-gray-600 flex flex-col gap-10">
              <div
                className={`flex items-center space-x-2 text-sm lg:text-lg font-semibold ${currentSlide == 'Membership' ? 'opacity-100' : 'opacity-60 hover:opacity-70'}`}
                style={{ color: theme.textColor }}
                onClick={() => setCurrentSlide('Membership')}
              >
                <IdcardOutlined
                  className={`text-sm lg:text-lg p-2 rounded-full  ${currentSlide == 'Membership' ? 'bg-gray-300' : 'bg-transparent'}`}
                />
                <div className="hidden sm:flex">Membership</div>
              </div>
              <div
                className={`flex items-center space-x-2 text-sm lg:text-lg font-semibold ${currentSlide == 'Address' ? 'opacity-100' : 'opacity-60 hover:opacity-70'}`}
                style={{ color: theme.textColor }}
                onClick={() => setCurrentSlide('Address')}
              >
                <EnvironmentOutlined
                  className={`text-sm lg:text-lg p-2 rounded-full  ${currentSlide == 'Address' ? 'bg-gray-300' : 'bg-transparent'}`}
                />
                <div className="hidden sm:flex">Address Book</div>
              </div>
              <div
                className={`flex items-center space-x-2 text-sm lg:text-lg font-semibold ${currentSlide == 'Payment' ? 'opacity-100' : 'opacity-60 hover:opacity-70'}`}
                style={{ color: theme.textColor }}
                onClick={() => setCurrentSlide('Payment')}
              >
                <CreditCardOutlined
                  className={`text-sm lg:text-lg p-2 rounded-full  ${currentSlide == 'Payment' ? 'bg-gray-300' : 'bg-transparent'}`}
                />
                <div className="hidden sm:flex">Payment Method</div>
              </div>
              <div
                className={`flex items-center space-x-2 text-sm lg:text-lg font-semibold ${currentSlide == 'OrderHistory' ? 'opacity-100' : 'opacity-60 hover:opacity-70'}`}
                style={{ color: theme.textColor }}
                onClick={() => setCurrentSlide('OrderHistory')}
              >
                <HistoryOutlined
                  className={`text-sm lg:text-lg p-2 rounded-full  ${currentSlide == 'OrderHistory' ? 'bg-gray-300' : 'bg-transparent'}`}
                />
                <div className="hidden sm:flex">Order History</div>
              </div>
            </div>
          </div>

          <div className="w-full mx-auto p-4 lg:p-10">
            {currentSlide == 'MyAccount' && (
              <MyAccount setCurrentSlide={setCurrentSlide} />
            )}
            {currentSlide == 'OrderHistory' && <OrderHistory />}
            {currentSlide == 'Membership' && <Membership />}
            {currentSlide == 'Address' && <AddressBlock />}
            {currentSlide == 'Payment' && <PaymentMethod />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
