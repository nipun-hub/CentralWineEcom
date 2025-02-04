import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import {
  CreditCardOutlined,
  EnvironmentOutlined,
  HistoryOutlined,
  IdcardOutlined,
  UserOutlined,
} from '@ant-design/icons'
import MyAccount from './MyAccount'
import OrderHistory from './OrderHistory'
import Membership from './Membership'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import AddressBlock from './AddressBlock'
import PaymentMethod from './PaymentMethord'
import AccessDenied from '../../components/CustomModel/AccessDenied'

const Account = () => {
  const { theme } = useContext(ThemeContext)
  const user = useSelector((state) => state.auth)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  // get navigate data
  const location = useLocation()
  const { type: navigationType } = location.state || {}

  const [currentSlide, setCurrentSlide] = useState('MyAccount')

  const changeSlide = (slide) => {
    if (isAuthenticated) {
      setCurrentSlide(slide)
    } else {
      setOpen(true)
    }
  }

  useEffect(() => {
    if (navigationType && currentSlide != navigationType) {
      setCurrentSlide(navigationType)
    } else {
      if (location.hash) {
        setCurrentSlide(location.hash.substring(1))
      }
    }
  }, [navigate, location])

  if (!isAuthenticated && currentSlide != 'Membership') {
    navigate('/')
  }

  return (
    <div style={{ backgroundColor: theme.background }}>
      <div className=" lg:container mx-auto p-6 ">
        <div className="flex ">
          <div className="md:w-1/4 h-screen flex flex-col justify-center gap-10">
            <div
              className={`flex items-center space-x-2 text-sm lg:text-lg font-semibold ${currentSlide == 'MyAccount' ? 'opacity-100' : 'opacity-60 hover:opacity-70'}`}
              style={{ color: theme.textColor }}
              onClick={() => changeSlide('MyAccount')}
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
                onClick={() => changeSlide('Address')}
              >
                <EnvironmentOutlined
                  className={`text-sm lg:text-lg p-2 rounded-full  ${currentSlide == 'Address' ? 'bg-gray-300' : 'bg-transparent'}`}
                />
                <div className="hidden sm:flex">Address Book</div>
              </div>
              <div
                className={`flex items-center space-x-2 text-sm lg:text-lg font-semibold ${currentSlide == 'Payment' ? 'opacity-100' : 'opacity-60 hover:opacity-70'}`}
                style={{ color: theme.textColor }}
                onClick={() => changeSlide('Payment')}
              >
                <CreditCardOutlined
                  className={`text-sm lg:text-lg p-2 rounded-full  ${currentSlide == 'Payment' ? 'bg-gray-300' : 'bg-transparent'}`}
                />
                <div className="hidden sm:flex">Payment Method</div>
              </div>
              <div
                className={`flex items-center space-x-2 text-sm lg:text-lg font-semibold ${currentSlide == 'OrderHistory' ? 'opacity-100' : 'opacity-60 hover:opacity-70'}`}
                style={{ color: theme.textColor }}
                onClick={() => changeSlide('OrderHistory')}
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
      <AccessDenied
        open={open}
        setOpen={setOpen}
      />
    </div>
  )
}

export default Account
