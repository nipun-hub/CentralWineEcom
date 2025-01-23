import React, { useContext } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { ThemeContext } from '../../context/ThemeContext';

const PaymentFail = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <section
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: theme.background }}
      >
        <div className="text-center">
          <h1 className={`text-6xl font-bold ${theme.name == 'light' ? 'text-black' : 'text-[#FF0040]'}`}>
            Payment Fail
          </h1>
          <p className="mt-2 text-lg" style={{ color: theme.textColor }}>Please Contact Your Bank</p>
        </div>
      </section>
    </>
  );
};

export default PaymentFail;
