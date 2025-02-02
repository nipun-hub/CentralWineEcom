import React, { useState, useEffect } from 'react'
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Empty,
  Input,
  Modal,
  Radio,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useGetAddressQuery } from '../../features/api/addressSlice.js'
import { useNavigate } from 'react-router-dom'
import { useGetPaymentsQuery } from '../../features/api/paymentSlice.js'
import { useCheckoutMutation } from '../../features/api/orderSlice.js'
import TextArea from 'antd/es/input/TextArea'
import { useClearCartMutation } from '../../features/api/cartSlice.js'
import FormItemLabel from 'antd/es/form/FormItemLabel.js'

const colours = [
  {
    color1: '#FFF9E8',
    color2: '#FFE4B0',
    colorDoct: '#FFB800',
  },
  {
    color1: '#F5F9FF',
    color2: '#E0EEFF',
    colorDoct: '#4B9FFF',
  },
  {
    color1: '#FFF5F5',
    color2: '#FFE0E0',
    colorDoct: '#FF4D4D',
  },
  {
    color1: '#F2FFF5',
    color2: '#D6FFE0',
    colorDoct: '#00B327',
  }
]

const CheckoutModal = ({
  showCheckoutModal,
  setShowCheckoutModal,
  width = 500,
  data,
}) => {
  const navigate = useNavigate()
  const [currentState, setCurrentState] = useState('selectAddress') // selectAddress, selectPaymentMethod
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [randomDeliveryTime, setRandomDeliveryTime] = useState(null)

  useEffect(() => {
    // Generate random number only once when component mounts
    if (randomDeliveryTime === null) {
      const random = Math.floor(Math.random() * 4)
      setRandomDeliveryTime(random)
    }
  }, []) // Empty dependency array means this runs only once on mount

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const userId = useSelector((state) => state.auth.userId)
  const { data: addressData, isLoading: loadingAddress } =
    useGetAddressQuery(userId)
  const { data: paymentData, isLoading: gettingPayment } =
    useGetPaymentsQuery(userId)
  const [checkout, { isLoading: isCheckouting }] = useCheckoutMutation()
  const [clearCart, { isLoading: isClearing }] = useClearCartMutation()

  const handelFormChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (value) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const handleCancel = () => {
    setShowCheckoutModal(false)
    setCurrentState('selectAddress') // Reset to the initial state
    setFormData({
      address: '',
      mobileNumber: '',
      paymentMethod: '',
    })
  }

  const handelCheckout = async () => {
    const { products, userId, totalAmount } = data
    const checkoutData = {
      userId: userId,
      products: products,
      totalAmount: totalAmount,
      shippingAddress: formData.address,
      mobileNumber: formData.mobileNumber,
      paymentMethod: formData.paymentMethod,
      deliveryType: formData.deliveryType,
      deliveryDate: formData.deliveryDate,
      editable: formData.editable || false,
      userComments: formData.comments,
      paymentId: formData.paymentId,
    }

    const response = await checkout(checkoutData)
    if (response?.data?.success) {
      await clearCart(userId)
      handleCancel()
    }
  }

  const handleNext = () => {
    const requiredFields = []

    if (currentState === 'selectAddress') {
      requiredFields.push('address')
      requiredFields.push('mobileNumber')
    } else if (currentState === 'selectDeliveryType') {
      requiredFields.push('deliveryType')
      if (formData.deliveryType === 'Pickup') {
        requiredFields.push('deliveryDate')
      }
    } else {
      requiredFields.push('paymentMethod')
      if (formData.paymentMethod === 'Card') {
        requiredFields.push('paymentId')
      }
    }

    const newErrors = {}

    // Iterate through required fields and validate each
    requiredFields.forEach((field) => {
      const value = formData[field]

      if (!value) {
        newErrors[field] = `${field} is required`
      }
    })

    // Check if there are validation errors
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    if (currentState === 'selectAddress') {
      setCurrentState('selectDeliveryType')
    } else if (currentState === 'selectDeliveryType') {
      setCurrentState('selectPaymentMethod')
    } else {
      handelCheckout()
    }
  }

  const handleAddNewBlock = (type) => {
    setShowCheckoutModal(false)
    type === 'address' &&
      navigate('/my-account', { state: { type: 'Address' } })
    type === 'payment' &&
      navigate('/my-account', { state: { type: 'Payment' } })
  }

  return (
    <Modal
      title={null}
      open={showCheckoutModal}
      onCancel={handleCancel}
      footer={null}
      width={width}
      centered
      className="p-0"
      style={{ padding: '0' }}
    >
      <div className=" sm:p-8 rounded-lg text-center w-full">
        <h3 className="text-2xl text-start">
          {currentState === 'selectAddress'
            ? 'Select Address'
            : 'Select Payment Method'}
        </h3>
        <hr />

        {currentState === 'selectAddress' && (
          <>
            <div className="flex flex-col my-7">
              <p className="text-base opacity-60 text-start">
                Enter your and select address :
              </p>
              <div className="w-full my-2">
                <Input
                  type="number"
                  maxLength={10}
                  placeholder="Enter your mobile number"
                  className={`w-full px-4 py-3 mx-2 text-gray-700 placeholder:text-sm ${errors.mobileNumber && 'border border-red-500'}`}
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    handelFormChange('mobileNumber', e.target.value)
                  }
                />
              </div>
              <div className="w-full flex justify-start mt-5">
                <Button
                  type="white"
                  shape="round"
                  onClick={() => handleAddNewBlock('address')}
                  className="bg-white text-gray-500  border border-gray-200 hover:border-gray-200"
                >
                  <PlusOutlined />
                  Add New Address
                </Button>
              </div>
              <div className="w-full my-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 mt-5 justify-center justify-items-center">
                  {addressData?.map((address) => {
                    return (
                      <div
                        key={address._id}
                        className={`relative w-full max-w-[500px] p-5 rounded-xl shadow-lg bg-white hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer
                          ${errors.address ? "border-2 border-red-500" : "border border-gray-300"} 
                          ${formData.address === address._id ? "border-2 border-blue-500 bg-blue-50" : ""}`}
                        onClick={() => handelFormChange("address", address._id)}
                      >
                        {/* Background Decorations */}
                        <div
                          className="absolute inset-0 rounded-xl"
                          style={{ backgroundColor: colours[randomDeliveryTime]?.color1 || "#f0f4f8", zIndex: -1 }}
                        />
                        <div
                          className="absolute inset-0 hidden md:block rounded-xl"
                          style={{
                            backgroundColor: colours[randomDeliveryTime]?.color2 || "#e0e7ec",
                            clipPath: "circle(60% at 100% 20%)",
                          }}
                        />

                        {/* Address Content */}
                        <div className="relative flex items-start space-x-4">
                          {/* Selection Indicator */}
                          {formData.address === address._id && (
                            <div className="absolute top-4 right-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-blue-500"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M20.285 6.709a1 1 0 01.017 1.412l-10 11a1 1 0 01-1.45.043l-5-5a1 1 0 011.414-1.414l4.193 4.193 9.288-10.204a1 1 0 011.538 1.38z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}

                          {/* Address Details */}
                          <div className="flex-1">
                            <h2 className="text-lg font-semibold text-gray-800">{address.fullName}</h2>
                            <p className="text-gray-600 text-sm">{address.streetAddress}</p>
                            {address.additionalAddress && (
                              <p className="text-gray-500 text-sm">{address.additionalAddress}</p>
                            )}
                            <p className="text-gray-600 text-sm">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {addressData?.length === 0 && (
                  <div className="w-full flex items-center justify-center">
                    <Empty />
                  </div>
                )}
              </div>
              <div className="w-full my-2">
                <TextArea
                  placeholder="Enter Comments and other"
                  className={`w-full px-4 py-3 mx-2 text-gray-700 placeholder:text-sm ${errors.comments && 'border border-red-500'}`}
                  name="comments"
                  value={formData.comments}
                  onChange={(e) => handelFormChange('comments', e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        {currentState === 'selectDeliveryType' && (
          <>
            <div className="flex flex-col my-7">
              <div className="w-full my-2">
                <Card
                  className={` ${errors.deliveryType && ' border-red-500'}`}
                >
                  <div className="flex mb-5">
                    <Checkbox
                      onChange={(e) =>
                        handelFormChange('editable', e.target.checked)
                      }
                    >
                      Allow vintage substitutions
                    </Checkbox>
                    {/*<FormItemLabel label="Allow vintage substitutions" />*/}
                  </div>
                  <p className="text-base opacity-60 text-start">
                    Select delivery type:
                  </p>
                  <Radio.Group
                    className="text-center flex justify-center gap-1"
                    onChange={(e) =>
                      handelFormChange('deliveryType', e.target.value)
                    }
                  >
                    {['Delivery', 'Pickup'].map((deluvary) => (
                      <Radio.Button
                        block
                        className="w-full mt-3 mb-4"
                        value={deluvary}
                        key={deluvary}
                        id={deluvary}
                        optionType="button"
                        buttonStyle="solid"
                      >
                        {deluvary}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </Card>
              </div>

              {formData?.deliveryType == 'Pickup' ? (
                <div className="w-full my-2 gap-2 flex flex-col items-left justify-left text-start">
                  <FormItemLabel label="Select Pickup Date & Time *" />
                  <DatePicker
                    placeholder="Pickup Date & Time"
                    showTime
                    onChange={(value) => handelFormChange('deliveryDate', value)}
                    format="YYYY-MM-DD HH:mm:ss"
                    rootClassName={`w-fit
                    ${errors.deliveryDate && 'border border-red-500'}`}
                  />
                  <span className="text-red-500 text-xs">
                    {errors.deliveryDate}
                  </span>
                </div>
              ) : (
                <div className="w-full my-2 gap-2 flex flex-col items-left justify-left text-start">
                  <FormItemLabel label="Select Delivery Date" />
                  <DatePicker
                    placeholder="Delivery Date"
                    onChange={(value) => handelFormChange('deliveryDate', value)}
                    format="YYYY-MM-DD"
                    className={`w-fit`} 
                  />
                </div>
              )}
            </div>
          </>
        )}

        {currentState === 'selectPaymentMethod' && (
          <>
            <div className="flex flex-col my-7">
              <div className="w-full my-2">
                <Card
                  className={` ${errors.paymentMethod && ' border-red-500'}`}
                >
                  <p className="text-base opacity-60 text-start">
                    Select payment method:
                  </p>
                  <Radio.Group
                    className="text-center flex justify-center gap-1"
                    onChange={(e) =>
                      handelFormChange('paymentMethod', e.target.value)
                    }
                  >
                    {['Cash', 'Card'].map((payment) => (
                      <Radio.Button
                        block
                        className="w-full mt-3 mb-4"
                        value={payment}
                        key={payment}
                        id={payment}
                        optionType="button"
                        buttonStyle="solid"
                      >
                        {payment}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </Card>
              </div>

              {formData?.paymentMethod == 'Card' && (
                <div>
                  <div className="w-full flex justify-start mt-5">
                    <Button
                      type="white"
                      shape="round"
                      onClick={() => handleAddNewBlock('payment')}
                      className="bg-white text-gray-500  border border-gray-200 hover:border-gray-200"
                    >
                      <PlusOutlined />
                      Add New Address Method
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 justify-center justify-items-center">
                    {paymentData?.map((payment) => {
                      return (
                        <div
                          key={payment._id}
                          className={`
                        relative
                        w-full max-w-[482px]
                        rounded-2xl
                        shadow-sm p-4 md:p-6
                        overflow-hidden
                        min-h-[245px]
                        border-2
                        hover:scale-105
                        hover:border-6
                        hover:border-blue-100
                        transition-all duration-100 ease-in-out
                        ${errors.paymentId && ' border-red-500'}
                        ${formData.paymentId === payment._id && 'border-6 border-blue-100'}
                        `}
                          onClick={() =>
                            handelFormChange('paymentId', payment._id)
                          }
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundColor: colours[randomDeliveryTime].color1,
                            }}
                          />

                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundColor: colours[randomDeliveryTime].color2,
                              clipPath: 'circle(60% at 100% 25%)',
                            }}
                          />

                          <div
                            className="absolute top-4 right-10 w-5 h-5 rounded-full"
                            style={{
                              backgroundColor: colours[randomDeliveryTime].colorDoct,
                            }}
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
                                  <div className="text-xs mb-1 font-semibold">
                                    Name
                                  </div>
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
                                  <div className="text-sm">
                                    {payment.cardType}
                                  </div>
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
                </div>
              )}
            </div>
          </>
        )}

        <div className="flex gap-3 justify-end">
          <Button type="text" shape="round" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="yellow"
            shape="round"
            onClick={handleNext}
            className="bg-yellow-500 rounded-full py-1 px-4 text-white hover:bg-yellow-600"
          >
            {currentState === 'selectPaymentMethod'
              ? isCheckouting
                ? 'Loading ...'
                : 'Chechout'
              : 'Next'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CheckoutModal
