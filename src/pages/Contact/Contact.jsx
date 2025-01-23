import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useContext } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { ThemeContext } from '../../context/ThemeContext'

const Contact = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <>
            <div className='flex justify-center items-center h-screen' style={{ backgroundColor: theme.background }} >
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:w-1/2 items-center'>
                    <div className={`flex flex-col w-full ${theme.name == 'light' ? 'text-red-950' : 'text-[#FFEEF2]'}`}>
                        <h3 className='text-2xl'>Get in touch</h3>
                        <span className={`h-px w-1/2 mb-3 ${theme.name == 'light' ? 'bg-red-950' : 'bg-[#FFEEF2]'}`}></span>
                        <div>
                            <p><EnvironmentOutlined />&nbsp;&nbsp; <span className='opacity-60' style={{ color: theme.textColor }}>35 W 46nd Street Portugal</span></p>
                            <p><MailOutlined /> &nbsp;&nbsp;<span className='opacity-60' style={{ color: theme.textColor }}>vinrouge@dotcreativemarket.com</span></p>
                            <p><PhoneOutlined className='rotate-90' />&nbsp;&nbsp; <span className='opacity-60' style={{ color: theme.textColor }}>+(123) 456-7890-456-7890</span></p>
                        </div>
                    </div>
                    <div className={`px-10 py-7 flex flex-col gap-5 w-full ${theme.name == 'light' ? 'bg-neutral-100' : 'bg-[#212121]'}`}>
                        <div>
                            <label htmlFor="" className='text-xs opacity-60' style={{ color: theme.textColor }}>E mail or Phone</label>
                            <Input className='bg-transparent mt-1 py-2 hover:bg-transparent focus:bg-transparent ' style={{ borderColor: theme.textColor ,color: theme.textColor }} />
                        </div>
                        <div>
                            <label htmlFor="" className='text-xs opacity-60' style={{ color: theme.textColor }}>Message</label>
                            <TextArea rows={4} className='bg-transparent mt-1 py-2 hover:bg-transparent focus:bg-transparent' style={{ borderColor: theme.textColor, color: theme.textColor }} />
                        </div>

                        <button className='bg-transparent py-3 w-40 font-semibold opacity-60 border rounded-lg hover:scale-105 text-sm' style={{ color: theme.textColor, borderColor: theme.textColor }}>Submit</button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Contact