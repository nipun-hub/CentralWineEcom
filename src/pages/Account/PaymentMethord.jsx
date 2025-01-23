import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { Button, Empty } from 'antd'
import { DeleteOutlined, EditOutlined, ExportOutlined } from '@ant-design/icons'
import CustomModelNewPayment from '../../components/CustomModel/CustomModelNewPayment'
import { useGetPaymentsQuery } from '../../features/api/paymentSlice.js'
import { useSelector } from 'react-redux'
import CustomModelDeletePayment from '../../components/CustomModel/CustomModelDeletePayment.jsx'

const PaymentMethod = () => {
  const { theme } = useContext(ThemeContext)

  const userId = useSelector((state) => state.auth.userId)
  const cardColours = useSelector((state) => state.cardColours.colours)
  const { data: paymentData, isLoading: gettingPayment } =
    useGetPaymentsQuery(userId)

  const [activePayment, setActivePayment] = useState({})
  const [paymentModelOpenType, setPaymentModelOpenType] = useState('new')

  const [showCustomModelNewPayment, setShowCustomModelNewPayment] =
    useState(false)
  const openCustomModelNewPayment = (type = 'new', payment = null) => {
    setPaymentModelOpenType(type)
    payment && setActivePayment(payment)
    setShowCustomModelNewPayment(true)
  }

  const [activePaymentDelete, setActivePaymentDelete] = useState({})
  const [showCustomModelDeletePayment, setShowCustomModelDeletePayment] =
    useState(false)
  const openCustomModelDeletePayment = (payment = null) => {
    payment && setActivePaymentDelete(payment)
    setShowCustomModelDeletePayment(true)
  }

  return (
    <>
      {/* Payment Method section */}
      <div className="relative flex items-center justify-between">
        <div
          className=" text-lg sm:text-3xl w-fit z-10"
          style={{ backgroundColor: theme.background }}
        >
          Payment Method
        </div>
        <div
          className="absolute bg-transparent h-0.5 rounded w-full z-0"
          style={{ backgroundColor: theme.textColor }}
        ></div>
        <div>
          <Button
            className="font-semibold w-fit md:w-40"
            shape="round"
            icon={<EditOutlined />}
            size="large"
            onClick={() => openCustomModelNewPayment()}
          >
            <div className="hidden sm:inline">New</div>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 justify-center justify-items-center">
        {paymentData?.map((payment) => {
          const randomNumber = Math.floor(Math.random() * 5)
          return (
            <div
              key={payment._id}
              className="relative w-full max-w-[482px] rounded-2xl shadow-sm p-4 md:p-6 overflow-hidden min-h-[245px]"
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: cardColours[randomNumber].color1 }}
              />

              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: cardColours[randomNumber].color2,
                  clipPath: 'circle(60% at 100% 25%)',
                }}
              />

              <div
                className="absolute top-4 right-10 w-5 h-5 rounded-full"
                style={{ backgroundColor: cardColours[randomNumber].colorDoct }}
              />

              {/* Content */}
              {/* Card content */}
              <div className="relative  p-6 h-full flex flex-col justify-between">
                <div className="text-gray-600 flex flex-col justify-around h-full">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs mb-1 font-semibold">
                        Card Number
                      </div>
                      <div className="font-mono text-gray-800 tracking-wider mb-6">
                        {payment.cardNumber}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs mb-1 font-semibold">Name</div>
                      <div className="font-mono text-gray-800 tracking-wider mb-6">
                        {payment.cardHolderName}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pe-10">
                    <div>
                      <div className="font-semibold text-xs mb-1">
                        Card Type
                      </div>
                      <div className="text-sm">{payment.cardType}</div>
                    </div>

                    <div>
                      <div className="text-[#E7E7E7] text-xs mb-1">
                        Exp.Date
                      </div>
                      <div className="text-sm text-[#888888]">
                        {payment.expiryDate}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-3 right-0 flex gap-4 pe-5 text-white">
                  <button
                    className="p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors text-black"
                    aria-label="Edit"
                    onClick={() => openCustomModelNewPayment('update', payment)}
                  >
                    <EditOutlined />
                  </button>
                  <button
                    className="p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors text-black"
                    aria-label="Delete"
                    onClick={() => openCustomModelDeletePayment(payment)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {paymentData?.length === 0 && (
        <div className="w-full flex items-center justify-center">
          <Empty />
        </div>
      )}
      <CustomModelNewPayment
        showCustomModel={showCustomModelNewPayment}
        setShowCustomModel={setShowCustomModelNewPayment}
        width="778px"
        payment={paymentModelOpenType == 'update' ? activePayment : null}
        type={paymentModelOpenType} // new or update
      />

      <CustomModelDeletePayment
        showCustomModel={showCustomModelDeletePayment}
        setShowCustomModel={setShowCustomModelDeletePayment}
        payment={activePaymentDelete}
      />
    </>
  )
}

export default PaymentMethod
