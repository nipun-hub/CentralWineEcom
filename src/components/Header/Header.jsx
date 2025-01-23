import React, { useState, useContext } from 'react'
import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
  HeartOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import Login from '../Login/Login'
import SignUp from '../Signup/Signup'
import { Button, Dropdown, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useGetCartItemsQuery } from '../../features/api/cartSlice'
import { logout } from '../../features/reducer/authSlice'
import { useGetImageQuery } from '../../features/api/imageSlice'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false) // Hamburger menu state
  const { toggleTheme, theme } = useContext(ThemeContext)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    const { data: imageData} = useGetImageQuery()

  const getImageBySection = (section) => {
    const image = imageData?.find((img) => img.section === section)
    return image ? image.imageUrl : '' // Return the URL if found, otherwise an empty string
  }

  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  // if (!(user?.isAuthenticated)) {
  //   navigate('/NotFound')
  // }

  const dispatch = useDispatch()

  const handleLogout = () => {
    console.log('logout')
    dispatch(logout())
    navigate('/')
  }

  const userId = useSelector((state) => state.auth.userId)
  const { data: cartItem, error, isLoading } = useGetCartItemsQuery(userId)

  // model section
  const [showCustomModelLogin, setShowCustomModelLogin] = useState(false)
  const openCustomModelLogin = (id) => {
    setShowCustomModelLogin(true)
  }

  const [showCustomModelSignUp, setShowCustomModelSignUp] = useState(false)
  const openCustomModelSignUp = (id) => {
    setShowCustomModelSignUp(true)
  }

  const [isExpanded, setIsExpanded] = useState(false)

  const items = [
    {
      key: '1',
      label: (
        <Link to="/my-account">
          <p>Account</p>
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={handleLogout}>
          Logout &nbsp; &nbsp;
          <LogoutOutlined className="rotate-180" />
        </div>
      ),
    },
  ]

  return (
    <header className="w-full p-4 px-8 bg-[#000000] text-[#ffffff]">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center" onClick={() => navigate('/')}>
          <img
            src={getImageBySection('logo')}
            alt="Logo"
            className="h-10 w-auto"
          />
        </div>

        {/* Right Side Links and Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`font-Merriweather text-base font-normal leading-[1.25rem] hover:text-colorTextGold400 ${currentPath === '/' && 'text-colorTextGold400'}`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`font-Merriweather text-base font-normal leading-[1.25rem] hover:text-colorTextGold400 ${currentPath === '/shop' && 'text-colorTextGold400'}`}
          >
            Shop
          </Link>
          <Link
            to="/contact"
            className={`font-Merriweather text-base font-normal leading-[1.25rem] hover:text-colorTextGold400 ${currentPath === '/contact' && 'text-colorTextGold400'}`}
          >
            Contact
          </Link>
          <div className="flex items-center space-x-4">
            <span
              onClick={toggleTheme}
              className="text-xl cursor-pointer hover:text-colorTextGold400"
            >
              {theme.icon}
            </span>
            <Link to="/cart">
              <div className="flex h-8">
                <ShoppingCartOutlined
                  className={`relative text-xl cursor-pointer hover:text-colorTextGold400 ${currentPath === '/cart' && 'text-colorTextGold400'}`}
                />
                <span
                  class={`relative flex h-3 w-3 ${(!cartItem?.length > 0 || !isAuthenticated) && 'hidden'}`}
                >
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </div>
            </Link>
            <Link to="/favorite">
              <HeartOutlined
                className={`text-xl cursor-pointer hover:text-colorTextGold400 ${currentPath === '/favorite' && 'text-colorTextGold400'}`}
              />
            </Link>
            {isAuthenticated ? (
              // <Link to='/my-account'>
              //   <UserOutlined className="text-xl cursor-pointer hover:text-colorTextGold400" />
              // </Link>
              // <Dropdown menu={{ items }} placement="bottomLeft">
              //   <UserOutlined className="text-xl cursor-pointer hover:text-colorTextGold400" />
              // </Dropdown>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottom"
              >
                <UserOutlined
                  className={`text-xl cursor-pointer hover:text-colorTextGold400 ${currentPath === '/my-account' && 'text-colorTextGold400'}`}
                />
              </Dropdown>
            ) : (
              <UserOutlined
                className="text-xl cursor-pointer hover:text-colorTextGold400"
                onClick={openCustomModelLogin}
              />
            )}
            <div
              className={`relative flex items-center rounded-full ps-2 h-[33px] transition-all duration-300 ${
                isExpanded ? 'w-[263px]' : 'w-10'
              }`}
              style={{
                borderWidth: isExpanded ? '1px' : '0px',
                borderColor: 'white',
                transition: 'border-width 0.2s, width 0.3s',
              }}
            >
              <SearchOutlined
                className=" text-xl cursor-pointer hover:text-colorTextGold400 opacity-100"
                onClick={() => setIsExpanded(!isExpanded)}
              />
              <Input
                placeholder="Search"
                variant="borderless"
                type="text"
                className="placeholder:text-white z-10 text-white bg-transparent"
                style={{
                  opacity: isExpanded ? 1 : 0,
                  transition: 'opacity 0.3s',
                }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex items-center md:hidden">
          <div className="flex items-center space-x-4">
            <span
              onClick={toggleTheme}
              className="text-xl cursor-pointer hover:text-colorTextGold400"
            >
              {theme.icon}
            </span>
            <Link to="/cart">
              <div className="flex h-8">
                <ShoppingCartOutlined
                  className={`relative text-xl cursor-pointer hover:text-colorTextGold400 ${currentPath === '/cart' && 'text-colorTextGold400'}`}
                />
                <span
                  className={`relative flex h-3 w-3 ${(!cartItem?.length > 0 || !isAuthenticated) && 'hidden'}`}
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </div>
            </Link>
            <Link to="/favorite">
              <HeartOutlined
                className={`text-xl cursor-pointer hover:text-colorTextGold400 ${currentPath === '/favorite' && 'text-colorTextGold400'}`}
              />
            </Link>
            {isAuthenticated ? (
              // <Link to='/my-account'>
              //   <UserOutlined className="text-xl cursor-pointer hover:text-colorTextGold400" />
              // </Link>
              // <Dropdown menu={{ items }} placement="bottomLeft">
              //   <UserOutlined className="text-xl cursor-pointer hover:text-colorTextGold400" />
              // </Dropdown>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottom"
              >
                <UserOutlined
                  className={`text-xl cursor-pointer hover:text-colorTextGold400 ${currentPath === '/my-account' && 'text-colorTextGold400'}`}
                />
              </Dropdown>
            ) : (
              <UserOutlined
                className="text-xl cursor-pointer hover:text-colorTextGold400"
                onClick={openCustomModelLogin}
              />
            )}
            {/*<div*/}
            {/*  className={`relative flex items-center rounded-full ps-2 h-[33px] transition-all duration-300 ${*/}
            {/*    isExpanded ? 'w-[263px]' : 'w-10'*/}
            {/*  }`}*/}
            {/*  style={{*/}
            {/*    borderWidth: isExpanded ? '1px' : '0px',*/}
            {/*    borderColor: 'white',*/}
            {/*    transition: 'border-width 0.2s, width 0.3s',*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <SearchOutlined*/}
            {/*    className=" text-xl cursor-pointer hover:text-colorTextGold400 opacity-100"*/}
            {/*    onClick={() => setIsExpanded(!isExpanded)}*/}
            {/*  />*/}
            {/*  <Input*/}
            {/*    placeholder="Search"*/}
            {/*    variant="borderless"*/}
            {/*    type="text"*/}
            {/*    className="placeholder:text-white z-10 text-white bg-transparent"*/}
            {/*    style={{*/}
            {/*      opacity: isExpanded ? 1 : 0,*/}
            {/*      transition: 'opacity 0.3s',*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
          <MenuOutlined
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl cursor-pointer ml-4 hover:text-gray-400"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="mx-8 my-6 bg-[#191716] flex flex-col items-center space-y-8 p-4 rounded-md">
            <Link
              to="/"
              className="hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/contact"
              className="hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
      <Login
        showCustomModel={showCustomModelLogin}
        setShowCustomModel={setShowCustomModelLogin}
        openSignUp={openCustomModelSignUp}
        width="577px"
      />
      <SignUp
        showCustomModel={showCustomModelSignUp}
        setShowCustomModel={setShowCustomModelSignUp}
        openLogin={openCustomModelLogin}
        width="577px"
      />
    </header>
  )
}

export default Header
