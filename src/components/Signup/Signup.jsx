import React, { useEffect, useState } from 'react'
import { Input, Modal } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useRegisterMutation } from '../../features/api/authSlice'
import { tostAlert } from '../../utils/notification'
import { useCheckEmailMutation } from '../../features/api/userSlice.js'

const SignUp = ({
  showCustomModel,
  setShowCustomModel,
  openLogin,
  width = 500,
}) => {
  // const [isModalVisible, setIsModalVisible] = useState(showModel);
  // const [isLoading, setIsLading] = useState(false);
  const [register, { isLoading, isError, isSuccess }] = useRegisterMutation()
  const [checkEmail, { isLoading: loadingCheckEmail }] = useCheckEmailMutation()

  const showModal = () => {
    setShowCustomModel(true)
  }

  const handleOk = () => {
    setShowCustomModel(false)
  }

  const handleCancel = () => {
    setShowCustomModel(false)
  }

  const handelOpenLogin = () => {
    handleCancel()
    openLogin()
  }

  // useEffect(() => {
  //
  // }, [])

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return strongPasswordRegex.test(password)
  }

  // data stor section

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  // Update form values
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    // Clear field-specific errors on input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }))
  }

  // Validation functions

  const checkEmailAlredtExit = async () => {
    try {
      const data = {
        email: formData.email,
      }
      const response = await checkEmail(data)
      if (response.data) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log(true)
      return false
    }
  }

  // Validate the entire form
  const validateForm = async () => {
    const newErrors = {}

    // First Name Validation
    if (!formData.firstName.trim())
      newErrors.firstName = 'First Name is required'

    // Last Name Validation
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required'

    // Email Validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    } else if ((await checkEmailAlredtExit())) {
      newErrors.email = 'Email already exists'
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character'
    }

    // Update Errors State
    setErrors(newErrors)

    // Return Validation Result
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    const isValid = await validateForm()
    if (!isValid) return

    const { firstName, lastName, email, password } = formData

    try {
      const response = await register({
        firstName,
        lastName,
        email,
        password,
        isEmailVerified: true,
        userType: 1,
      })
      if (response.data) {
        handelOpenLogin()
      }
    } catch (error) {
      console.error('register failed:', error)
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
          <h3 className="text-2xl text-start">Welcome To Central Wine</h3>
          <hr />
          <h3
            className="my-8 text-4xl font-bold"
            onClick={() => checkEmailAlredtExit('tst@gmail.com')}
          >
            Sign up
          </h3>
          <div className="flex flex-col gap-2 my-7">
            <div className="flex gap-5">
              <div className="w-full my-2">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 mx-2 text-gray-700 bg-white border-0 focus:outline-none peer placeholder:text-sm"
                    placeholder="First Name"
                    name="firstName"
                    onChange={(e) => handleChange(e)}
                  />
                  <div
                    className={`absolute inset-0 border  rounded-md pointer-events-none ${errors.firstName && 'border-red-500'}`}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs text-start">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="w-full my-2">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 mx-2 text-gray-700 bg-white border-0 focus:outline-none peer placeholder:text-sm"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={(e) => handleChange(e)}
                  />
                  <div
                    className={`absolute inset-0 border  rounded-md pointer-events-none ${errors.lastName && 'border-red-500'}`}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs text-start">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

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
                <p className="text-red-500 text-xs text-start">
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
                'SignUp'
              )}
            </button>
            <p>
              Already have an account?&nbsp;
              <span className="text-yellow-700 cursor-pointer" onClick={handelOpenLogin}>
                Login
              </span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SignUp
