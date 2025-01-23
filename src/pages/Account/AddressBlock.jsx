import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { Button, Empty } from 'antd'
import CustomModelAddressBlock from '../../components/CustomModel/CustomModelAddressBlock'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useGetAddressQuery } from '../../features/api/addressSlice.js'
import { useSelector } from 'react-redux'
import CustomModelDeleteAddress from '../../components/CustomModel/CustomModelDeleteAddress.jsx'

const AddressBlock = () => {
  const { theme } = useContext(ThemeContext)
  const userId = useSelector((state) => state.auth.userId)
  const cardColours = useSelector((state) => state.cardColours.colours)
  const { data: addressData, isLoading: loadingAddress } =
    useGetAddressQuery(userId)

  const [activeAddress, setActiveAddress] = useState({})
  const [addressModelOpenType, setAddressModelOpenType] = useState('new')

  const [showCustomModelAddressBlock, setShowCustomModelAddressBlock] =
    useState(false)
  const openCustomModelAddressBlock = (type = 'new', address = null) => {
    setAddressModelOpenType(type)
    address && setActiveAddress(address)
    setShowCustomModelAddressBlock(true)
  }

  const [activeAddressDelete, setActiveAddressDelete] = useState({})
  const [showCustomModelDeleteAddress, setShowCustomModelDeleteAddress] =
    useState(false)
  const openCustomModelDeleteAddress = (address = null) => {
    address && setActiveAddressDelete(address)
    setShowCustomModelDeleteAddress(true)
  }

  return (
    <>
      {/* Address Book section */}
      <div className="relative flex items-center justify-between">
        <div
          className="text-lg sm:text-3xl w-fit z-10"
          style={{ backgroundColor: theme.background }}
        >
          Address Book
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
            onClick={() => openCustomModelAddressBlock()}
          >
            <div className="hidden sm:inline">New</div>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 mt-10 justify-center justify-items-center">
        {addressData?.map((address) => {
          const randomNumber = Math.floor(Math.random() * 5)
          return (
            <div
              key={address._id}
              className="relative w-full max-w-[482px] rounded-2xl shadow-sm p-4 md:p-6 overflow-hidden min-h-[245px]"
            >
              {/* Background layers */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: cardColours[randomNumber].color1 }} // Example color, replace with dynamic if needed
              />

              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: cardColours[randomNumber].color2,
                  clipPath: 'circle(60% at 100% 25%)',
                }}
              />

              <div
                className="absolute top-4 right-4 w-5 h-5 rounded-full"
                style={{ backgroundColor: cardColours[randomNumber].colorDoct }} // Example color, replace dynamically if needed
              />

              {/* Content */}
              <div className="relative z-10 p-5">
                <h2 className="text-sm sm:text-lg font-bold text-black mb-4">
                  {address.fullName}
                </h2>

                <div className="space-y-1.5 text-gray-600 text-sm  sm:text-lg font-bold flex flex-col gap-4">
                  <p>{address.streetAddress}</p>
                  {address.additionalAddress && (
                    <p>{address.additionalAddress}</p>
                  )}
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                </div>

                <div className="absolute -bottom-3 right-0 flex gap-4 pe-5">
                  <button
                    className="p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors text-black"
                    aria-label="Edit"
                    onClick={() =>
                      openCustomModelAddressBlock('update', address)
                    }
                  >
                    <EditOutlined />
                  </button>
                  <button
                    className="p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors text-black"
                    aria-label="Delete"
                    onClick={() => openCustomModelDeleteAddress(address)}
                  >
                    <DeleteOutlined />
                  </button>
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
      <CustomModelAddressBlock
        showCustomModel={showCustomModelAddressBlock}
        setShowCustomModel={setShowCustomModelAddressBlock}
        width="778px"
        address={addressModelOpenType == 'update' ? activeAddress : null}
        type={addressModelOpenType} // new or update
      />
      <CustomModelDeleteAddress
        showCustomModel={showCustomModelDeleteAddress}
        setShowCustomModel={setShowCustomModelDeleteAddress}
        address={activeAddressDelete}
      />
    </>
  )
}

export default AddressBlock
