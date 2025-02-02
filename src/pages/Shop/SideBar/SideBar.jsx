import { Slider, theme } from 'antd'
import React, { useContext } from 'react'
import { MetaDataContext } from '../../../context/MetaDataContext'

const SideBar = ({
    handelOpenFilter,
    openFilter,
    openSections,
    selectedItems,
    toggleSection,
    handleChangeFilter,
    handleSelection,
    handelClickedSubCategory,
    handelChangeFilterObject,
    changeShopName
}) => {
    const { metaData, loading, error } = useContext(MetaDataContext) // Access meta-data
    return (
        < div className="w-1/4 pr-8  relative card-custom-shadow px-6 py-10 hidden md:flex  flex-col" >
            {/* <div className="w-1/4 pr-8 h-[100vh] overflow-y-scroll relative hide-scrollbar card-custom-shadow px-6 py-10 "> */}
            {/* Price Slider */}
            <h3 className="text-xl mb-4" style={{ color: theme.textColor }}>
                Price
            </h3>
            <Slider
                range
                defaultValue={[0, 4590]}
                min={0}
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


        </div >
    )
}

export default SideBar