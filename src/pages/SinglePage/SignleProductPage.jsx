import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import Spinner from '../../components/Spinner/Spinner.jsx'
import AccessoriesSection from '../../components/Sections/AccessoriesSection/AccessoriesSection'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useGetProductByIdQuery } from '../../features/api/productSlice'
import {
  useAddToCartMutation,
  useUpdateCartMutation,
} from '../../features/api/cartSlice'
import { useSelector } from 'react-redux'
import { Card, Rate } from 'antd'

const SingleProduct = () => {
  const { theme } = useContext(ThemeContext)
  const location = useLocation()
  const navigate = useNavigate()

  const { id } = location.state || {}

  if (!id) {
    return <Navigate to="/not-found" />
  }

  const [quantity, setQuantity] = useState(1)
  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const userId = useSelector((state) => state.auth.userId)
  const {
    data: product,
    isLoading: isGettingProduct,
    isError,
    error,
  } = useGetProductByIdQuery(id)
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation()

  console.log(product)

  const [addToCart] = useAddToCartMutation()
  const handleAddToCart = async (id) => {
    const data = { productId: id, quantity: quantity, userId: userId }
    await addToCart(data)
  }

  const handleCartUpdate = async (id) => {
    const data = { productId: id, quantity: quantity, userId: userId }
    await addToCart(data)
  }

  if (isGettingProduct) return <Spinner />

  const handleBecomeMemberButtonClick = () => {
    navigate('/my-account', { state: { type: 'Membership' } })
  }

  console.log(product)

  return (
    <>
      <section
        className="min-h-screen"
        style={{ backgroundColor: theme.background, color: theme.textColor }}
      >
        <div className="container mx-auto px-8 py-12">
          {product ? (
            <div className="flex flex-col md:flex-row items-center">
              {/* Product Image */}
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={product?.data?.image} // Replace with your image path
                  alt={product?.data?.name}
                  className="container w-96 h-auto object-cover"
                />
              </div>

              {/* Product Information */}
              <div className="md:w-1/2 pl-12 mt-20 flex flex-col items-center">
                <div>
                  <Card className="mb-10  shadow-lg rounded-lg p-6 border border-gray-200">
                    {/* Star Rating */}
                    {/* <div className="flex justify-center mb-4">
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={product?.data?.rating / 20}
                        className="text-yellow-500"
                      />
                    </div> */}

                    <div
                      className="text-xs mb-4 text-center"
                      style={{ color: theme.textColor }}
                    >
                      <span className="opacity-60">
                        20% Off For Paid Member
                      </span>
                      <span
                        onClick={handleBecomeMemberButtonClick}
                        className="cursor-pointer text-blue-500 hover:underline"
                      >
                        {' '}
                        Become Member
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold mb-4 text-center">
                      {product?.data?.name}
                    </h1>
                    <p
                      className="text-xs opacity-60 mb-6 max-w-[505px] text-center"
                      style={{ color: theme.textColor }}
                    >
                      {product?.data?.description}
                    </p>

                    <div className="mb-4 text-2xl font-semibold flex gap-5 justify-center opacity-60">
                      <span style={{ color: theme.red500 }}>
                        ${product?.data?.unitDiscount &&
                          product?.data?.unitDiscount != 0
                          ? product?.data?.unitPrice -
                          ((product?.data?.unitPrice *
                            product?.data?.unitDiscount) /
                            100).toFixed(2)
                          : product?.data?.unitPrice.toFixed(2)}
                      </span>
                      {product?.data?.unitDiscount &&
                        product?.data?.unitDiscount !== 0 ? (
                        <span
                          className="line-through"
                          style={{ color: theme.textColor }}
                        >
                          $ {product?.data?.unitPrice.toFixed(2)}
                        </span>
                      ) : null}
                    </div>

                    <div
                      className="mb-2 text-lg font-semibold flex gap-4 justify-center"
                      style={{ color: theme.textColor }}
                    >
                      <span>For Paid Member</span>
                      <span className="opacity-60">
                        ${' '}
                        {(product?.data?.unitPrice -
                          (product?.data?.unitPrice * 20) / 100).toFixed(2)}
                      </span>
                    </div>

                    {product?.data?.rating && (
                      <div
                        className="text-xs mb-2 text-center"
                        style={{ color: theme.textColor }}
                      >
                        <span className="opacity-60">
                          Wine Rating : {product?.data?.rating}
                        </span>
                      </div>
                    )}

                    <div className="mb-3">
                      {product?.data?.inStock ? (
                        <div className="flex gap-5 items-center bg-green-100 rounded-full px-4 py-1">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                          <span className="text-base font-extrabold opacity-60">
                            In Stock Items {product.qtyOnHand}
                          </span>
                        </div>
                      ) : (
                        <div className="flex gap-5 items-center bg-red-100 rounded-full px-4 py-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          </span>
                          <span className="text-base font-extrabold opacity-60">
                            Out Of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quantity & Add to Cart */}
                    <div className="flex  gap-3 justify-evenly mb-6 items-center">
                      <div className="text-base w-44 text-center text-gray-400 bg-gray-100 p-2 rounded-lg">
                        {product?.data?.size?.name}
                      </div>
                      <div className="w-32">
                        <div className="flex items-center border border-black rounded-lg bg-black text-white p-2">
                          <button
                            onClick={decrementQuantity}
                            className="px-3 py-1 bg-black rounded-l-lg hover:bg-gray-900 text-xl"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x border-black">
                            {quantity}
                          </span>
                          <button
                            onClick={incrementQuantity}
                            className="px-3 py-1 bg-black rounded-r-lg hover:bg-gray-900 text-xl"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      className="py-5 px-6 rounded-lg mb-8 transition-all w-full shadow-md hover:shadow-lg transform hover:scale-105"
                      style={{
                        backgroundColor: theme.buttonBackground,
                        color: theme.buttonText,
                      }}
                      onClick={() => handleAddToCart(product?.data?._id)}
                    >
                      Add to cart
                    </button>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex justify-center"
              style={{ color: theme.textColor }}
            >
              <p>Product Not Found!</p>
            </div>
          )}

          <Card className="p-8 bg-white shadow-md rounded-lg w-full max-w-5xl mx-auto mt-10">
            {/* Product Details */}
            <h2 className="text-lg font-semibold text-gray-700 mb-6 border-b pb-2">
              Product Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                { label: 'Category', value: product?.data?.categories?.name },
                {
                  label: 'Varietal',
                  value: product?.data?.subCategories?.name,
                },
                { label: 'ABV', value: product?.data?.abv },
                { label: 'Vintage', value: product?.data?.vintage?.year },
                { label: 'Country', value: product?.data?.country?.name },
                { label: 'Region', value: product?.data?.regions?.region },
                { label: 'Sub Region', value: product?.data?.subRegions?.name },
                { label: 'Dryness', value: product?.data?.dryness?.name },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <span className="text-sm text-gray-500 font-medium">
                    {item.label}
                  </span>
                  <span className="text-base font-semibold text-gray-700">
                    {item.value || 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <AccessoriesSection title="Suggested Items" />
        </div>
      </section>
    </>
  )
}

export default SingleProduct
