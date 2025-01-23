import React from 'react'
import { Button, Modal } from 'antd'
import { ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { useDeleteAddressMutation } from '../../features/api/addressSlice.js'
import { useSelector } from 'react-redux'

const CustomModelDeleteAddress = ({
  showCustomModel,
  setShowCustomModel,
  width = 400,
  address,
}) => {
  const userId = useSelector((state) => state.auth.userId)
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation()

  const handleCancel = () => {
    setShowCustomModel(false)
  }

  const handelDelete = async () => {
    const data = {
      userId: userId,
      addressId: address._id,
    }
    try {
      await deleteAddress(data)
      handleCancel()
    } catch (e) {
      console.log(e)
    }
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
            Confirm Address Deletion
          </h3>
          <p className="text-sm text-gray-600 mt-2 mb-6">
            Are you sure you want to delete this address? This action is
            irreversible.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button shape="round" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            danger
            shape="round"
            onClick={handelDelete}
            className="bg-red-600 text-white hover:bg-red-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingOutlined /> &nbsp;
                'Deleting'
              </>
            ) : 'Delete'
            }
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CustomModelDeleteAddress
