import { SearchOutlined } from '@ant-design/icons'
import { Input, Select } from 'antd'
import React, { useContext } from 'react'
import { MetaDataContext } from '../../context/MetaDataContext'

const FilterHeader = ({
    handleChangeShort,
    handleChangeFilter,
}) => {
    const { metaData, loading, error } = useContext(MetaDataContext) // Access meta-data
    return (
        <div className="flex flex-col sm:flex-row justify-between my-6 card-custom-shadow p-2 gap-5">
            <div className="flex flex-col sm:flex-row justify-start items-center gap-5 w-full sm:w-1/2">
                <Select
                    className="w-full"
                    defaultValue="Sorting  "
                    def="true"
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
    )
}

export default FilterHeader