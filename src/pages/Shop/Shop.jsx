import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  Slider,
  Input,
  Select,
  Pagination,
  Empty,
  Drawer,
  FloatButton,
} from 'antd'
import { ThemeContext } from '../../context/ThemeContext'
import { MetaDataContext } from '../../context/MetaDataContext.jsx'
import {
  CustomerServiceOutlined,
  FilterTwoTone,
  SearchOutlined,
} from '@ant-design/icons'
import AccessoriesCard from '../../components/Cards/AccessoriesCard'
import CustomModelOne from '../../components/CustomModel/CustomModel'
import CustomModelViewProduct from '../../components/CustomModel/CustomModelViewProduct'
import { useGetAllProductQuery } from '../../features/api/productSlice.js'
import Spinner from '../../components/Spinner/Spinner.jsx'
import { useGetImageQuery } from '../../features/api/imageSlice.js'
import { useLocation, useNavigate } from 'react-router-dom'
import CoustomPagination from '../../components/pagination/CoustomPagination.jsx'

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

  console.log(metaData)

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
        ? (titleText.current.textContent = '#' + name)
        : (titleText.current.textContent = '#Shop')
    }
    if (type != null) {
      titleText.current.textContent = '#' + name
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
          #Shop
        </div>
        <div className="flex w-full p-6">
          {/* Sidebar */}
          <div className="w-1/4 pr-8  relative card-custom-shadow px-6 py-10 hidden md:flex  flex-col">
            {/* <div className="w-1/4 pr-8 h-[100vh] overflow-y-scroll relative hide-scrollbar card-custom-shadow px-6 py-10 "> */}
            {/* Price Slider */}
            <h3 className="text-xl mb-4" style={{ color: theme.textColor }}>
              Price
            </h3>
            <Slider
              range
              defaultValue={[30, 4590]}
              min={30}
              max={4590}
              trackStyle={{ backgroundColor: theme.sliderTrack }}
              handleStyle={{ borderColor: theme.sliderHandle }}
              onChange={(value) => {
                handelChangeFilterObject([
                  { name: 'priceMin', value: value[0] },
                  { name: 'priceMax', value: value[1] },
                ])
              }}
            />

            {/* Category Dropdown */}
            <h3
              className="text-xl mt-6 mb-4"
              style={{ color: theme.textColor }}
            >
              Category
            </h3>

            <div className="flex flex-col gap-1">
              {metaData?.wineCategories.map((category) => (
                <div key={category._id}>
                  <button
                    onClick={() => toggleSection(category.name)}
                    className="w-full flex items-center justify-between py-2 px-1 text-sm transition-all hover:translate-x-1 scale-105 duration-300 rounded-sm group"
                    id={category.name.replace(' ', '')}
                  >
                    <div className="flex items-center justify-between w-full text-sm font-normal">
                      <span
                        className={`text-gray-700  ${openSections[category.name] ? 'font-extrabold' : ''} transition-all duration-300 ease-in-out text-start`}
                        style={{ color: theme.textColor }}
                      >
                        {category.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span
                          className="text-gray-500"
                          style={{ color: theme.textColor }}
                        >
                          ({category?.subCategories?.length})
                        </span>
                        {/* Animated chevron */}
                        <span
                          className={`w-4 h-4 flex items-center justify-center transition-transform duration-300 ease-in-out ${openSections[category.name] ? 'rotate-180' : ''}`}
                        >
                          <span
                            className="block border-r-2 border-b-2 border-gray-400 w-2 h-2 transform rotate-45 translate-y-[-2px]"
                            style={{ borderColor: theme.textColor }}
                          ></span>
                        </span>
                      </div>
                    </div>
                  </button>
                  {/* Animated dropdown container */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openSections[category.name] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div
                      className="pl-4 py-2 bg-gray-50 flex flex-col gap-2"
                      style={{ backgroundColor: theme.background }}
                    >
                      {category?.subCategories.map((subCategory, index) => (
                        <div
                          onClick={() => {
                            changeShopName(category.name, 'directly')
                            handelClickedSubCategory(subCategory)
                          }}
                          key={subCategory._id}
                          className="text-sm text-gray-600 py-1 transition-all duration-300 ease-in-out transform hover:translate-x-1 cursor-pointer"
                          style={{ color: theme.textColor }}
                        >
                          {subCategory.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Region and Sub-Region Dropdown */}
            <h3
              className="text-xl mt-6 mb-4"
              style={{ color: theme.textColor }}
            >
              Region
            </h3>

            <div className="flex flex-col gap-1 mb-4">
              {metaData?.wineRegions.map((region) => (
                <div key={region._id} className="">
                  <button
                    onClick={() => toggleSection(region.region)}
                    className="w-full flex items-center justify-between py-2 px-1 text-sm transition-all  hover:translate-x-1 scale-105  rounded-sm group"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`${openSections[region.region] ? 'font-extrabold' : ''} transition-all duration-300 ease-in-out`}
                        style={{ color: theme.textColor }}
                      >
                        {region.region}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span
                          className="text-gray-500"
                          style={{ color: theme.textColor }}
                        >
                          ({region?.subRegions.length})
                        </span>
                        {/* Animated chevron */}
                        <span
                          className={`w-4 h-4 flex items-center justify-center transition-transform duration-300 ease-in-out ${openSections[region.region] ? 'rotate-180' : ''}`}
                        >
                          <span
                            className="block border-r-2 border-b-2 border-gray-400 w-2 h-2 transform rotate-45 translate-y-[-2px]"
                            style={{ borderColor: theme.textColor }}
                          ></span>
                        </span>
                      </div>
                    </div>
                  </button>
                  {/* Animated dropdown container */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openSections[region.region] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div
                      className="pl-4 py-2"
                      style={{ backgroundColor: theme.background }}
                    >
                      {region?.subRegions.map((subRegions) => (
                        <div
                          onClick={() =>
                            handleChangeFilter('subRegionId', subRegions._id)
                          }
                          key={subRegions._id}
                          className={`text-sm py-1 transition-all duration-300 ease-in-out transform hover:translate-x-1 cursor-pointer`}
                          style={{ color: theme.textColor }}
                        >
                          {subRegions.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ABV Slider */}
            <h3 className="text-xl mb-4" style={{ color: theme.textColor }}>
              ABV
            </h3>
            <Slider
              range
              defaultValue={[8, 42]}
              min={0}
              max={100}
              trackStyle={{ backgroundColor: theme.sliderTrack }}
              handleStyle={{ borderColor: theme.sliderHandle }}
              onChange={(value) => {
                handelChangeFilterObject([
                  { name: 'abvMin', value: value[0] },
                  { name: 'abvMax', value: value[1] },
                ])
              }}
            />

            {/* Dryness Levels */}
            <h3
              className="text-xl mt-6 mb-4"
              style={{ color: theme.textColor }}
            >
              Dryness
            </h3>
            <div className="space-y-2 flex flex-col">
              <ul className="space-y-2">
                {metaData?.drynessLevels.map((dryness) => (
                  <li
                    key={dryness._id}
                    onClick={() => {
                      handleSelection('dryness', dryness.name)
                      handleChangeFilter('drynessId', dryness._id)
                    }}
                    className={`
                      flex items-center cursor-pointer
                      transition-all duration-200
                      ease-in-out transform
                      hover: hover:translate-x-1
                      ${selectedItems['dryness'] === dryness.name ? 'font-bold' : 'font-normal'}
                    `}
                  >
                    {/* Centered bullet point */}
                    <div className="flex items-center justify-center w-4 h-4">
                      <span className="text-lg leading-none relative top-[-1px]">
                        •
                      </span>
                    </div>
                    <span className="ml-1 text-sm">{dryness.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size */}
            <h3
              className="text-xl mt-6 mb-4"
              style={{ color: theme.textColor }}
            >
              Size
            </h3>
            <div className="space-y-2 flex flex-col ms-5">
              <ul className="space-y-2">
                {metaData?.size.map((size) => (
                  <li
                    key={size._id}
                    onClick={() => {
                      handleSelection('size', size.name)
                      handleChangeFilter('sizeId', size._id)
                    }}
                    className={`
                      flex items-center cursor-pointer
                      transition-all duration-200
                      ease-in-out transform
                      hover: hover:translate-x-1
                      ${selectedItems['size'] === size.name ? 'font-bold' : 'font-normal'}
                    `}
                  >
                    {/* Centered bullet point */}
                    <div className="flex items-center justify-center w-4 h-4">
                      <span className="text-lg leading-none relative top-[-1px]">
                        •
                      </span>
                    </div>
                    <span className="ml-1 text-sm">{size.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Type */}
            <h3
              className="text-xl mt-6 mb-4"
              style={{ color: theme.textColor }}
            >
              Types
            </h3>
            <div className="space-y-2 flex flex-col ms-5">
              <ul className="space-y-2">
                {metaData?.type.map((type) => (
                  <li
                    key={type._id}
                    onClick={() => {
                      handleSelection('type', type.name)
                      handleChangeFilter('typeId', type._id)
                    }}
                    className={`
                      flex items-center cursor-pointer
                      transition-all duration-200
                      ease-in-out transform
                      hover: hover:translate-x-1
                      ${selectedItems['type'] === type.name ? 'font-bold' : 'font-normal'}
                    `}
                  >
                    {/* Centered bullet point */}
                    <div className="flex items-center justify-center w-4 h-4">
                      <span className="text-lg leading-none relative top-[-1px]">
                        •
                      </span>
                    </div>
                    <span className="ml-1 text-sm">{type.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            
          </div>

          {/* Main Content */}
          <div className="w-full mx-5 me-10">
            <div className="flex flex-col sm:flex-row justify-between my-6 card-custom-shadow p-2 gap-5">
              <div className="flex flex-col sm:flex-row justify-start items-center gap-5 w-full sm:w-1/2">
                <Select
                  className="w-full"
                  defaultValue="Sorting  "
                  def
                  size="large"
                  options={[
                    { value: 'priceLowToHigh', label: 'Price: Low to High' },
                    { value: 'priceHighToLow', label: 'Price: High to Low' },
                    // { value: 'ratingLowToHigh', label: 'Rating: Low to High' },
                    // { value: 'ratingHighToLow', label: 'Rating: High to Low' },
                  ]}
                  onChange={(value) => handleChangeShort(value)}
                />

                <Select
                  className="w-full"
                  defaultValue="Vintage"
                  size="large"
                  options={[
                    ...metaData?.vintages.map((vintage) => ({
                      value: vintage._id,
                      label: vintage.year,
                    })),
                  ]}
                  onChange={(value) => handleChangeFilter('vintageId', value)}
                />
              </div>

              <Input
                className="w-full lg:w-1/3 rounded-full py-2 px-4"
                size="large"
                placeholder="Search By Name or Brand"
                prefix={<SearchOutlined />}
                onChange={(event) =>
                  handleChangeFilter('name', event.target.value)
                }
              />
            </div>

            {productData?.docs?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10 justify-items-center">
                {productData?.docs.map((product, index) => (
                <AccessoriesCard
                    product={product}
                    id={product._id}
                    key={index}
                    image={product.image} //
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

      {/*sidebar mobile*/}
      <Drawer
        // title="Basic Drawer"
        placement="bottom"
        closable={false}
        onClose={handelOpenFilter}
        open={openFilter}
        key="bottom"
        style={{
          // backgroundColor: 'red',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          overflow: 'hidden', // Ensures the radius effect is clean
        }}
      >
        <div className="pr-8  relative card-custom-shadow px-6 py-10 flex-col">
          {/* <div className="w-1/4 pr-8 h-[100vh] overflow-y-scroll relative hide-scrollbar card-custom-shadow px-6 py-10 "> */}
          {/* Price Slider */}
          <h3 className="text-xl mb-4" style={{ color: theme.textColor }}>
            Price
          </h3>
          <Slider
            range
            defaultValue={[30, 4590]}
            min={30}
            max={4590}
            trackStyle={{ backgroundColor: theme.sliderTrack }}
            handleStyle={{ borderColor: theme.sliderHandle }}
            onChange={(value) => {
              handelChangeFilterObject([
                { name: 'priceMin', value: value[0] },
                { name: 'priceMax', value: value[1] },
              ])
            }}
          />

          {/* Category Dropdown */}
          <h3 className="text-xl mt-6 mb-4" style={{ color: theme.textColor }}>
            Category
          </h3>

          <div className="flex flex-col gap-1">
            {metaData?.wineCategories.map((category) => (
              <div key={category._id}>
                <button
                  onClick={() => toggleSection(category.name)}
                  className="w-full flex items-center justify-between py-2 px-1 text-sm transition-all hover:translate-x-1 scale-105 duration-300 rounded-sm group"
                  id={category.name.replace(' ', '')}
                >
                  <div className="flex items-center justify-between w-full text-sm font-normal">
                    <span
                      className={`text-gray-700  ${openSections[category.name] ? 'font-extrabold' : ''} transition-all duration-300 ease-in-out`}
                      style={{ color: theme.textColor }}
                    >
                      {category.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span
                        className="text-gray-500"
                        style={{ color: theme.textColor }}
                      >
                        ({category?.subCategories?.length})
                      </span>
                      {/* Animated chevron */}
                      <span
                        className={`w-4 h-4 flex items-center justify-center transition-transform duration-300 ease-in-out ${openSections[category.name] ? 'rotate-180' : ''}`}
                      >
                        <span
                          className="block border-r-2 border-b-2 border-gray-400 w-2 h-2 transform rotate-45 translate-y-[-2px]"
                          style={{ borderColor: theme.textColor }}
                        ></span>
                      </span>
                    </div>
                  </div>
                </button>
                {/* Animated dropdown container */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openSections[category.name] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div
                    className="pl-4 py-2 bg-gray-50 flex flex-col gap-2"
                    style={{ backgroundColor: theme.background }}
                  >
                    {category?.subCategories.map((subCategory, index) => (
                      <div
                        onClick={() => handelClickedSubCategory(subCategory)}
                        key={subCategory._id}
                        className="text-sm text-gray-600 py-1 transition-all duration-300 ease-in-out transform hover:translate-x-1"
                        style={{ color: theme.textColor }}
                      >
                        {subCategory.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Region and Sub-Region Dropdown */}
          <h3 className="text-xl mt-6 mb-4" style={{ color: theme.textColor }}>
            Region
          </h3>

          <div className="flex flex-col gap-1 mb-4">
            {metaData?.wineRegions.map((region) => (
              <div key={region._id} className="">
                <button
                  onClick={() => toggleSection(region.region)}
                  className="w-full flex items-center justify-between py-2 px-1 text-sm transition-all  hover:translate-x-1 scale-105  rounded-sm group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`${openSections[region.region] ? 'font-extrabold' : ''} transition-all duration-300 ease-in-out`}
                      style={{ color: theme.textColor }}
                    >
                      {region.region}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span
                        className="text-gray-500"
                        style={{ color: theme.textColor }}
                      >
                        ({region?.subRegions.length})
                      </span>
                      {/* Animated chevron */}
                      <span
                        className={`w-4 h-4 flex items-center justify-center transition-transform duration-300 ease-in-out ${openSections[region.region] ? 'rotate-180' : ''}`}
                      >
                        <span
                          className="block border-r-2 border-b-2 border-gray-400 w-2 h-2 transform rotate-45 translate-y-[-2px]"
                          style={{ borderColor: theme.textColor }}
                        ></span>
                      </span>
                    </div>
                  </div>
                </button>
                {/* Animated dropdown container */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openSections[region.region] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div
                    className="pl-4 py-2"
                    style={{ backgroundColor: theme.background }}
                  >
                    {region?.subRegions.map((subRegions) => (
                      <div
                        onClick={() =>
                          handleChangeFilter('subRegionId', subRegions._id)
                        }
                        key={subRegions._id}
                        className={`text-sm py-1 transition-all duration-300 ease-in-out transform hover:translate-x-1`}
                        style={{ color: theme.textColor }}
                      >
                        {subRegions.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ABV Slider */}
          <h3 className="text-xl mb-4" style={{ color: theme.textColor }}>
            ABV
          </h3>
          <Slider
            range
            defaultValue={[8, 42]}
            min={0}
            max={100}
            trackStyle={{ backgroundColor: theme.sliderTrack }}
            handleStyle={{ borderColor: theme.sliderHandle }}
            onChange={(value) => {
              handelChangeFilterObject([
                { name: 'abvMin', value: value[0] },
                { name: 'abvMax', value: value[1] },
              ])
            }}
          />

          {/* Dryness Levels */}
          <h3 className="text-xl mt-6 mb-4" style={{ color: theme.textColor }}>
            Dryness
          </h3>
          <div className="space-y-2 flex flex-col">
            <ul className="space-y-2">
              {metaData?.drynessLevels.map((dryness) => (
                <li
                  key={dryness._id}
                  onClick={() => {
                    handleSelection('dryness', dryness.name)
                    handleChangeFilter('drynessId', dryness._id)
                  }}
                  className={`
                      flex items-center cursor-pointer
                      transition-all duration-200
                      ease-in-out transform
                      hover: hover:translate-x-1
                      ${selectedItems['dryness'] === dryness.name ? 'font-bold' : 'font-normal'}
                    `}
                >
                  {/* Centered bullet point */}
                  <div className="flex items-center justify-center w-4 h-4">
                    <span className="text-lg leading-none relative top-[-1px]">
                      •
                    </span>
                  </div>
                  <span className="ml-1 text-sm">{dryness.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Size */}
          <h3 className="text-xl mt-6 mb-4" style={{ color: theme.textColor }}>
            Size
          </h3>
          <div className="space-y-2 flex flex-col ms-5">
            <ul className="space-y-2">
              {metaData?.size.map((size) => (
                <li
                  key={size._id}
                  onClick={() => {
                    handleSelection('size', size.name)
                    handleChangeFilter('sizeId', size._id)
                  }}
                  className={`
                      flex items-center cursor-pointer
                      transition-all duration-200
                      ease-in-out transform
                      hover: hover:translate-x-1
                      ${selectedItems['size'] === size.name ? 'font-bold' : 'font-normal'}
                    `}
                >
                  {/* Centered bullet point */}
                  <div className="flex items-center justify-center w-4 h-4">
                    <span className="text-lg leading-none relative top-[-1px]">
                      •
                    </span>
                  </div>
                  <span className="ml-1 text-sm">{size.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* type */}
          <h3 className="text-xl mt-6 mb-4" style={{ color: theme.textColor }}>
            Types
          </h3>
          <div className="space-y-2 flex flex-col ms-5">
            <ul className="space-y-2">
              {metaData?.type.map((type) => (
                <li
                  key={type._id}
                  onClick={() => {
                    handleSelection('type', type.name)
                    handleChangeFilter('typeId', type._id)
                  }}
                  className={`
                      flex items-center cursor-pointer
                      transition-all duration-200
                      ease-in-out transform
                      hover: hover:translate-x-1
                      ${selectedItems['type'] === type.name ? 'font-bold' : 'font-normal'}
                    `}
                >
                  {/* Centered bullet point */}
                  <div className="flex items-center justify-center w-4 h-4">
                    <span className="text-lg leading-none relative top-[-1px]">
                      •
                    </span>
                  </div>
                  <span className="ml-1 text-sm">{type.name}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </Drawer>
    </>
  )
}

export default Shop
