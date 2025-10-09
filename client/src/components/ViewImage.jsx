import React from 'react'
import { IoCloseOutline } from "react-icons/io5";

const ViewImage = ({ url, close }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/70 flex justify-center items-center p-4 z-50">
      <div className="w-full max-w-md max-h-[80vh] p-4 bg-white rounded-lg">
        <button onClick={close} className="block ml-auto text-gray-400 hover:text-gray-900">
          <IoCloseOutline size={25} />
        </button>
        <img
          src={url}
          alt="full screen"
          className="w-full max-h-[80vh] lg:max-h-[60vh] object-contain"
        />
      </div>
    </div>
  )
}

export default ViewImage
