import React, { useContext, useState } from 'react'
import { Button, Empty, Input, Radio, Space } from 'antd'
import { ThemeContext } from '../../context/ThemeContext'
import {
  useClearCartMutation,
  useGetCartItemsQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from '../../features/api/cartSlice'
import { useSelector } from 'react-redux'
import { useAddToWishListMutation } from '../../features/api/wishlistSlice'
import { useCheckoutMutation } from '../../features/api/orderSlice'
import { useNavigate } from 'react-router-dom'
import CustomModelCheckout from '../../components/CustomModel/CustomModelCheckout.jsx'
import Spinner from '../../components/Spinner/Spinner.jsx'
import toast from 'react-hot-toast'
import CustomModelRedirectMembership from '../../components/CustomModel/CustomModelRedirectMembership.jsx'
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { getOrderData } from '../../utils/cartData.js'
import { useEffect } from 'react'

const Cart = () => {
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const userId = useSelector((state) => state.auth.userId)

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const { data: cartItem, error, isLoading } = useGetCartItemsQuery(userId)
  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation()
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation()
  const [clearCart, { isLoading: isClearing }] = useClearCartMutation()
  const [addToWishList] = useAddToWishListMutation()
  const [checkout, { isLoading: isCheckouting }] = useCheckoutMutation()
  const [isPack, setIsPack] = useState({})

  const [orderData, setOrderData] = useState(null);


  const [productCount, setProductCount] = useState({})
  const handleUpdateProductCount = async (productId, value, update = false) => {
    if (value < 1) return
    setProductCount({
      ...productCount,
      [productId]: value,
    })
    if (update) {
      await updateCart({
        userId,
        productId,
        quantity: value,
      })
    }
  }


  const handelCheckout = async () => {
    const response = await checkout(checkoutData)
    if (response?.data?.success) {
      console.log('clear')
      await clearCart(userId)
    }
  }

  const handleAddToWishlist = async (id) => {
    const data = { productId: id, userId: userId }
    await addToWishList(data)
  }

  const handleUpdateIsPack = (id, isPack, packSize) => {
    setIsPack((prevIsPack) => ({
      ...prevIsPack,
      [id]: {
        isPack: isPack,
        packSize: packSize,
      },
    }))
  }

  useEffect(() => {
    const fetchOrderData = async () => {
      if (cartItem && cartItem.length > 0) {
        const data = await getOrderData({ cartItem, isPack });
        setOrderData(data);
        console.log(data)
      }
    };
    fetchOrderData();
  }, [cartItem, isPack]); // Runs when cartItem or isPack changes


  let checkoutData = {
    userId,
    totalAmount: orderData?.total,
    products: cartItem?.map((item) => ({
      product: item.productId._id,
      quantity: item.quantity,
      isPack: isPack[item.productId._id]?.isPack || false,
      packSize: isPack[item.productId._id]?.isPack
        ? isPack[item.productId._id]?.packSize || 0
        : 0,
    })),
  }

  const [showCustomModelMembershipWorn, setShowCustomModelMembershipWorn] =
    useState(false)
  const openCustomModelMembershipWorn = (id) => {
    setShowCustomModelMembershipWorn(true)
  }

  const [showCustomModelCheckout, setShowCustomModelCheckout] = useState(false)
  const openCustomModelCheckout = (id = null) => {
    setShowCustomModelCheckout(true)
  }

  const handleBecomeMemberButtonClick = () => {
    if (isAuthenticated) {
      navigate('/my-account', { state: { type: 'Membership' } })
    } else {
      openCustomModelMembershipWorn()
    }
  }

  const removeItemFromCart = ({ userId, productId }) => {
    toast.promise(
      removeFromCart({
        userId,
        productId,
      }).unwrap(),
      {
        loading: 'Removing...',
        success: 'Item removed from cart',
        error: 'Error removing item from cart',
      },
    )
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <section
        style={{ backgroundColor: theme.background, color: theme.textColor }}
      >
        <div className="container mx-auto py-8 px-10">
          <div className="flex w-full justify-between">
            <Button type="link" href="/shop" style={{ color: theme.textColor }}>
              &larr; Back to Store
            </Button>
            <Button
              hoverable={"false"}
              className="py-6 bg-transparent hidden sm:flex hover:!bg-transparent hover:scale-105"
              style={{ color: theme.textColor }}
              onClick={handleBecomeMemberButtonClick}
            >
              Become A Member <span className="-rotate-45 text-xl">&rarr;</span>{' '}
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row my-20">
            {/* Cart Items */}
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <div className="flex flex-col items-center justify-center w-full">
                <div className="w-full flex items-center justify-center">
                  <Empty description={false} />
                </div>
              </div>
            ) : cartItem && cartItem?.length > 0 ? (
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-5">
                {cartItem?.map((item, index) => {
                  const product = item?.productId
                  const productId = product._id
                  if (!productCount[productId]) {
                    handleUpdateProductCount(productId, item.quantity)
                  }
                  return (
                    <div key={index} className="w-full">
                      <div className="w-full flex flex-col gap-10">
                        <div
                          className="flex flex-col sm:flex-row gap-5 items-center rounded-lg card-custom-shadow p-4"
                          style={{ backgroundColor: theme.cardBackground }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-[200px] h-[200px] object-cover rounded"
                          />
                          <div
                            className="flex flex-col justify-between w-full"
                            style={{ color: theme.textColor }}
                          >
                            <h3 className="text-2xl font-semibold mb-2">
                              {product.name}
                            </h3>

                            {/* is pack show pack details and is bottle show  bottle details */}
                            {product?.isPack && isPack[productId]?.isPack ? (
                              <div className="flex gap-5 items-center mb-4 sm:flex-row flex-col sm:items-start md:items-center">
                                <div className="text-xl text-red-600 font-bold sm:text-2xl md:text-xl">
                                  <span className="mr-2">
                                    ${' '}
                                    {product?.packDiscount &&
                                      product?.packDiscount != 0
                                      ? (
                                        product?.pack?.find(
                                          (pack) =>
                                            pack.packSize ===
                                            isPack[productId]?.packSize,
                                        )?.packPrice -
                                        (product?.pack.find(
                                          (pack) =>
                                            pack.packSize ===
                                            isPack[productId]?.packSize,
                                        )?.packPrice *
                                          product?.packDiscount) /
                                        100
                                      ).toFixed(2)
                                      : product?.pack
                                        ?.find(
                                          (pack) =>
                                            pack.packSize ===
                                            isPack[productId]?.packSize,
                                        )
                                        ?.packPrice.toFixed(2)}
                                  </span>
                                </div>

                                {product?.packDiscount &&
                                  product?.packDiscount !== 0 ? (
                                  <span className="text-xl sm:text-2xl md:text-xl text-gray-900 font-semibold line-through opacity-80">
                                    ${' '}
                                    {product?.pack
                                      ?.find(
                                        (pack) =>
                                          pack.packSize ===
                                          isPack[productId]?.packSize,
                                      )
                                      ?.packPrice.toFixed(2)}
                                  </span>
                                ) : null}
                              </div>
                            ) : (
                              <div className="flex gap-5 items-center mb-4 sm:flex-row flex-col sm:items-start md:items-center">
                                <div className="text-xl text-red-600 font-bold sm:text-2xl md:text-xl">
                                  <span className="mr-2">
                                    ${' '}
                                    {product?.unitDiscount &&
                                      product?.unitDiscount != 0
                                      ? (
                                        product?.unitPrice -
                                        (product?.unitPrice *
                                          product?.unitDiscount) /
                                        100
                                      ).toFixed(2)
                                      : product?.unitPrice.toFixed(2)}
                                  </span>
                                </div>

                                {product?.unitDiscount &&
                                  product?.unitDiscount !== 0 ? (
                                  <span className="text-xl sm:text-2xl md:text-xl text-gray-900 font-semibold line-through opacity-80">
                                    $ {product?.unitPrice.toFixed(2)}
                                  </span>
                                ) : null}
                              </div>
                            )}

                            <span className="opacity-50 text-base">
                              {product.brandName}
                            </span>

                            {product?.isPack && product?.pack.length > 0 && (
                              <div>
                                <Radio.Group
                                  className="text-center flex justify-center gap-1"
                                  defaultValue={
                                    checkoutData?.products?.some(
                                      (p) =>
                                        p.product === productId && p.isPack,
                                    )
                                      ? 'pack'
                                      : 'Bottle'
                                  }
                                  onChange={(e) => {
                                    handleUpdateIsPack(
                                      productId,
                                      e.target.value === 'pack',
                                      product?.pack[0]?.packSize,
                                    )
                                  }}
                                  size="small"
                                >
                                  {['Bottle', 'pack'].map((deluvary) => (
                                    <Radio.Button
                                      block={"true"}
                                      className="w-full mt-3 mb-4"
                                      value={deluvary}
                                      key={deluvary}
                                      id={deluvary}
                                      size="small"
                                    >
                                      {deluvary}
                                    </Radio.Button>
                                  ))}
                                </Radio.Group>
                                {product?.isPack &&
                                  isPack[productId]?.isPack && (
                                    <Radio.Group
                                      className="mb-3"
                                      name="radiogroup"
                                      defaultValue={product?.pack[0]?.packSize}
                                      onChange={(e) => {
                                        handleUpdateIsPack(
                                          productId,
                                          true,
                                          e.target.value,
                                        )
                                      }}
                                      options={product?.pack?.map((pack) => ({
                                        label: pack.packSize,
                                        value: pack.packSize,
                                      }))}
                                    />
                                  )}
                              </div>
                            )}

                            <div className="flex items-center self-center">
                              <button
                                className="px-4 py-2 hover:opacity-90"
                                style={{
                                  backgroundColor: theme.textColor,
                                  color: theme.background,
                                }}
                                onClick={() =>
                                  handleUpdateProductCount(
                                    productId,
                                    (productCount[productId] || item.quantity) -
                                    1,
                                    true,
                                  )
                                }
                              >
                                -
                              </button>
                              <span
                                className="px-4 py-2"
                                style={{
                                  backgroundColor: theme.textColor,
                                  color: theme.background,
                                }}
                              >
                                {productCount[productId]}
                              </span>
                              <button
                                className="px-4 py-2 hover:opacity-90"
                                style={{
                                  backgroundColor: theme.textColor,
                                  color: theme.background,
                                }}
                                onClick={() =>
                                  handleUpdateProductCount(
                                    productId,
                                    (productCount[productId] || item.quantity) +
                                    1,
                                    true,
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-5 mt-5 w-full justify-center">
                              <span
                                className="flex items-center gap-2 text-xs text-red-500 cursor-pointer hover:text-red-700 transition-all duration-300"
                                onClick={() =>
                                  removeItemFromCart({ userId, productId })
                                }
                              >
                                <DeleteOutlined className="text-base" />
                                Remove
                              </span>
                              <span
                                className="flex items-center gap-2 text-xs text-green-500 cursor-pointer hover:text-green-700 transition-all duration-300"
                                onClick={() => handleAddToWishlist(productId)}
                              >
                                <ShoppingCartOutlined className="text-base" />
                                Add to favorite
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full">
                <img
                  width={200}
                  src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-illustration-download-in-svg-png-gif-file-formats--online-shop-store-marketplace-states-pack-windows-interface-illustrations-9824477.png"
                  alt="Empty Cart"
                />
                <p>Your cart is empty.</p>
              </div>
            )}

            {cartItem && cartItem?.length > 0 && (
              <div className="w-full lg:w-1/3 p-6 ">
                <div className="flex justify-between mb-5 text-sm ">
                  <div>Order Summary</div>
                  <div>${orderData?.subtotal | 0}</div>
                </div>
                <div className="flex justify-between mb-5 text-xs text-neutral-400">
                  <div>Membership Discount</div>
                  <div>{orderData?.memberDiscount?.percentage | 0}%</div>
                </div>

                {orderData?.bottleDiscount > 0 ? (
                  <div className="flex justify-between mb-5 text-xs text-neutral-400">
                    <div>Quantity Discount</div>
                    <div>${orderData?.bottleDiscount | 0}</div>
                  </div>
                ) : (
                  <div className="flex justify-between mb-5 text-xs text-neutral-400">
                    <div>Special Discount</div>
                    <div>${orderData?.specialDiscount | 0}</div>
                  </div>
                )}

                <div className="flex justify-between mb-5 text-xs text-neutral-400">
                  <div>Tax</div>
                  <div>${orderData?.tax?.tax | 0}</div>
                </div>
                <div className="flex justify-between mb-5 text-xs text-neutral-400">
                  <div>Total Items</div>
                  <div>{orderData?.totalItemQuantity | 0}</div>
                </div>
                <div className="flex justify-between mb-5 text-xs text-neutral-400">
                  <div>Total</div>
                  <div>${orderData?.total | 0}</div>
                </div>

                <Space.Compact
                  style={{
                    width: '100%',
                  }}
                >
                  <Input placeholder="Enter promo code" />
                  <span className="text-sm py-2 px-4 rounded-e-lg bg-black text-white before:bg-black hover:bg-black">
                    Submit
                  </span>
                </Space.Compact>
                <hr />
                <div
                  className="w-full mt-4 bg-black text-white py-3 rounded-md text-center hover:opacity-90"
                  // onClick={() => handelCheckout()}
                  onClick={openCustomModelCheckout}
                >
                  {isCheckouting ? 'Loading..' : 'Checkout'}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <CustomModelCheckout
        showCheckoutModal={showCustomModelCheckout}
        setShowCheckoutModal={setShowCustomModelCheckout}
        width="778px"
        data={checkoutData}
      />
      <CustomModelRedirectMembership
        showCustomModel={showCustomModelMembershipWorn}
        setShowCustomModel={setShowCustomModelMembershipWorn}
      />
    </>
  )
}

export default Cart
