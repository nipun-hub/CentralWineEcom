import React, { useContext, useState } from 'react'

import { ThemeContext } from '../../context/ThemeContext'
import { Button, Empty, Table, Tag } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  RightOutlined,
} from '@ant-design/icons'
import AccessoriesCard from '../../components/Cards/AccessoriesCard'
import CustomModelOne from '../../components/CustomModel/CustomModel'
import CustomModelViewProduct from '../../components/CustomModel/CustomModelViewProduct'
import CustomModelEditPassword from '../../components/CustomModel/CustomModelEditPassword'
import CustomModelEditName from '../../components/CustomModel/CustomModelEditName'
import CustomModelAddressBlock from '../../components/CustomModel/CustomModelAddressBlock'
import CustomModelNewPayment from '../../components/CustomModel/CustomModelNewPayment'
import { useGetOrderByUserQuery } from '../../features/api/orderSlice.js'
import { useSelector } from 'react-redux'
import { retry } from '@reduxjs/toolkit/query'
import { useGetAddressQuery } from '../../features/api/addressSlice.js'
import CustomModelDeleteAddress from '../../components/CustomModel/CustomModelDeleteAddress.jsx'
import { useGetPaymentsQuery } from '../../features/api/paymentSlice.js'
import CustomModelDeletePayment from '../../components/CustomModel/CustomModelDeletePayment.jsx'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Items',
    dataIndex: 'items',
    key: 'items',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
]

