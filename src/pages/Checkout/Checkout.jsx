import React, { useContext } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { ThemeContext } from '../../context/ThemeContext';
import { Input, Button, Radio, Divider, Card } from 'antd';

const Checkout = () => {
  const { theme } = useContext(ThemeContext);
  const tempImage = 'https://www.alkovintages.com/wp-content/uploads/2019/09/dry-red.png';
  const visa = 'https://d28wu8o6itv89t.cloudfront.net/images/Visadebitcardpng-1599584312349.png';
  const master = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ85e7wSjDoYEQPhrG39JAPJezMJT2nBgSKg&s';
  const amex = 'https://www.pay.nl/hubfs/chub_backup/American-Express-Color.png';
  const card = 'https://bd.visa.com/dam/VCOM/regional/ap/bangladesh/global-elements/images/bd-visa-gold-card-498x280.png';


  return (
    <div style={{ backgroundColor: theme.background }}>
      <div className="container mx-auto p-6" style={{ backgroundColor: theme.background }}>
        <h1 className="text-3xl font-bold mb-16">Checkout</h1>

        <div className="flex gap-8" style={{ backgroundColor: theme.background }}>
          {/* Left Section */}
          <div className="flex-1 space-y-6">
            {/* Payment Options */}
            <section>
              <h2 className="text-sm font-semibold">Payment Options</h2>
              <div className='h-1 rounded w-32 bg-blue-300'></div>

              <div className="flex items-center space-x-4 mt-10 gap-7">
                <img src={visa} alt="Visa" className="w-10" />
                <img src={master} alt="MasterCard" className="w-10" />
                <img src={amex} alt="Amex" className="w-10" />
                <img src={master} alt="Amex" className="w-10" />
              </div>

              <div className='my-5'>
                <span className='text-xs text-neutral-400'>We support the card type above</span>
              </div>
            </section>

            <div className='flex'>
              {/* card block  */}
              <div className="relative w-[419px]  rounded-2xl shadow-sm p-6 overflow-hidden h-[245px]">
                <div className="absolute inset-0 bg-[#FEFFC1]" />

                <div
                  className="absolute inset-0 bg-[#89580A]"
                  style={{
                    clipPath: 'circle(60% at 100% 25%)'
                  }}
                />

                {/* Card content */}
                <div className="relative  p-6 h-full flex flex-col justify-between">
                  <div className='text-gray-600 flex flex-col justify-around h-full'>

                    <div className='flex flex-col items-start'>
                      <div className="text-xs mb-1 font-semibold">Card Number</div>
                      <div className="font-mono text-gray-800 tracking-wider mb-6">
                        1234 4567 7890 1234
                      </div>
                    </div>

                    <div className='flex justify-between pe-10'>
                      <div>
                        <div className="font-semibold text-xs mb-1">Card Name</div>
                        <div className="font-mediu">
                          Jenn Jiang
                        </div>
                      </div>

                      <div>
                        <div className="text-[#E7E7E7] text-xs mb-1">Exp.Date</div>
                        <div className="font-medium text-[#888888]">12/30</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <Card className='text-xs text-neutral-400 border-none bg-transparent'>
                <div className='flex flex-col gap-3 mb-7'>
                  <label htmlFor="">Name</label>
                  <input type="text" placeholder='Jenn Jiang' className='border-b-2 w-[270px] placeholder:text-neutral-600 bg-transparent font-semibold text-sm outline-none' style={{ color: theme.topicTextColor, backgroundColor: theme.background }} />
                </div>
                <div className='flex flex-col gap-3 my-7'>
                  <label htmlFor="">Card Number</label>
                  <input type="text" placeholder='1234456778901234' className='border-b-2 w-[270px] placeholder:text-neutral-600 bg-transparent font-semibold text-sm outline-none' />
                </div>
                <div className='flex justify-between w-full mt-7'>
                  <div className='flex flex-col gap-3 w-2/5'>
                    <label htmlFor="">Exp.Date</label>
                    <input type="text" placeholder='12/13' className='border-b-2 placeholder:text-neutral-600 bg-transparent font-semibold text-sm outline-none' />
                  </div>
                  <div className='flex flex-col gap-3 w-2/5'>
                    <label htmlFor="">cvv</label>
                    <input type="text" placeholder='233' className='border-b-2  placeholder:text-neutral-600 bg-transparent font-semibold text-sm outline-none' />
                  </div>
                </div>
              </Card>
            </div>

            <section>
              <h2 className="text-sm font-semibold">Payment Options</h2>
              <div className='h-1 rounded w-32 bg-blue-300'></div>
            </section>

            <Card className='border-none text-xs text-neutral-400 bg-transparent'>
              <div className='flex gap-8 w-full'>
                <div className='flex flex-col gap-3 mb-7 w-full'>
                  <label htmlFor="">Name</label>
                  <input type="text" placeholder='Poorna Kawishla' className='border-b-2 placeholder:text-neutral-600 bg-transparent font-semibold text-sm outline-none' />
                </div>
                <div className='flex flex-col gap-3 mb-7 w-full'>
                  <label htmlFor="">Phone</label>
                  <input type="text" placeholder='+94 777 60 4869' className='border-b-2 placeholder:text-neutral-600 bg-transparent font-semibold text-sm outline-none' />
                </div>
              </div>

              <div className='flex flex-col gap-3 mb-7'>
                <label htmlFor="">Address</label>
                <input type="text" placeholder='Karanthippala,Kuliyapitiya' className='border-b-2 placeholder:text-neutral-600 bg-transparent font-semibold text-sm outline-none' />
              </div>

              <div className='flex flex-col gap-3 mb-7'>
                <label htmlFor="">Apt, Suite</label>
                <input type="text" placeholder='pahala piduma ' className='border-b-2 placeholder:text-neutral-600 bg-transparent font-semibold text-sm outline-none' />
              </div>

              <div className='flex gap-8'>

                <div className='flex flex-col gap-3 mb-7 w-full'>
                  <label htmlFor="">City</label>
                  <input type="text" placeholder='Kuliyapitiya' className='border-b-2 placeholder:text-neutral-600 bg-transparent font-semibold text-sm outline-none' />
                </div>
                <div className='flex flex-col gap-3 mb-7 w-full'>
                  <label htmlFor="">State</label>
                  <input type="text" placeholder='Kurunegale' className='border-b-2 placeholder:text-neutral-600 bg-transparent font-semibold text-sm outline-none' />
                </div>
                <div className='flex flex-col gap-3 mb-7 w-full'>
                  <label htmlFor="">Postal Code</label>
                  <input type="text" placeholder='60200' className='border-b-2 placeholder:text-neutral-600 bg-transparent font-semibold text-sm outline-none' />
                </div>

              </div>
            </Card>

          </div>

          {/* Right Section */}
          <div className="w-[382px] space-y-6">
            {/* Order Summary */}
            <section className=" p-4 ">
              <div className='flex justify-between mb-5 text-sm '>
                <div>Older Summary</div>
                <div>$ 518.99</div>
              </div>
              <div className='flex justify-between mb-5 text-xs text-neutral-400'>
                <div>Subtotal</div>
                <div>$ 518.99</div>
              </div>
              <div className='flex justify-between mb-5 text-xs text-neutral-400'>
                <div>Membership Discount</div>
                <div>20%</div>
              </div>
              <div className='flex justify-between mb-5 text-xs text-neutral-400'>
                <div>Tax</div>
                <div>$10</div>
              </div>
              <hr />
              <Button className="w-full mt-4 font-bold py-5 border-none" style={{ backgroundColor: theme.buttonBackground2, color: theme.background }}>
                Checkout
              </Button>
            </section>

            {/* Product Info */}
            <section className=" p-4 flex items-center space-x-4">
              <img src={tempImage} alt="Product" className="w-[144px]" />
              <div className='flex flex-col gap-4'>
                <h3 className="text-sm text-gray-500 font-semibold">SLIM COMBO for iPad</h3>
                <p className="text-gray-500 text-xs">(5th and 6th generation )</p>
                <div className='flex gap-5 items-center'><div className='bg-black h-6 w-6 rounded-full'></div><span className='text-sm text-gray-500'>Black</span></div>
                <div className='flex justify-between'>
                  <p className='text-sm font-semibold text-gray-500'>X1</p>
                  <p className='text-sm font-semibold text-gray-500'>$ 119.99</p>
                </div>
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
