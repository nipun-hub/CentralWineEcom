import React from 'react';
import { Card } from 'antd';
import { EyeFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useAddToCartMutation } from '../../features/api/cartSlice';
import { useAddToWishListMutation } from '../../features/api/wishlistSlice';
import { tostAlert } from '../../utils/notification';
import { useNavigate } from 'react-router-dom';

const AccessoriesCard = ({ id, image, name, country, originalPrice, salePrice, onClick, OpenModel, OpenModelViewProduct, product = null }) => {
  const navigate = useNavigate();

  const [addToWishList] = useAddToWishListMutation();
  const [addToCart] = useAddToCartMutation();
  const userId = useSelector((state) => state.auth.userId)

  const handleAddToWishlist = async (id) => {
    if (!userId) {
      tostAlert('error', 'User not logged in!');
      return;
    }

    const data = { productId: id, userId: userId }
    await addToWishList(data)
  };

  const handleAddToCart = async (product) => {
    if (!userId) {
      tostAlert('error', 'User not logged in!');
      return;
    }

    const data = { productId: product._id, quantity: 1, userId: userId }
    await addToCart(data)
    OpenModel(product)
  };

  const handelClickSingleProduct = (id) => {
    navigate('/single-product', { state: { id } });
  }


  return (
    <Card
      // honorable = {true}
      className="flex flex-col justify-around w-full max-w-[300px] h-[506px] cursor-pointer relative overflow-hidden border-0 card-custom-shadow"
      cover={
        <div className="relative overflow-hidden group">
          <img
            alt={name}
            src={image}
            className="w-full h-[322px] transition-transform duration-300 ease-in-out transform group-hover:scale-150"
          />
          <div className="absolute inset-0 flex justify-center items-center gap-4 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-500">
            <div className="w-full flex justify-around translate-y-96 group-hover:translate-y-0 transition-all duration-500 ease-out"
            >
              <button className="bg-yellow-200 rounded-full p-2 text-black hover:bg-yellow-300 w-14 h-14"
                onClick={() => handleAddToCart(product)}>
                <ShoppingCartOutlined className="opacity-100" />
              </button>
              <button className="bg-yellow-200 rounded-full p-2 text-black hover:bg-yellow-300 w-14 h-14"
                onClick={() => handleAddToWishlist(id)}>
                <HeartOutlined className="opacity-100" />
              </button>
              <button className="bg-yellow-200 rounded-full p-2 text-black hover:bg-yellow-300 w-14 h-14"
                onClick={() => OpenModelViewProduct(product)}>
                <EyeFilled className="opacity-100" />
              </button>
            </div>
          </div>
        </div>
      }
      onClick={onClick}
      style={{ padding: '12px' }}
    >
      <div className='flex flex-col gap-3 h-full' onClick={() => handelClickSingleProduct(id)}>
        <h3 className="font-Merriweather text-lg font-bold leading-[22.63px] mb-1">{name}</h3>
        <p className="font-Merriweather text-sm font-normal leading-[17.6px] text-gray-600 mb-2">
          {country} - {product?.regions?.region}
        </p>
        <p className="font-Merriweather text-sm font-normal leading-[17.6px] text-gray-600 mb-2">
          {product?.size?.name}
        </p>
        
        <div className="flex items-center justify-evenly">
          <span className="font-Merriweather text-lg font-bold leading-[22.63px] text-[#FF4976] mr-2">
            {salePrice ? "$" + salePrice.toFixed(2) : null}
          </span>
          <span className="font-Merriweather text-lg font-bold leading-[22.63px] text-gray-400 line-through">
            {originalPrice ? "$" + originalPrice.toFixed(2) : null}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default AccessoriesCard;