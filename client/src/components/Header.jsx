import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoTriangleUp } from "react-icons/go";
import { useState } from 'react';
import UserMenu from '../pages/UserMenu';
import { GoTriangleDown } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";

import { useEffect } from 'react';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRuppe';
import { GlobalContext, useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';


const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const cartItem =useSelector(state => state.cartItem.cart)
//  const [totalPrice,setTotalPrice]=useState(0)
// const [totalQty , setTotalQty] =useState(0)
const {totalPrice,totalQty}=useGlobalContext()
const [openCartSection,setOpenCartSection]=useState(false)

 
  const redirectToLoginPage = () => {
    navigate('/login')
  }
  const handleCloseMenu = ()=>{
    setOpenUserMenu(false)
  }
  const handleMobileUser=()=>{
      if(!user._id){
        navigate("/login")
        return
      }
      navigate("/user")
  }
  //total item and total price 
// useEffect(()=>{
//    const qty = cartItem.reduce((preve,curr)=>{
//     return preve + curr.quantity

//     },0)
    
// setTotalQty(qty)
// const tPrice =cartItem.reduce((preve,curr)=>{
//   return preve + (curr.productId.price * curr.quantity)
// },0)
// setTotalPrice(tPrice)
// },[cartItem])

  return (
    <header className='h-24 lg:h-20 lg:shadow-lg sticky top-0 z-40 flex  flex-col justify-center gap-1 bg-white'>
      {
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center  px-2 justify-between'>
            {/* logo */}
            <div className='h-full'>
              <Link to={"/"} className='h-full py-1 flex justify-center items-center'>
                {/* <img src={logo} width={170} height={60} alt="logo" className='hidden lg:block' />
                <img src={logo} width={120} height={60} alt="logo" className='lg:hidden' /> */}
             


  {/* Desktop Logo */}
  <span
    className="hidden lg:block  font-extrabold text-3xl tracking-wide"
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
    className="lg:hidden font-extrabold text-2xl  tracking-wide"
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

            {/* search */}
            <div className='hidden lg:block'>
              <Search />
            </div>

            {/* cart mobile*/}
            <div>
              <button className='lg:hidden text-black hover:text-neutral-400 animate-pulse ' onClick={handleMobileUser}>
                <GiHamburgerMenu size={26} />
              </button>
              {/* desktop */}
              <div className="hidden lg:flex items-center gap-10">
                {
                  user?._id ? (
                    <div className='relative' >
                      <div className='flex items-center gap-2 cursor-pointer select-none' onClick={()=>setOpenUserMenu(preve => !preve)}><p>Account</p>{
                        openUserMenu ? (<GoTriangleUp size={22} />) : (<GoTriangleDown size={22} />)
}
 </div>
 {
  openUserMenu && (  <div className='absolute right-0 top-12 '>
                         <div className='min-w-52 bg-white p-4 rounded lg:shadow-md'>
                          <UserMenu close={handleCloseMenu}/>
                         
                          </div>
                      </div>)
 }
                     </div>
                  ) :
                    (<button onClick={redirectToLoginPage} className='text-lg px-2'>login</button>)
                }

                <button onClick={()=>setOpenCartSection(true)} className='flex text-xs items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white'>
                  <div className='animate-bounce'>
                    <BsCart4 size={26} />
                  </div>

                  <div className='font-semibold'>
                    {
                      cartItem[0]?(
                        <div>
                          <p>{totalQty} Items</p>
                          <p>{DisplayPriceInRupees(totalPrice)}</p>
                        </div>
                      ):(
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
      <div className='container mx-auto px-2 lg:hidden'>
        <Search />
      </div>
{
  openCartSection && (
    <DisplayCartItem close={()=>{setOpenCartSection(false)

    }}/>
  )
}

    </header>
  )
}

export default Header
