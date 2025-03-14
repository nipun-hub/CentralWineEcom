import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from '../../features/api/addressSlice.js'
import { useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'

const fields = [
  {
    id: 1,
    type: 'text',
    label: 'Full Name',
    placeholder: 'John Doe',
    name: 'fullName',
    required: true,
  },
  {
    id: 2,
    type: 'text',
    label: 'Street Address',
    placeholder: '123 Main Street',
    name: 'streetAddress',
    required: true,
  },
  {
    id: 3,
    type: 'text',
    label: 'Additional Address',
    placeholder: 'Apartment 4B',
    name: 'additionalAddress',
    required: false,
  },
  {
    id: 4,
    type: 'text',
    label: 'City',
    placeholder: 'New York',
    name: 'city',
    required: true,
  },
  {
    id: 5,
    type: 'text',
    label: 'State',
    placeholder: 'NY',
    name: 'state',
    required: true,
  },
  {
    id: 6,
    type: 'number',
    label: 'ZIP Code',
    placeholder: '10001',
    name: 'zipCode',
    required: true,
  },
]

const CustomModelAddressBlock = ({
  showCustomModel,
  setShowCustomModel,
  width = 500,
  type,
  address,
}) => {
  const userId = useSelector((state) => state.auth.userId)
  const [addAddress, { isLoading: loadingAddAddress }] = useAddAddressMutation()
  const [updateAddress, { isLoading: loadingUpdateAddress }] =
    useUpdateAddressMutation()

  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (type === 'update') {
      setFormData(address)
    } else {
      setFormData({})
    }
  }, [address, type])

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
    setFormData({})
    setErrors({})
    setShowCustomModel(false)
  }

  const handleSubmit = async () => {
    const newErrors = {}
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (type == 'new' && userId && formData) {
      await addAddress({
        userId: userId,
        fullName: formData.fullName,
        streetAddress: formData.streetAddress,
        additionalAddress: formData.additionalAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      })
      handleCancel()
    } else if (type == 'update' && userId && formData) {
      const data = {
        userId: userId,
        addressId: formData._id,
        data: {
          fullName: formData.fullName,
          streetAddress: formData.streetAddress,
          additionalAddress: formData.additionalAddress,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
      }
      await updateAddress(data)
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
        <div className=" p-8 rounded-lg text-center w-full">
          <h3 className="text-2xl text-start">
            {type === 'new' ? 'Add Address' : 'Edit Address'}
          </h3>
          <hr />
          <div className="flex flex-col gap-4 my-7">
            {fields.map((field) => (
              <div className="w-full my-2" key={field.id}>
                <div className="relative">
                  <input
                    type={field.type}
                    className="w-full px-4 py-3 mx-2 text-gray-700 bg-white border-0 focus:outline-none peer placeholder:text-sm"
                    placeholder={field.placeholder}
                    name={field.name}
                    onChange={handelChangeFormData}
                    value={formData[field.name] ? formData[field.name] : ''}
                    required={field.required}
                  />
                  <div className="absolute inset-x-4 -top-2 flex w-fit z-10">
                    <span className="px-2 text-xs text-black bg-white">
                      {field.label} {field.required && '*'}
                    </span>
                  </div>
                  <div
                    className={`absolute inset-0 border border-black rounded-md pointer-events-none ${errors[field.name] && 'border-red-500'}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-end">
            <Button shape="round" onClick={handleCancel}>Cancel</Button>
            <button
              onClick={handleSubmit}
              shape="round"
              className="
              bg-yellow-500 hover:bg-yellow-600
               text-white
                px-5 rounded-full"
              disabled={loadingAddAddress || loadingUpdateAddress}
            >
              {loadingAddAddress || loadingUpdateAddress ? (
                <>
                  <LoadingOutlined /> &nbsp;
                  {type === 'new' ? 'Adding' : 'Updating'}
                </>
              ) : type === 'new' ? (
                'Add'
              ) : (
                'Update'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CustomModelAddressBlock
