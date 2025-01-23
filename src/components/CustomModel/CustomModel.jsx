import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Link } from 'react-router-dom';

const CustomModelOne = ({ showCustomModelOne, setShowCustomModelOne, product, width = 500 }) => {

  const handleOk = () => {
    setShowCustomModelOne(false);
  };

  const handleCancel = () => {
    setShowCustomModelOne(false);
  };

  return (
    <div>
      <Modal
        title={null}
        open={showCustomModelOne}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={width}
        centered
        className="p-0"
        style={{ padding: '0' }}
      >
        <div className="bg-yellow-50 p-8 rounded-lg text-center max-w-md w-full">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-yellow-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Added to Cart</h2>
          <p className="text-gray-500 mb-6">{product?.name}</p>
          <div className="flex justify-center space-x-4">
            <Link to="/cart">
              <button className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700">
                Checkout
              </button>
            </Link>
            <button className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900"
              onClick={handleCancel}>
              Continue Shopping
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomModelOne;
