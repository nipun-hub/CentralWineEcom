import React from 'react'
import { Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const CustomModelRedirectMembership = ({
  showCustomModel,
  setShowCustomModel,
  width = 400,
}) => {
  const navigate = useNavigate()

  const handleCancel = () => {
    setShowCustomModel(false)
  }

  const handleRedirect = () => {
    // Navigate to the membership page
    navigate('/membership') // Adjust this path according to your app's routing
    setShowCustomModel(false)
  }



  return (
    <Modal
      title={null}
      open={showCustomModel}
      onCancel={handleCancel}
      footer={null}
      width={width}
      centered
      className="p-0"
      style={{ padding: '0' }}
    >
      <div className="p-8 rounded-lg text-center w-full">
        <div className="flex flex-col items-center">
          <ExclamationCircleOutlined className="text-red-600 text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">
            Access denied
          </h3>
          <p className="text-sm text-gray-600 mt-2 mb-6">
            You need to be a registered member to access this page. Please sign
            up to proceed.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          {/*<Button shape="round" onClick={handleCancel}>*/}
          {/*  Ok*/}
          {/*</Button>*/}
          {/*<Button*/}
          {/*  type="primary"*/}
          {/*  danger*/}
          {/*  shape="round"*/}
          {/*  onClick={handleRedirect}*/}
          {/*  className="bg-red-600 text-white hover:bg-red-500"*/}
          {/*>*/}
          {/*  Go to Membership*/}
          {/*</Button>*/}
        </div>
      </div>
    </Modal>
  )
}

export default CustomModelRedirectMembership
