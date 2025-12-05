import React from 'react'
import { FaArrowRight } from "react-icons/fa";

const CategoryCardComponent = ({ cat }) => {
  return (
    <div
      className="
        bg-orange-50 
        hover:bg-orange-100 
        rounded
        p-2
        lg:p-4
        h-32 
        lg:h-56
        shadow-sm
        hover:shadow-md
        transition-all 
        duration-300 
        cursor-pointer
        flex 
        flex-col 
        items-center
      "
    >
      {/* IMAGE */}
      <div className="w-full h-20 lg:h-36 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
        <img
          src={cat.image}
          alt={cat.name}
          className="h-full object-contain"
        />
      </div>

      {/* TITLE + ARROW */}
      <div className="flex items-center justify-center gap-2 mt-2">
        <p className="text-center font-semibold text-gray-800 text-[11px] lg:text-sm line-clamp-2">
          {cat.name}
        </p>

      </div>
    </div>
  );
};

export default CategoryCardComponent;

