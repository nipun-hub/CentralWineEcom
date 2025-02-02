import React, { useContext, useEffect, useState } from 'react'
import BestSaleCard from '../../Cards/BestSaleCard'
import { ThemeContext } from '../../../context/ThemeContext'
import CustomModelOne from '../../CustomModel/CustomModel'
import CustomModelViewProduct from '../../CustomModel/CustomModelViewProduct'
import { useGetBestSaleProductQuery } from '../../../features/api/productSlice'
import { Empty } from 'antd'
import CoustomPagination from '../../pagination/CoustomPagination.jsx'

const BestSaleSection = () => {
  const { theme } = useContext(ThemeContext)
  const [limit, setLimit] = useState(4)
  const [currentpage, setCurrentPage] = useState(1)
  const {
    data: getBestSaleProduct,
    error,
    isLoading,
  } = useGetBestSaleProductQuery({ limit, page: currentpage })
  const [activeProduct, setActiveProduct] = useState()

  const [showCustomModelOne, setShowCustomModelOne] = useState(false)

  const openCustomModelOne = (id) => {
    setShowCustomModelOne(true)
  }

  const [showCustomModelViewProduct, setShowCustomModelViewProduct] =
    useState(false)

  const openCustomModelViewProduct = (product) => {
    setActiveProduct(product)
    setShowCustomModelViewProduct(true)
  }

  // useEffect(async () => {
  //   await getBestSaleProduct
  // }, [currentpage, limit])
  console.log(getBestSaleProduct)

  return (
    <section
      className="w-full py-24"
      id="BestSale"
      style={{
        background: theme.sectionBackground,
        color: theme.topicTextColor,
      }}
    >
      {/* Best Sale Heading */}
      <h2 className="text-center text-3xl font-Merriweather font-bold leading-lg">
        Best Sale
      </h2>

      {/* Card Grid */}
      <div className="px-6 md:px-32 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 items-center justify-items-center animate-fade-in">
        {getBestSaleProduct?.docs?.map((product, index) => (
          <BestSaleCard
            product={product}
            openCustomModelOne={openCustomModelOne}
            openCustomModelViewProduct={openCustomModelViewProduct}
            id={product._id}
            key={index}
            image={product?.image}
            name={product?.name}
            country={product?.country?.name}
            originalPrice={
              product?.unitDiscount != 0 && product?.unitDiscount
                ? product?.unitPrice
                : null
            }
            salePrice={
              product.unitDiscount != 0 && product.unitDiscount
                ? product.unitPrice -
                (product.unitPrice / 100) * product.unitDiscount
                : product.unitPrice
            }
          />
        ))}
      </div>
      {!getBestSaleProduct?.docs?.length > 0 && (
        <div className="w-full flex items-center justify-center">
          <Empty description={false} />
        </div>
      )}
      <div className="px-6 md:px-32 w-full flex mt-8 justify-end">
        {getBestSaleProduct?.docs?.length > 0 && (
          <CoustomPagination
            currentPage={currentpage}
            totalPages={getBestSaleProduct?.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
      <CustomModelOne
        showCustomModelOne={showCustomModelOne}
        setShowCustomModelOne={setShowCustomModelOne}
      />
      <CustomModelViewProduct
        showCustomModelViewProduct={showCustomModelViewProduct}
        setShowCustomModelViewProduct={setShowCustomModelViewProduct}
        product={activeProduct}
      />
    </section>
  )
}

export default BestSaleSection