const MyAccount = ({ setCurrentSlide }) => {
  const { theme } = useContext(ThemeContext)
  const user = useSelector((state) => state.auth.userId)
  const cardColours = useSelector((state) => state.cardColours.colours)
  const userData = useSelector((state) => state.auth.data)
  const {
    data: myOrders,
    error: myOrdersError,
    isLoading: myOrdersLoading,
  } = useGetOrderByUserQuery(user)
  const { data: addressData, isLoading: loadingAddress } =
    useGetAddressQuery(user)
  const { data: paymentData, isLoading: gettingPayment } =
    useGetPaymentsQuery(user)

  const data = myOrders?.data?.docs.map((order) => ({
    key: order?._id,
    name: order?.shippingAddress?.fullName,
    mobile: order?.mobileNumber,
    address: order?.shippingAddress?.streetAddress,
    items: order?.products?.length,
    tags: [order?.status],
  }))

  const [activeAddress, setActiveAddress] = useState({})
  const [addressModelOpenType, setAddressModelOpenType] = useState('new')
  const [activePayment, setActivePayment] = useState({})
  const [paymentModelOpenType, setPaymentModelOpenType] = useState('new')

  // console.log(JSON.stringify(myOrders?.data?.docs))
  const myOrderHistoryProduct = myOrders?.data?.docs.flatMap((order) =>
    order.products.map((productItem) => productItem.product),
  )

  // dialog section

  const [showCustomModelOne, setShowCustomModelOne] = useState(false)
  const openCustomModelOne = (id) => {
    setShowCustomModelOne(true)
  }

  const [showCustomModelViewProduct, setShowCustomModelViewProduct] =
    useState(false)
  const openCustomModelViewProduct = (id) => {
    setShowCustomModelViewProduct(true)
  }

  const [showCustomModelEditName, setShowCustomModelEditName] = useState(false)
  const openCustomModelEditName = (id = null) => {
    setShowCustomModelEditName(true)
  }

  const [showCustomModelEditPassword, setShowCustomModelEditPassword] =
    useState(false)
  const openCustomModelEditPassword = (id = null) => {
    setShowCustomModelEditPassword(true)
  }

  const [showCustomModelAddressBlock, setShowCustomModelAddressBlock] =
    useState(false)
  const openCustomModelAddressBlock = (type = 'new', address = null) => {
    setAddressModelOpenType(type)
    address && setActiveAddress(address)
    setShowCustomModelAddressBlock(true)
  }

  const [showCustomModelNewPayment, setShowCustomModelNewPayment] =
    useState(false)
  const openCustomModelNewPayment = (type = 'new', payment = null) => {
    setPaymentModelOpenType(type)
    payment && setActivePayment(payment)
    setShowCustomModelNewPayment(true)
  }

  const [activeAddressDelete, setActiveAddressDelete] = useState({})
  const [showCustomModelDeleteAddress, setShowCustomModelDeleteAddress] =
    useState(false)
  const openCustomModelDeleteAddress = (address = null) => {
    address && setActiveAddressDelete(address)
    setShowCustomModelDeleteAddress(true)
  }

  const [activePaymentDelete, setActivePaymentDelete] = useState({})
  const [showCustomModelDeletePayment, setShowCustomModelDeletePayment] =
    useState(false)
  const openCustomModelDeletePayment = (payment = null) => {
    payment && setActivePaymentDelete(payment)
    setShowCustomModelDeletePayment(true)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    console.log(`Current page: ${page}`) // Log the current page when changed
  }

  return (
    <>
      {/* Personal Details section  */}
      <h3 className="text-3xl">Personal Details</h3>
      <p className="text-base opacity-60">
        Manage your name and contact info. These personal details are private
        and will not be displayed to other users
      </p>

      <div className="flex flex-col gap-5 mt-20">
        <div
          className="flex w-full justify-between items-center"
          onClick={openCustomModelEditName}
        >
          <span className="">Name</span>
          <span className=" text-xs">
            {userData?.firstName + ' ' + userData?.lastName}
          </span>
          <span className=" text-end text-3xl font-black">
            <EditOutlined />
          </span>
        </div>
        <hr />
        <div
          className="flex w-full justify-between items-center"
          onClick={openCustomModelEditPassword}
        >
          <span className="">Password</span>
          <span className=" text-xs">**********************</span>
          <span className=" text-end text-3xl font-black">
            <EditOutlined />
          </span>
        </div>
      </div>

      {/* Address Book section */}
      <div className="mt-28">
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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 justify-center justify-items-center">
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
                  style={{
                    backgroundColor: cardColours[randomNumber].colorDoct,
                  }} // Example color, replace dynamically if needed
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
          <div className="w-full flex items-center justify-center ">
            <Empty description={false} />
          </div>
        )}
      </div>

      {/* Payment Method section */}
      <div className="my-28">
        <div className="relative flex items-center justify-between">
          <div
            className="text-lg sm:text-3xl w-fit z-10"
            style={{ backgroundColor: theme.background }}
          >
            Payment Method
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
              onClick={() => openCustomModelNewPayment()}
            >
              <div className="hidden sm:inline">New</div>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 justify-center justify-items-center">
          {paymentData?.map((payment) => {
            const randomNumber = Math.floor(Math.random() * 5)
            return (
              <div
                key={payment._id}
                className="relative w-full max-w-[482px] rounded-2xl shadow-sm p-4 md:p-6 overflow-hidden min-h-[245px]"
              >
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: cardColours[randomNumber].color1 }}
                />

                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: cardColours[randomNumber].color2,
                    clipPath: 'circle(60% at 100% 25%)',
                  }}
                />

                <div
                  className="absolute top-4 right-10 w-5 h-5 rounded-full"
                  style={{
                    backgroundColor: cardColours[randomNumber].colorDoct,
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
                        <div className="text-xs mb-1 font-semibold">Name</div>
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
                        <div className="text-sm">{payment.cardType}</div>
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

                  <div className="absolute -bottom-3 right-0 flex gap-4 pe-5 text-white">
                    <button
                      className="p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors text-black"
                      aria-label="Edit"
                      onClick={() =>
                        openCustomModelNewPayment('update', payment)
                      }
                    >
                      <EditOutlined />
                    </button>
                    <button
                      className="p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors text-black"
                      aria-label="Delete"
                      onClick={() => openCustomModelDeletePayment(payment)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {paymentData?.length === 0 && (
          <div className="w-full flex items-center justify-center">
            <Empty description={false} />
          </div>
        )}
      </div>

      {/* Oder History section  */}
      <>
        <div className="relative flex items-center justify-between mb-10">
          <div
            className="text-lg sm:text-3xl w-fit z-10"
            style={{ backgroundColor: theme.background }}
          >
            Oder History
          </div>
          <div
            className="absolute bg-transparent h-0.5 rounded w-full z-0"
            style={{ backgroundColor: theme.textColor }}
          ></div>
          <div>
            <Button
              onClick={() => setCurrentSlide('OrderHistory')}
              className="font-semibold w-fit md:w-40"
              shape="round"
              icon={<ExportOutlined />}
              size="large"
            >
              <div className="hidden sm:inline">View All</div>
            </Button>
          </div>
        </div>

        {/*order tabel */}
        <Table columns={columns} dataSource={data} />
      </>

      {/* embed model  */}
      <CustomModelOne
        showCustomModelOne={showCustomModelOne}
        setShowCustomModelOne={setShowCustomModelOne}
      />
      <CustomModelViewProduct
        showCustomModelViewProduct={showCustomModelViewProduct}
        setShowCustomModelViewProduct={setShowCustomModelViewProduct}
      />
      <CustomModelEditName
        showCustomModel={showCustomModelEditName}
        setShowCustomModel={setShowCustomModelEditName}
        width="778px"
      />
      <CustomModelEditPassword
        showCustomModel={showCustomModelEditPassword}
        setShowCustomModel={setShowCustomModelEditPassword}
        width="778px"
      />
      <CustomModelAddressBlock
        showCustomModel={showCustomModelAddressBlock}
        setShowCustomModel={setShowCustomModelAddressBlock}
        width="778px"
        address={addressModelOpenType == 'update' ? activeAddress : null}
        type={addressModelOpenType} // new or update
      />
      <CustomModelNewPayment
        showCustomModel={showCustomModelNewPayment}
        setShowCustomModel={setShowCustomModelNewPayment}
        width="778px"
        payment={paymentModelOpenType == 'update' ? activePayment : null}
        type={paymentModelOpenType} // new or update
      />
      <CustomModelDeleteAddress
        showCustomModel={showCustomModelDeleteAddress}
        setShowCustomModel={setShowCustomModelDeleteAddress}
        address={activeAddressDelete}
      />

      <CustomModelDeletePayment
        showCustomModel={showCustomModelDeletePayment}
        setShowCustomModel={setShowCustomModelDeletePayment}
        payment={activePaymentDelete}
      />
    </>
  )
}

export default MyAccount
