import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { useChangeNameMutation } from '../../features/api/userSlice.js'
import { LoadingOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { tostAlert } from '../../utils/notification.js'
import { data } from 'autoprefixer'

const CustomModelEditName = ({
  showCustomModel,
  setShowCustomModel,
  width = 500,
}) => {
  const userId = useSelector((state) => state.auth.userId)
  const [changeName, { isLoading: loadingChangeName }] = useChangeNameMutation()

  const [formData, setFormData] = useState({})
  const handelChangeFormData = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const formItem = [
    {
      name: 'First Name',
      type: 'text',
      placeholder: 'Jenn Jiang',
      label: 'First Name',
      name: 'firstName',
    },
    {
      name: 'Last Name',
      type: 'text',
      placeholder: 'Jenn Jiang',
      label: 'Last Name',
      name: 'lastName',
    },
  ]

  const handleOk = () => {
    setShowCustomModel(false)
  }

  const handleCancel = () => {
    setShowCustomModel(false)
  }

  const handelSubmit = async () => {
    if (formData.firstName && formData.lastName) {
      try {
        await changeName({
          userId: userId,
          firstName: formData.firstName,
          lastName: formData.lastName,
        })
        handleCancel()
      } catch (error) {
        console.log(error)
      }
    } else {
      tostAlert('error', 'First and Last Name are required')
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
        className="p-0"
        style={{ padding: '0' }}
      >
        <div className=" p-8 rounded-lg text-center w-full">
          <h3 className="text-2xl text-start">Name Editor</h3>
          <hr />
          <div className="flex flex-col gap-4 my-7">
            {formItem.map((item) => (
              <div className="w-full my-2" key={item.name}>
                <div className="relative">
                  <input
                    type={item.type}
                    className="w-full px-4 py-3 mx-2 text-gray-700 bg-white border-0 focus:outline-none peer placeholder:text-sm"
                    placeholder={item.placeholder}
                    name={item.name}
                    value={formData[item.name]}
                    onChange={handelChangeFormData}
                  />
                  <div className="absolute inset-x-4 -top-2 flex w-fit z-10">
                    <span className="px-2 text-xs text-black bg-white">
                      {item.label}
                    </span>
                  </div>
                  <div className="absolute inset-0 border border-black rounded-md pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-end">
            <Button shape="round" onClick={handleCancel}>Cancel</Button>
            <button
              onClick={handelSubmit}
              shape="round"
              className="bg-yellow-500 py-1 w-1/6 rounded-full text-white hover:bg-yellow-600"
            >
              {loadingChangeName ? (
                <>
                  <LoadingOutlined /> &nbsp;&nbsp;&nbsp;Loading
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CustomModelEditName
