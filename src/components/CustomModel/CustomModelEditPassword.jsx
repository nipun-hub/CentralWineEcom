import React, { useEffect, useState } from 'react'
import { Button, Input, Modal } from 'antd'
import { useSelector } from 'react-redux'
import {
  useCheckPasswordSameMutation,
  useUpdatePasswordMutation,
} from '../../features/api/userSlice.js'
import { LoadingOutlined } from '@ant-design/icons'
import { tostAlert } from '../../utils/notification.js'

const CustomModelEditPassword = ({
  showCustomModel,
  setShowCustomModel,
  width = 500,
}) => {
  const [currentState, setCurrentState] = useState('oldPassword') // oldPassword , newPassword , conformEmail , EnterOtp

  const [formData, setFormData] = useState({})
  const handelChangeFormData = (e) => {
    console.log('hhhh')
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const userId = useSelector((state) => state.auth.userId)
  const [checkPasswordSame, { isLoading: checkPasswordSameLoading }] =
    useCheckPasswordSameMutation()
  const [updatePassword, { isLoading: updatePasswordLoading }] =
    useUpdatePasswordMutation()

  const handleOk = () => {
    setShowCustomModel(false)
  }

  const handleCancel = () => {
    setShowCustomModel(false)
    setCurrentState('oldPassword')
  }

  const onChange = (text) => {
    console.log('onChange:', text)
  }

  const sharedProps = {
    onChange,
  }

  const handleCheckPasswordSame = async () => {
    try {
      if (formData.oldPassword) {
        const response = await checkPasswordSame({
          userId,
          password: formData.oldPassword,
        })

        console.log(response)

        // Explicitly check the response status or success flag
        if (response?.data?.status === 200 && response?.data?.success) {
          console.log('Password check response:', response)

          // Show success alert
          tostAlert('success', 'Password verified successfully.')

          // Proceed to the next state
          setCurrentState('newPassword')
        } else {
          // Handle failure response
          const errorMessage =
            response?.data?.message || 'Password to verify password.'
          // throw new Error(errorMessage)
          tostAlert('error', errorMessage)
        }
      } else {
        tostAlert('error', 'Old password is required.')
      }
    } catch (error) {
      // Log the error
      console.error('Error checking password:', error)

      // Show error alert
      tostAlert(
        'error',
        `Error while checking password: ${
          error?.message || 'An unknown error occurred.'
        }`,
      )
    }
  }

  const handelClickConformPassword = async () => {
    try {
      if (
        formData.newPassword &&
        formData.confirmPassword &&
        formData.newPassword == formData.confirmPassword
      ) {
        const data = {
          userId: userId,
          newPassword: formData.newPassword,
          oldPassword: formData.oldPassword,
        }
        const response = await updatePassword(data)

        // Explicitly check the response status or success flag
        if (response?.data?.status === 200 && response?.data?.success) {
          console.log('Password check response:', response)

          // Show success alert
          tostAlert('success', 'Password changed successfully.')

          // Proceed to the next state
          // setCurrentState('conformEmail')
          setFormData({})
          handleCancel()
        } else {
          // Handle failure response
          const errorMessage =
            response?.data?.message || 'Password to verify password.'
          // throw new Error(errorMessage)
          tostAlert('error', errorMessage)
        }
      } else {
        tostAlert('error', 'Password does not match.')
      }
    } catch (error) {
      // Log the error
      console.error('Error checking password:', error)

      // Show error alert
      tostAlert(
        'error',
        `Error while checking password: ${
          error?.message || 'An unknown error occurred.'
        }`,
      )
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
          <h3 className="text-2xl text-start">
            {currentState === 'newPassword' || currentState === 'oldPassword'
              ? 'Change Password'
              : 'Reset Password'}
          </h3>
          <hr />
          {currentState == 'oldPassword' && (
            <>
              <div className="flex flex-col my-7">
                <p className="text-base opacity-60 text-start">
                  Enter Your Last Password For verify that's your
                </p>
                <div className="w-full my-2">
                  <div className="relative">
                    <Input.Password
                      onChange={handelChangeFormData} // Correct 'onChange' with uppercase 'C'
                      placeholder="input password"
                      className="w-full px-4 py-3 mx-2 text-gray-700 placeholder:text-sm"
                      variant="borderless"
                      value={formData.oldPassword}
                      name="oldPassword"
                    />

                    <div className="absolute inset-0 border border-black rounded-md pointer-events-none" />
                  </div>
                </div>
                <p
                  className="text-base opacity-60 text-end text-yellow-600"
                  onClick={() => setCurrentState('conformEmail')}
                >
                  Forget Password ?
                </p>
              </div>
              <div className="flex gap-3 justify-end">
                <Button type="text" shape="round" onClick={handleCancel}>
                  Cancel
                </Button>
                <span
                  className="bg-yellow-500 rounded-full py-1 px-4 text-white hover:bg-yellow-600"
                  onClick={() => handleCheckPasswordSame()}
                >
                  {checkPasswordSameLoading ? (
                    <>
                      <LoadingOutlined /> &nbsp;&nbsp;&nbsp;Checking
                    </>
                  ) : (
                    'Next'
                  )}
                </span>
              </div>
            </>
          )}

          {currentState == 'newPassword' && (
            <>
              <div className="flex flex-col my-7">
                <p className="text-base opacity-60 text-start">
                  Create New Password For wine.com
                </p>
                <div className="w-full my-2">
                  <div className="relative">
                    <Input.Password
                      onChange={handelChangeFormData}
                      placeholder="Create e Password"
                      className="w-full px-4 py-3 mx-2 text-gray-700 placeholder:text-sm"
                      variant="newPassword"
                      name="newPassword"
                      // value={formData.newPassword}
                    />
                    <div className="absolute inset-0 border border-black rounded-md pointer-events-none" />
                  </div>
                </div>

                <div className="w-full my-2">
                  <div className="relative">
                    <Input.Password
                      onChange={handelChangeFormData}
                      placeholder="Conform Password"
                      className="w-full px-4 py-3 mx-2 text-gray-700 placeholder:text-sm"
                      variant="confirmPassword"
                      name="confirmPassword"
                      // value={formData.confirmPassword}
                    />
                    <div className="absolute inset-0 border border-black rounded-md pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button type="text" shape="round" onClick={handleCancel}>
                  Cancel
                </Button>
                <span
                  onClick={handelClickConformPassword}
                  className="bg-yellow-500 rounded-full py-1 px-4 text-white hover:bg-yellow-600"
                >
                  {updatePasswordLoading ? (
                    <>
                      <LoadingOutlined /> &nbsp;&nbsp;&nbsp;Updating
                    </>
                  ) : (
                    ' Conform'
                  )}
                </span>
              </div>
            </>
          )}

          {/* reset password section  */}

          {currentState == 'conformEmail' && (
            <>
              <div className="flex flex-col my-7">
                <p className="text-base opacity-60 text-start">
                  Enter your e*********@gmail.com
                </p>
                <div className="w-full my-2">
                  <div className="relative">
                    <Input
                      placeholder="e*********@gmail.com"
                      className="w-full px-4 py-3 mx-2 text-gray-700 placeholder:text-sm"
                      variant="borderless"
                    />
                    <div className="absolute inset-0 border border-black rounded-md pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button type="text" shape="round" onClick={handleCancel}>
                  Cancel
                </Button>
                <span
                  className="bg-yellow-500 rounded-full py-1 px-4 text-white hover:bg-yellow-600"
                  onClick={() => setCurrentState('EnterOtp')}
                >
                  Next
                </span>
              </div>
            </>
          )}

          {currentState == 'EnterOtp' && (
            <>
              <div className="flex flex-col my-7">
                <p className="text-base opacity-60 text-start">
                  Check Your E-Mail
                </p>
                <div className="w-full my-2">
                  <div className="relative">
                    {/* <Input placeholder="e*********@gmail.com" className="w-full px-4 py-3 mx-2 text-gray-700 placeholder:text-sm" variant="borderless" /> */}
                    <Input.OTP length={5} {...sharedProps} />
                    {/* <div className="absolute inset-0 border border-black rounded-md pointer-events-none" /> */}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button type="text" shape="round" onClick={handleCancel}>
                  Cancel
                </Button>
                <span
                  className="bg-yellow-500 rounded-full py-1 px-4 text-white hover:bg-yellow-600"
                  onClick={() => setCurrentState('EnterOtp')}
                >
                  Verify
                </span>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default CustomModelEditPassword
