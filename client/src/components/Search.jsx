import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useMobile from '../hooks/useMobile';

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage  , setIsSearchPage] = useState(false)
    const [isMobile] = useMobile()
    const params = useLocation()
    const searchText = params.search.slice(3)
    useEffect(()=>{
       const isSearch = location.pathname === "/search"
       setIsSearchPage(isSearch)
    },[location])
   
    const redirectToSearchPage = () => {
        navigate('/search')
    }
    const handleOnChange=(e)=>{
        const value = e.target.value
        const url =`/search?q=${value}`
        navigate(url)
    }
    return (<div className='flex w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden items-center bg-slate-50  text-neutral-500 group focus-within:border-[#e6ac00]'>
        <div>
          
            {
                (isMobile && isSearchPage) ? (
                     <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-[#e6ac00] bg-white rounded-full shadow-md'>
            <FaArrowLeft size={22} />
        
        </Link>
                ) : (
                        <button className='flex justify-center items-center h-full p-3 group-focus-within:text-[#e6ac00]'>
            <FaSearch size={22} /></button>
                )
            }
             
        </div>
      
        <div className='w-full'>
            {
                !isSearchPage ? (
                    //not in search page
                     <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
            <TypeAnimation
                sequence={[

                    'Search for an Pen',
                    1000,
                    'Search for an Colors',
                    1000,
                    'Search for an Books',
                    1000,
                    'Search for an Bread',
                    1000,
                    'Search for an HouseAccessory',
                    1000,
                    'Search for an Sauches',
                    1000,
                    'Search for an Biscuites',
                    1000,
                    'Search for an Perfumes',
                    1000,
                    'Search for an Files',
                    1000,
                    'Search for an Gifts',
                    1000,
                ]}
                wrapper="span"
                speed={50}

                repeat={Infinity}
            />
        </div>
                ):(
                    //when i was search page
                    <div className='w-full h-full'>
                         <input 
                         type='text'
                         placeholder='Search for atta dal and more.'
                         autoFocus
                         defaultValue={searchText}
                         className='bg-transparent w-full h-full outline-none'
                         onChange={handleOnChange}/>
                         
                    </div>
                )
            }
        </div>
      
        {/* <div className='flex h-full items-center'>
            wait
        </div> */}
    </div>
    )
}
export default Search 