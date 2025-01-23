import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { Empty, Table, Tag } from 'antd'
import AccessoriesCard from '../../components/Cards/AccessoriesCard'
import CustomModelOne from '../../components/CustomModel/CustomModel'
import CustomModelViewProduct from '../../components/CustomModel/CustomModelViewProduct'
import { useSelector } from 'react-redux'
import { useGetOrderByUserQuery } from '../../features/api/orderSlice.js'

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

const OrderHistory = () => {
  const { theme } = useContext(ThemeContext)
  const user = useSelector((state) => state.auth.userId)
  const {
    data: myOrders,
    error: myOrdersError,
    isLoading: myOrdersLoading,
  } = useGetOrderByUserQuery(user)

  const data = myOrders?.data?.docs.map((order) => ({
    key: order._id,
    name: order?.shippingAddress?.fullName,
    mobile: order?.mobileNumber,
    address: order?.shippingAddress?.streetAddress,
    items: order?.products?.length,
    tags: [order?.status],
  }))

  // console.log(JSON.stringify(myOrders?.data?.docs))
  const myOrderHistoryProduct = myOrders?.data?.docs.flatMap((order) =>
    order.products.map((productItem) => productItem.product),
  )
  const [showCustomModelOne, setShowCustomModelOne] = useState(false)

  const openCustomModelOne = (id) => {
    setShowCustomModelOne(true)
  }

  const [showCustomModelViewProduct, setShowCustomModelViewProduct] =
    useState(false)

  const openCustomModelViewProduct = (id) => {
    setShowCustomModelViewProduct(true)
  }

  return (
    <>
      <>
        <div className="relative flex items-center justify-between mb-5">
          <div
            className="text-3xl w-fit z-10"
            style={{ backgroundColor: theme.background }}
          >
            Oder History
          </div>
          <div
            className="absolute bg-transparent h-0.5 rounded w-full z-0"
            style={{ backgroundColor: theme.textColor }}
          ></div>
        </div>

        <Table columns={columns} dataSource={data} />
      </>

      <CustomModelOne
        showCustomModelOne={showCustomModelOne}
        setShowCustomModelOne={setShowCustomModelOne}
      />
      <CustomModelViewProduct
        showCustomModelViewProduct={showCustomModelViewProduct}
        setShowCustomModelViewProduct={setShowCustomModelViewProduct}
      />
    </>
  )
}

export default OrderHistory
