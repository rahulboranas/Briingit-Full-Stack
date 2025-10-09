import React from 'react'
// import './index.css'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";


const Footer = () => {
  return (
  <footer className='border-t border border-gray-200'>
     <div className='container mx-auto p-6 text-center flex flex-col lg:flex-row lg:justify-between gap-4'>
        <p className="text-primary-200">© All Rights Reserved 2024</p>
        <div className='flex items-center gap-4 justify-center text-2xl'>
            <a href=''  className='hover:text-[#ffc929]' ><FaFacebook /></a>
             <a href='' className='hover:text-[#ffc929]'><FaInstagram/></a>
              <a href=''className='hover:text-[#ffc929]'><FaLinkedin /></a>
        </div>
     </div>
  </footer>
  )
}

export default Footer
