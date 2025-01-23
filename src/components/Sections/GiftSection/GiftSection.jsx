import React, { useContext, useState } from 'react'
import AccessoriesCard from '../../Cards/AccessoriesCard'
import { ThemeContext } from '../../../context/ThemeContext'
import CustomModelOne from '../../CustomModel/CustomModel'
import CustomModelViewProduct from '../../CustomModel/CustomModelViewProduct'
import { useGetGreatForGiftQuery } from '../../../features/api/productSlice'
import { Empty } from 'antd'
import CoustomPagination from '../../pagination/CoustomPagination.jsx'

const GiftSection = () => {
  const { theme } = useContext(ThemeContext)
  const [currentpage, setCurrentPage] = useState(1)
  const {
    data: getGreatForGift,
    error,
    isLoading,
  } = useGetGreatForGiftQuery({ limit: 4, page: currentpage })
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

  return (
    <section
      className="w-full py-24"
      id="GreatForGift"
      style={{
        background: theme.sectionBackground,
        color: theme.topicTextColor,
      }}
    >
      {/* Section Heading */}
      <h2 className="text-center text-4xl font-Merriweather font-bold leading-lg  mb-16">
        Great For Gift
      </h2>

      {/* Card Grid */}
      <div className="px-6 md:px-32 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 items-center justify-items-center">
        {getGreatForGift?.docs?.map((product, index) => (
          <AccessoriesCard
            product={product}
            OpenModel={openCustomModelOne}
            OpenModelViewProduct={openCustomModelViewProduct}
            id={product._id}
            key={index}
            image={product.image}
            name={product.name}
            country={product.country.name}
            originalPrice={
              product.unitDiscount != 0 && product.unitDiscount
                ? product.unitPrice
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
      {!getGreatForGift?.docs?.length > 0 && (
        <div className="w-full flex items-center justify-center">
          <Empty description={false} />
        </div>
      )}
      <div className="px-6 md:px-32 w-full flex mt-8 justify-end">
        {getGreatForGift?.docs?.length > 0 && (
          <CoustomPagination
            currentPage={currentpage}
            totalPages={getGreatForGift?.totalPages}
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

export default GiftSection
