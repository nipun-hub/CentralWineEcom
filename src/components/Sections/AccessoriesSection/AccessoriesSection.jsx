import React, { useContext, useState } from 'react'
import AccessoriesCard from '../../Cards/AccessoriesCard'
import { ThemeContext } from '../../../context/ThemeContext'
import CustomModelOne from '../../CustomModel/CustomModel'
import CustomModelViewProduct from '../../CustomModel/CustomModelViewProduct'
import { useGetAllAccessoriesQuery } from '../../../features/api/productSlice'
import { Empty } from 'antd'
import CoustomPagination from '../../pagination/CoustomPagination.jsx'

const AccessoriesSection = () => {
  const { theme } = useContext(ThemeContext)
  const [currentPage, setCurrentPage] = useState(1)
  const {
    data: getAllAccessories,
    error,
    isLoading,
  } = useGetAllAccessoriesQuery({ limit: 4, page: currentPage })
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
      id="Accessories"
      style={{
        background: theme.sectionBackground,
        color: theme.topicTextColor,
      }}
    >
      {/* Best Sale Heading */}
      <h2 className="text-center text-3xl font-Merriweather font-bold leading-lg">
        Accessories
      </h2>

      {/* Card Grid */}
      <div className="px-6 md:px-32 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 items-center justify-items-center">
        {getAllAccessories?.docs?.map((product, index) => (
          <AccessoriesCard
            product={product}
            OpenModelViewProduct={openCustomModelViewProduct}
            OpenModel={openCustomModelOne}
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
      {!getAllAccessories?.docs?.length > 0 && (
        <div className="w-full flex items-center justify-center">
          <Empty description={false} />
        </div>
      )}
      <div className="px-6 md:px-32 w-full flex mt-8 justify-end">
        {getAllAccessories?.docs?.length > 0 && (
          <CoustomPagination
            currentPage={currentPage}
            totalPages={getAllAccessories?.totalPages}
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

export default AccessoriesSection
