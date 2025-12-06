import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import UserMenu from '../pages/UserMenu';
import { GiHamburgerMenu } from "react-icons/gi";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRuppe';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';

const Header = () => {

  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user)

  const [openUserMenu, setOpenUserMenu] = useState(false)

  const cartItem = useSelector(state => state.cartItem.cart)
  const { totalPrice, totalQty } = useGlobalContext()
  const [openCartSection, setOpenCartSection] = useState(false)

  // 🔥 NEW STATE to manage toggle
  const [menuOpened, setMenuOpened] = useState(false)


  // 🔥 Hamburger toggle handler
  const handleHamburgerToggle = () => {

    // user login check
    if (!user._id) {
      navigate("/login")
      return
    }

    if (menuOpened) {
      // already opened → now go Home
      navigate("/")
    } else {
      // first time → open user page
      navigate("/user")
    }

    // toggle
    setMenuOpened(!menuOpened)
  }



  const redirectToLoginPage = () => navigate('/login')
  const handleCloseMenu = () => setOpenUserMenu(false)


  return (
    <header className='h-24 lg:h-20 lg:shadow-lg sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
      {
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center px-2 justify-between'>

            {/* LOGO */}
            <div className='h-full'>
              <Link to={"/"} className='h-full py-1 flex justify-center items-center'>

                {/* Desktop Logo */}
                <span
                  className="hidden lg:block font-extrabold text-3xl tracking-wide"
                  style={{
                    background: "linear-gradient(90deg, #ff3d00, #ff6a00, #ff8f00)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  BriingIt
                </span>

                {/* Mobile Logo */}
                <span
                  className="lg:hidden font-extrabold text-2xl tracking-wide"
                  style={{
                    background: "linear-gradient(90deg, #ff3d00, #ff6a00, #ff8f00)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  BriingIt
                </span>

              </Link>
            </div>


            {/* SEARCH */}
            <div className='hidden lg:block'>
              <Search />
            </div>


            {/* MOBILE HAMBURGER */}
            <div>
              <button
                className='lg:hidden text-black hover:text-neutral-400 animate-pulse'
                onClick={handleHamburgerToggle}
              >
                <GiHamburgerMenu size={26} />
              </button>


              {/* DESKTOP MENU */}
              <div className="hidden lg:flex items-center gap-10">

                {
                  user?._id ? (
                    <div className='relative'>
                      <div
                        className='flex items-center gap-2 cursor-pointer select-none'
                        onClick={() => setOpenUserMenu(preve => !preve)}
                      >
                        <p>Account</p>
                        {openUserMenu ? <GoTriangleUp size={22} /> : <GoTriangleDown size={22} />}
                      </div>

                      {openUserMenu && (
                        <div className='absolute right-0 top-12'>
                          <div className='min-w-52 bg-white p-4 rounded lg:shadow-md'>
                            <UserMenu close={handleCloseMenu} />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                    : (
                      <button onClick={redirectToLoginPage} className='text-lg px-2'>login</button>
                    )
                }

                <button
                  onClick={() => setOpenCartSection(true)}
                  className='flex text-xs items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white'
                >
                  <div className='animate-bounce'>
                    <BsCart4 size={26} />
                  </div>

                  <div className='font-semibold'>
                    {
                      cartItem[0] ? (
                        <div>
                          <p>{totalQty} Items</p>
                          <p>{DisplayPriceInRupees(totalPrice)}</p>
                        </div>
                      ) : (
                        <p>My Cart</p>
                      )
                    }
                  </div>
                </button>

              </div>
            </div>

          </div>
        )
      }


      {/* MOBILE SEARCH */}
      <div className='container mx-auto px-2 lg:hidden'>
        <Search />
      </div>


      {/* CART SECTION */}
      {
        openCartSection && (
          <DisplayCartItem close={() => setOpenCartSection(false)} />
        )
      }

    </header>
  )
}

export default Header
