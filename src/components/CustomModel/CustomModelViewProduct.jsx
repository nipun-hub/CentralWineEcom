import React from 'react';
import { Modal, Button, Rate } from 'antd';
import { LoadingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useAddToCartMutation } from '../../features/api/cartSlice';
import { useSelector } from 'react-redux';
import { tostAlert } from '../../utils/notification';

const CustomModelViewProduct = ({ showCustomModelViewProduct, setShowCustomModelViewProduct, product, width = 1000 }) => {

  const handleCancel = () => {
    setShowCustomModelViewProduct(false);
  };

  console.log(product)

  const userId = useSelector((state) => state.auth.userId);
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const handleAddToCart = async (id) => {
    if (!userId) {
      tostAlert('error', 'User not logged in!');
      return;
    }

    const data = { productId: id, quantity: 1, userId: userId }
    await addToCart(data)
    handleCancel()
  };


  return (
    <Modal
      title={null}
      open={showCustomModelViewProduct}
      onCancel={handleCancel}
      footer={null}
      centered
      width={width}  // Set width of modal
      style={{ padding: '0', borderRadius: '12px' }}  // Style for rounded corners
      className="p-0 bg-yellow-50 rounded-xl"
    >
      {
        product ?
          <div className=" p-6 md:p-10 rounded-lg flex flex-col md:flex-row items-center">
            {/* Wine Image Section */}
            <div className="w-1/3 md:w-1/3 flex justify-center mb-6 md:mb-0 border-0">
              <img
                src={product.image}
                alt="Wine Bottle"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
            {/* Product Details Section */}
            <div className="md:w-2/3 md:pl-8">
              {/* Star Rating */}
              <div className="flex items-center mb-4">
                <Rate allowHalf disabled defaultValue={product.rating / 20} className="text-yellow-500" />
              </div>
              {/* Product Title */}
              <h2 className="text-2xl sm:text-4xl font-semibold text-amber-950 mb-4">
                {product.name}
              </h2>

              <p>
                {product?.description}
              </p>
              {/* Price */}
              <div className='flex gap-5 items-center mb-2'>

                <div className="text-2xl text-red-600 font-bold ">
                  <span className='mr-2'>
                    $ {
                      product?.unitDiscount && product?.unitDiscount != 0 ?
                        (product?.unitPrice - (product?.unitPrice * product?.unitDiscount / 100)).toFixed(2)
                        : product?.unitPrice.toFixed(2)
                    }
                  </span>

                </div>

                {(product?.unitDiscount && product?.unitDiscount !== 0) ?
                  <span className="text-2xl text-gray-900 font-semibold line-through opacity-80" >
                    $ {product?.unitPrice.toFixed(2)}
                  </span>
                  : null
                }

                <div>
                {(product?.unitDiscount && product?.unitDiscount !== 0) ?
                    <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
                      {product?.discountName} ({product?.unitDiscount}% off)
                    </span>
                    : null
                  }
                </div>

              </div>

              <>
                {
                  product.inStock ?

                    <div className='flex gap-5 items-center bg-green-100 rounded-full px-4 py-1'>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      <span className='text-base font-extrabold opacity-60'>In Stock Items {product.qtyOnHand}</span>
                    </div>

                    :

                    <div className='flex gap-5 items-center bg-red-100 rounded-full px-4 py-2'>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      <span className='text-base font-extrabold opacity-60'>Out Of Stock</span>
                    </div>
                }
              </>

              {/* Product Details */}
              <div className="mt-4 space-y-1 text-gray-700">
                <table className="w-full">
                  <tbody className="space-y-2">

                    <tr className="space-y-2">
                      <td><span className="font-semibold text-base text-amber-950">Categories : </span></td>
                      <td>{product?.categories?.name}</td>
                    </tr>

                    <tr className="space-y-2">
                      <td><span className="font-semibold text-base text-amber-950">Varietal : </span></td>
                      <td>{product?.subCategories?.name}</td>
                      {/* <td>{product.subCategories.map((subCategory) => (subCategory.name + ' , '))}</td> */}
                    </tr>

                    <tr className="space-y-2">
                      <td><span className="font-semibold text-base text-amber-950">Country : </span> </td>
                      <td>{product.country.name} - {product.regions.region} - {product?.subRegions?.name}</td>
                    </tr>

                    <tr className="space-y-2">
                      <td><span className="font-semibold text-base text-amber-950">Vintage : </span> </td>
                      <td>{product.vintage.year}</td>
                    </tr>

                    <tr className="space-y-2">
                      <td><span className="font-semibold text-base text-amber-950">Size : </span> </td>
                      <td>{product.size.name}</td>
                    </tr>

                    <tr className="space-y-2">
                      <td><span className="font-semibold text-base text-amber-950">Type : </span> </td>
                      <td>{product?.type.map((type) => (type.name + ' , '))}</td>
                    </tr>

                    <tr className="space-y-2">
                      <td><span className="font-semibold text-base text-amber-950">ABV : </span> </td>
                      <td>{product.abv}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Add to Cart Button */}
              <div className="mt-6 flex justify-center md:justify-start">
                <Button
                  type="button"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white py-5 px-10 w-1/2 rounded-md text-lg"
                  onClick={() => handleAddToCart(product._id)}
                >
                  {!isLoading ? <ShoppingCartOutlined /> : <LoadingOutlined />}
                  {!isLoading ? 'Add to Cart' : 'Loaading...'}
                </Button>
              </div>
            </div>
          </div>
          :
          <div className='p-6 md:p-10 rounded-lg flex flex-col md:flex-row justify-center font-black opacity-60'>
            <p className='text-4xl'>Product Not Found !</p>
          </div>
      }
    </Modal>
  );
};

export default CustomModelViewProduct;
