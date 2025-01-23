import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, Select } from 'antd'
import { useSelector } from 'react-redux'
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import {
  useAddPaymentMutation,
  useUpdatePaymentMutation,
} from '../../features/api/paymentSlice.js'

const CustomModelNewPayment = ({
  showCustomModel,
  setShowCustomModel,
  width = 500,
  type,
  payment,
}) => {
  const userId = useSelector((state) => state.auth.userId)
  const [addPayment, { isLoading: isLoadingAddPayment }] =
    useAddPaymentMutation()
  const [updatePayment, { isLoading: isLoadingUpdatePayment }] =
    useUpdatePaymentMutation()

  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (type === 'update') {
      setFormData(payment)
    } else {
      setFormData({})
      setErrors({})
    }
  }, [payment, type])

  const handelChangeFormData = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (value) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const handleOk = () => {
    setShowCustomModel(false)
  }

  const handleCancel = () => {
    setShowCustomModel(false)
    setFormData({})
    setErrors({})
  }

  const handleSubmit = async () => {
    const requiredFields = [
      'cardHolderName',
      'cardNumber',
      'expiryDate',
      'cardType',
      'cvv',
    ]

    const newErrors = {}

    // Iterate through required fields and validate each
    requiredFields.forEach((field) => {
      const value = formData[field]

      if (!value) {
        newErrors[field] = `${field} is required`
      } else {
        // Specific validations for CVV and expiryDate
        if (field === 'cvv' && !/^\d{3}$/.test(value)) {
          newErrors[field] = 'CVV must be a 3-digit number'
        }
        if (field === 'expiryDate' && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
          newErrors[field] = 'Expiry Date must be in MM/YY format'
        }
      }
    })

    // Check if there are validation errors
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    if (type == 'new' && userId && formData) {
      await addPayment({
        userId: userId,
        cardHolderName: formData.cardHolderName,
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cardType: formData.cardType,
        cvv: formData.cvv,
      })
      handleCancel()
    } else if (type == 'update' && userId && formData) {
      const data = {
        userId: userId,
        paymentId: formData._id,
        data: {
          cardHolderName: formData.cardHolderName,
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cardType: formData.cardType,
          cvv: formData.cvv,
        },
      }
      await updatePayment(data)
      handleCancel()
    }
  }

  return (
    <div>
      <Modal
        title={null}
        open={showCustomModel}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={width}
        centered
        className="p-0 my-10"
        style={{ padding: '0' }}
      >
        <div className=" rounded-lg text-center w-full">
          <h3 className="text-2xl text-start">
            {type == 'new' ? 'Add Payment' : 'Edit Payment'}
          </h3>
          <hr />
          <div className="flex flex-col gap-4 my-7 items-center">
            <div className="flex w-full gap-5">
              <div className="w-full my-2">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 mx-2 text-gray-700 bg-white border-0 focus:outline-none peer placeholder:text-sm"
                    placeholder="Jenn Jiang"
                    name="cardHolderName"
                    value={
                      formData.cardHolderName ? formData.cardHolderName : ''
                    }
                    onChange={handelChangeFormData}
                  />
                  <div className="absolute inset-x-4 -top-2 flex w-fit z-10">
                    <span
                      className={`px-2 text-xs text-black bg-white ${errors['cardHolderName'] && 'text-red-500'}`}
                    >
                      Cardholder Name *
                    </span>
                  </div>
                  <div
                    className={`absolute inset-0 border border-black rounded-md pointer-events-none ${errors['cardHolderName'] && 'border-red-500'}`}
                  />
                </div>
              </div>

              <div className="w-full my-2">
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 mx-2 text-gray-700 bg-white border-0 focus:outline-none peer placeholder:text-sm"
                    name="cardType"
                    onChange={handelChangeFormData}
                  >
                    <option
                      value=""
                      selected={!formData.cardType || formData.cardType == ''}
                    >
                      Select Card Type
                    </option>
                    <option selected={formData.cardType == 'Visa'} value="Visa">
                      Visa
                    </option>
                    <option
                      selected={formData.cardType == 'MasterCard'}
                      value="MasterCard"
                    >
                      Master Card
                    </option>
                    <option
                      selected={formData.cardType == 'American'}
                      value="American Express"
                    >
                      American Express
                    </option>
                    <option
                      selected={formData.cardType == 'Discover'}
                      value="Discover"
                    >
                      Discover
                    </option>
                    <option selected={formData.cardType == 'JCB'} value="JCB">
                      JCB
                    </option>
                    <option
                      selected={formData.cardType == 'Other'}
                      value="Other"
                    >
                      Other
                    </option>
                  </select>
                  <div className="absolute inset-x-4 -top-2 flex w-fit z-10">
                    <span
                      className={`px-2 text-xs text-black bg-white ${errors['cardType'] && 'text-red-500'}`}
                    >
                      Card Type *
                    </span>
                  </div>
                  <div
                    className={`absolute inset-0 border border-black rounded-md pointer-events-none ${errors['cardType'] && 'border-red-500'}`}
                  />
                </div>
              </div>
            </div>

            <div className="w-full my-2">
              <div className="relative">
                <Input
                  maxLength={12}
                  type="text"
                  className="w-full px-4 py-3 mx-2 text-gray-700 bg-white border-0 focus:outline-none peer placeholder:text-sm"
                  placeholder="1234456778901234"
                  name="cardNumber"
                  value={formData.cardNumber || ''}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) {
                      // Ensure numeric input
                      handelChangeFormData(e)
                    }
                  }}
                />

                <div className="absolute inset-x-4 -top-2 flex w-fit z-10">
                  <span
                    className={`px-2 text-xs text-black bg-white ${errors['cardNumber'] && 'text-red-500'}`}
                  >
                    Card Number
                  </span>
                </div>
                <div
                  className={`absolute inset-0 border border-black rounded-md pointer-events-none ${errors['cardNumber'] && 'border-red-500'}`}
                />
              </div>
            </div>

            <div className="flex gap-5 w-full">
              <div className="w-full my-2">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 mx-2 text-gray-700 bg-white border-0 focus:outline-none peer placeholder:text-sm"
                    placeholder="12/24"
                    name="expiryDate"
                    value={formData.expiryDate ? formData.expiryDate : ''}
                    onChange={handelChangeFormData}
                  />
                  <div className="absolute inset-x-4 -top-2 flex w-fit z-10">
                    <span
                      className={`px-2 text-xs text-black bg-white ${errors['expiryDate'] && 'text-red-500'}`}
                    >
                      Exp Date
                    </span>
                  </div>
                  <div
                    className={`absolute inset-0 border border-black rounded-md pointer-events-none ${errors['expiryDate'] && 'border-red-500'}`}
                  />
                </div>
              </div>
              <div className="w-full my-2">
                <div className="relative">
                  <input
                    type="Number"
                    maxLength={3}
                    className="w-full px-4 py-3 mx-2 text-gray-700 bg-white border-0 focus:outline-none peer placeholder:text-sm"
                    placeholder="243"
                    name="cvv"
                    value={formData.cvv ? formData.cvv : ''}
                    onChange={handelChangeFormData}
                  />
                  <div className="absolute inset-x-4 -top-2 flex w-fit z-10">
                    <span
                      className={`px-2 text-xs text-black bg-white ${errors['cvv'] && 'text-red-500'}`}
                    >
                      ccv*
                    </span>
                  </div>
                  <div
                    className={`absolute inset-0 border border-black rounded-md pointer-events-none ${errors['cvv'] && 'border-red-500'}`}
                  />
                </div>
              </div>
            </div>

            {/* card block  */}
            <div className="relative w-full max-w-[482px] rounded-2xl shadow-sm p-4 md:p-6 overflow-hidden min-h-[245px]">
              <div
                className="absolute inset-0"
                style={{ backgroundColor: '#FEFFC1' }}
              />

              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: '#89580A',
                  clipPath: 'circle(60% at 100% 25%)',
                }}
              />

              {/*<div*/}
              {/*  className="absolute top-4 right-10 w-5 h-5 rounded-full"*/}
              {/*  style={{ backgroundColor: colours[randomNumber].colorDoct }}*/}
              {/*/>*/}

              {/* Content */}
              {/* Card content */}
              <div className="relative py-6 :p-6 h-full flex flex-col justify-between">
                <div className="text-gray-600 flex flex-col justify-around h-full">
                  <div className="flex justify-between text-start">
                    <div>
                      <div className="text-xs mb-1 font-semibold">
                        Card Number
                      </div>
                      <div className="font-mono text-gray-800 tracking-wider mb-6">
                        {formData.cardNumber
                          ? formData.cardNumber
                          : 1234456778901234}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs mb-1 font-semibold">Name</div>
                      <div className="font-mono text-gray-800 tracking-wider mb-6">
                        {formData.cardHolderName
                          ? formData.cardHolderName
                          : 'John Doe'}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pe-10">
                    <div>
                      <div className="font-semibold text-xs mb-1">
                        Card Type
                      </div>
                      <div className="text-sm">
                        {formData.cardType ? formData.cardType : 'Visa'}
                      </div>
                    </div>

                    <div>
                      <div className="text-[#E7E7E7] text-xs mb-1">
                        Exp.Date
                      </div>
                      <div className="text-sm text-[#888888]">
                        {formData.expiryDate ? formData.expiryDate : '12/24'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-3 right-0 flex gap-4 pe-5 text-white hidden">
                  <button
                    className="p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors text-black"
                    aria-label="Edit"
                    // onClick={() => openCustomModelNewPayment('update', payment)}
                  >
                    <EditOutlined />
                  </button>
                  <button
                    className="p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors text-black"
                    aria-label="Delete"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button shape="round" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              shape="round"
              className="bg-yellow-500 text-white"
              onClick={handleSubmit}
              disabled={isLoadingUpdatePayment || isLoadingAddPayment}
            >
              {isLoadingAddPayment || isLoadingUpdatePayment ? (
                <>
                  <LoadingOutlined /> &nbsp;
                  {type === 'new' ? 'Adding' : 'Updating'}
                </>
              ) : type === 'new' ? (
                'Add'
              ) : (
                'Update'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CustomModelNewPayment
