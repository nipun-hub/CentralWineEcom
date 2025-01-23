import React, { useState } from 'react'
import { Button, Input, Modal } from 'antd'
import UserService from '../../services/UserService'
import { tostAlert } from '../../utils/notification'
import { LoadingOutlined } from '@ant-design/icons'
import { useLoginMutation } from '../../features/api/authSlice'

const Login = ({
  showCustomModel,
  setShowCustomModel,
  openSignUp,
  width = 500,
}) => {
  // const [isLoading, setIsLading] = useState(false);

  const [login, { isLoading, isError }] = useLoginMutation()

  const showModal = () => {
    setShowCustomModel(true)
  }

  const handleOk = () => {
    setShowCustomModel(false)
  }

  const handleCancel = () => {
    setShowCustomModel(false)
  }

  const signUpOpen = () => {
    handleCancel()
    openSignUp()
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPassword = (password) => {
    return password.length >= 5
  }

  // data stor section

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setErrors({
      ...errors,
      [name]: '',
    }) // Clear error for the field being edited
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    // setIsLading(true);

    if (!validateForm()) {
      return
    }

    const { email, password } = formData

    try {
      const response = await login({ email, password }).unwrap()
      if (response.data) {
        handleCancel()
      }
      console.log(response.message)
    } catch (error) {
      console.log(error)
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
        styles={{ padding: '0' }}
      >
        <div className=" p-8 rounded-lg text-center w-full">
          <h3 className="text-2xl text-start">Welcome To Central Wine</h3>
          <hr />
          <h3 className="my-8 text-4xl font-bold">Sign in</h3>
          <div className="flex flex-col gap-2 my-7">
            <div className="w-full my-2">
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 mx-2 text-gray-700 bg-white border-0 focus:outline-none peer placeholder:text-sm"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
                <div
                  className={`absolute inset-0 border  rounded-md pointer-events-none ${errors.email && 'border-red-500'}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-2 text-start">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="relative">
                <Input.Password
                  variant="borderless"
                  placeholder="Password"
                  className="py-3"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
                <div
                  className={`absolute inset-0 border  rounded-md pointer-events-none ${errors.password && 'border-red-500'}`}
                />
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs text-start">
                {errors.password}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 items-center w-full">
            <button
              className="bg-yellow-500 w-1/3 py-3 rounded-full text-white hover:bg-yellow-600 transition-all duration-300 ease-in-out"
              onClick={handleSubmit}
              disabled={isLoading} // Disables button during loading
            >
              {isLoading ? (
                <>
                  <LoadingOutlined /> &nbsp;&nbsp;&nbsp;Loading
                </>
              ) : (
                'Login'
              )}
            </button>
            <p>
              Don't have an account?&nbsp;
              <span className="text-yellow-700 cursor-pointer" onClick={signUpOpen}>
                Create Account
              </span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Login
