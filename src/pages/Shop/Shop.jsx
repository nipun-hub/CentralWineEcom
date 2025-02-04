import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  Empty,
  FloatButton,
} from 'antd'
import { ThemeContext } from '../../context/ThemeContext'
import { MetaDataContext } from '../../context/MetaDataContext.jsx'
import {
  FilterTwoTone,
} from '@ant-design/icons'
import AccessoriesCard from '../../components/Cards/AccessoriesCard'
import CustomModelOne from '../../components/CustomModel/CustomModel'
import CustomModelViewProduct from '../../components/CustomModel/CustomModelViewProduct'
import { useGetAllProductQuery } from '../../features/api/productSlice.js'
import Spinner from '../../components/Spinner/Spinner.jsx'
import { useGetImageQuery } from '../../features/api/imageSlice.js'
import { useLocation } from 'react-router-dom'
import CoustomPagination from '../../components/pagination/CoustomPagination.jsx'
import SideBarMobile from './SideBar/SideBarMobile.jsx'
import SideBar from './SideBar/SideBar.jsx'
import FilterHeader from './FilterHeader.jsx'

const Shop = () => {
  const { theme } = useContext(ThemeContext)
  const { metaData, loading, error } = useContext(MetaDataContext) // Access meta-data
  const [currentPage, setCurrentPage] = useState(1)
  const [activeProduct, setActiveProduct] = useState()
  const [filterData, setFilterData] = useState({})

  // get navigate data
  const location = useLocation()
  const { navigateCategory } = location.state || {}

  // ref
  const titleText = useRef(null)

  const {
    data: imageData,
    error: errorImageData,
    isLoading: isLoadingImageData,
  } = useGetImageQuery()
  const {
    data: productData,
    error: productDataError,
    isLoading: productDataIsLoading,
  } = useGetAllProductQuery(filterData)


  // filter section

  const handleChangeFilter = (name, value) => {
    setFilterData({
      ...filterData,
      [name]: value,
    })
  }

  const handelChangeFilterObject = (data) => {
    const newFilterData = data.reduce((acc, { name, value }) => {
      acc[name] = value
      return acc
    }, {})

    setFilterData({
      ...filterData,
      ...newFilterData,
    })
  }

  const handleChangeShort = (value) => {
    if (value === 'priceLowToHigh') {
      handelChangeFilterObject([
        { name: 'sortBy', value: 'unitPrice' },
        { name: 'sortOrder', value: 'asc' },
      ])
    } else if (value === 'priceHighToLow') {
      handelChangeFilterObject([
        { name: 'sortBy', value: 'unitPrice' },
        { name: 'sortOrder', value: 'desc' },
      ])
    } else if (value === 'ratingLowToHigh') {
      // Handle logic for rating low to high
    } else if (value === 'ratingHighToLow') {
      // Handle logic for rating high to low
    }
  }

  const changeShopName = (name, type = null) => {
    if (titleText.current) {
      openSections[name] != true
        ? (titleText.current.textContent = name)
        : (titleText.current.textContent = 'Shop')
    }
    if (type != null) {
      titleText.current.textContent = name
    }
  }

  useEffect(() => {
    const data = productData
  }, [filterData])

  // dialog section

  const [showCustomModelOne, setShowCustomModelOne] = useState(false)

  const openCustomModelOne = (product) => {
    setActiveProduct(product)
    setShowCustomModelOne(true)
  }

  const [showCustomModelViewProduct, setShowCustomModelViewProduct] =
    useState(false)

  const openCustomModelViewProduct = (product) => {
    setActiveProduct(product)
    setShowCustomModelViewProduct(true)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    handleChangeFilter('page', page)
    console.log(`Current page: ${page}`) // Log the current page when changed
  }

  const [openFilter, setOpenFilter] = useState(false)
  const handelOpenFilter = () => {
    setOpenFilter(!openFilter)
  }

  // dropdown  section

  const [openSections, setOpenSections] = useState({})

  // radio section

  const [selectedItems, setSelectedItems] = useState({
    dryness: '',
    sizeType: '',
    collectables: '',
  })

  const handleSelection = (categoryId, item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [categoryId]: item,
    }))
  }

  //////////////////////////////

  const toggleSection = (name) => {
    setOpenSections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
    changeShopName(name)
  }

  useEffect(() => {
    if (navigateCategory) {
      changeShopName(navigateCategory)
      const id = navigateCategory.replace(' ', '')
      const section = document.getElementById(id)
      section && section.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setOpenSections({
        [navigateCategory]: true,
      })
    }
  }, [navigateCategory])

  const handelClickedSubCategory = (subCategory, category) => {
    handleChangeFilter('subCategoryId', subCategory._id)
  }

  // Helper function to get image by section
  const getImageBySection = (section) => {
    const image = imageData?.find((img) => img.section === section)
    return image ? image.imageUrl : '' // Return the URL if found, otherwise an empty string
  }

  if (loading || productDataIsLoading) return <Spinner />
  if (error) return <div>Error fetching metadata</div>

  return (
    <>
      <section
        style={{ backgroundColor: theme.background, color: theme.textColor }}
      >
        <div
          ref={titleText}
          className="w-full flex justify-center items-center bg-cover bg-center relative h-[50vh] contrast-50 text-6xl text-white  font-extrabold font-Merriweather"
          style={{ backgroundImage: `url('${getImageBySection('promo1')}')` }}
        >
          Shop
        </div>
        <div className="flex w-full p-6">
          <SideBar
            handelOpenFilter={handelOpenFilter}
            openFilter={openFilter}
            openSections={openSections}
            selectedItems={selectedItems}
            toggleSection={toggleSection}
            handleChangeFilter={handleChangeFilter}
            handleSelection={handleSelection}
            handelClickedSubCategory={handelClickedSubCategory}
            handelChangeFilterObject={handelChangeFilterObject}
            changeShopName={changeShopName}
          />

          <FloatButton
            className="md:hidden"
            shape="circle"
            type="white"
            onClick={handelOpenFilter}
            style={{
              insetInlineEnd: 20,
              bottom: 20,
            }}
            icon={<FilterTwoTone />}
          />

          {/* side bar mobile */}
          <SideBarMobile
            handelOpenFilter={handelOpenFilter}
            openFilter={openFilter}
            openSections={openSections}
            selectedItems={selectedItems}
            toggleSection={toggleSection}
            handleChangeFilter={handleChangeFilter}
            handleSelection={handleSelection}
            handelClickedSubCategory={handelClickedSubCategory}
            handelChangeFilterObject={handelChangeFilterObject}
          />

          {/* Main Content */}
          <div className="w-full mx-5 me-10">
            {/* filter Header */}
            <FilterHeader
              handleChangeShort={handleChangeShort}
              handleChangeFilter={handleChangeFilter}
            />

            {productData?.docs?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10 justify-items-center">
                {productData?.docs.map((product, index) => (
                  <AccessoriesCard
                    product={product}
                    id={product._id}
                    key={index}
                    image={product?.image} //
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
                    OpenModel={openCustomModelOne}
                    OpenModelViewProduct={openCustomModelViewProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="text-5xl h-screen w-full flex justify-center items-center font-black opacity-60 text-center">
                <div className="w-full flex items-center justify-center">
                  <Empty description={false} />
                </div>
              </div>
            )}

            <div className="flex justify-center mt-8 ">
              {productData?.docs?.length > 0 && (
                <CoustomPagination
                  currentPage={currentPage}
                  totalPages={productData?.totalPages}
                  onPageChange={handlePageChange}
                />
              )}

              <CustomModelOne
                showCustomModelOne={showCustomModelOne}
                setShowCustomModelOne={setShowCustomModelOne}
                product={activeProduct}
              />
              <CustomModelViewProduct
                showCustomModelViewProduct={showCustomModelViewProduct}
                setShowCustomModelViewProduct={setShowCustomModelViewProduct}
                product={activeProduct}
              />
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Shop
