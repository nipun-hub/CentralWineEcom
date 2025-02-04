import React, { useContext, useState } from 'react'
import { Button, Empty } from 'antd'
import { ThemeContext } from '../../context/ThemeContext'
import { useSelector } from 'react-redux'
import {
  useGetWishListItemsQuery,
  useRemoveFromWishListMutation,
} from '../../features/api/wishlistSlice'
import { useAddToCartMutation } from '../../features/api/cartSlice'
import { tostAlert } from '../../utils/notification'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner.jsx'
import { data } from 'autoprefixer'
import toast from 'react-hot-toast'
import { DeleteOutlined, ShareAltOutlined, ShoppingCartOutlined } from '@ant-design/icons'

const Favorite = () => {
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const userId = useSelector((state) => state.auth.userId)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const {
    data: wishListItems,
    error,
    isLoading,
  } = useGetWishListItemsQuery(userId)
  const [removeFromFavorite, { isLoading: isRemoving }] =
    useRemoveFromWishListMutation()

  console.log(wishListItems)

  const handleRemoveFromFavorite = async (productId) => {
    toast.promise(removeFromFavorite({ userId, productId }).unwrap(), {
      loading: 'Removing...',
      success: 'Item removed from favorite',
      error: 'Error removing item from favorite',
    })
  }

  const [addToCart] = useAddToCartMutation()
  const handleAddToCart = async (id) => {
    if (!userId) {
      tostAlert('error', 'User not logged in!')
      return
    }

    const data = { productId: id, quantity: 1, userId: userId }
    await addToCart(data)
  }

  const handleBecomeMemberButtonClick = () => {
    navigate('/my-account', { state: { type: 'Membership' } })
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <section
        style={{ backgroundColor: theme.background, color: theme.textColor }}
      >
        <div className="container mx-auto p-8">
          <div className="flex w-full justify-between">
            <Button type="link" href="/shop" style={{ color: theme.textColor }}>
              &larr; Back to Store
            </Button>
            <Button
              hoverable={"false"}
              className="py-6 bg-transparent"
              style={{ color: theme.textColor }}
              onClick={handleBecomeMemberButtonClick}
            >
              Become A Member <span className="-rotate-45 text-xl">&rarr;</span>
            </Button>
          </div>

          <div className="w-full my-20 pr-8 flex flex-col justify-center items-center gap-10">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <div className="w-full flex items-center justify-center">
                <Empty description={false} />
              </div>
            ) : wishListItems && wishListItems?.length ? (
              wishListItems?.map((item, index) => {
                const product = item.productId
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center sm:flex-row rounded-lg card-custom-shadow w-full p-4 gap-5"
                    style={{ backgroundColor: theme.cardBackground }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[200px] h-[200px] object-cover rounded"
                    />
                    <div
                      className="flex flex-col justify-between items-center sm:items-start text-center sm:text-left"
                      style={{ color: theme.textColor }}
                    >
                      <h3 className="text-3xl font-bold mb-4 w-full text-center sm:text-left">{product.name}</h3>

                      <div className="flex gap-5 items-center mb-4 sm:flex-row flex-col sm:items-start md:items-center">
                        <div className="text-2xl text-red-600 font-bold sm:text-4xl md:text-3xl">
                          <span className="mr-2">
                            $ {
                              product?.unitDiscount && product?.unitDiscount != 0 ?
                                (product?.unitPrice - (product?.unitPrice * product?.unitDiscount / 100)).toFixed(2)
                                : product?.unitPrice.toFixed(2)
                            }
                          </span>
                        </div>

                        {(product?.unitDiscount && product?.unitDiscount !== 0) ?
                          <span className="text-2xl sm:text-4xl md:text-3xl text-gray-900 font-semibold line-through opacity-80">
                            $ {product?.unitPrice.toFixed(2)}
                          </span>
                          : null
                        }

                        <div className="flex flex-wrap gap-2 sm:flex-nowrap md:flex-wrap">
                          {(product?.unitDiscount && product?.unitDiscount !== 0) ?
                            <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
                              {product?.discountName} ({product?.unitDiscount}% off)
                            </span>
                            : null
                          }
                        </div>
                      </div>

                      <div className='grid gap-2 mb-6'>
                        <span className="text-base opacity-50">
                          {product?.country?.name} - {product?.regions?.region}
                        </span>

                        <span className="text-base opacity-50">
                          Size: {product?.size?.name}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-5 p-5 mt-auto w-full justify-center sm:justify-start">
                        <span
                          className="flex items-center gap-2 text-xs text-red-500 cursor-pointer hover:text-red-700 transition-all duration-300"
                          onClick={() => handleRemoveFromFavorite(product._id)}
                        >
                          <DeleteOutlined className="text-base" />
                          Remove
                        </span>

                        <span
                          className="flex items-center gap-2 text-xs text-green-500 cursor-pointer hover:text-green-700 transition-all duration-300"
                          onClick={() => handleAddToCart(product._id)}
                        >
                          <ShoppingCartOutlined className="text-base" />
                          Add to Cart
                        </span>
                      </div>
                    </div>

                  </div>
                )
              })
            ) : (
              <div>
                <img
                  width={200}
                  src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-illustration-download-in-svg-png-gif-file-formats--online-shop-store-marketplace-states-pack-windows-interface-illustrations-9824477.png"
                  alt="Empty Favorite"
                />
                <p className="opacity-60">Your favorite is empty.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Favorite
