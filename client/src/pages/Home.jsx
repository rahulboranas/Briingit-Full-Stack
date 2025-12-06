
import React from 'react'
import banner from '../assets/banner.jpg'
import mobilebanner from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import valideURLConvert from '../utils/valideURLConvert'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import Slider from "react-slick"

// ⚡ slick-carousel CSS import (important)
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import CategoryCardComponent from '../components/CategoryCardComponent'

const Home = () => {
 

  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)

  const navigate = useNavigate()

  const handleRedirectProductListPage = (id, cat) => {
    const subcategory = subCategoryData.find(sub => {
      return sub.category.some(c => c._id === id)
    })

    if (subcategory) {
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
      navigate(url)
    }
  }

  const banners = [banner, banner,banner,banner] // you can add more images here
  const mobilebanners =[mobilebanner,mobilebanner,mobilebanner]

  // ⚡ Slider settings
  const settings = {
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: true,
    arrows: false, // next/prev arrows hide
    dots: false,    // bottom dots show
    slidesToShow: 1,
    slidesToScroll: 1
  }


  return (
    <section className='bg-white'>
      <div className='container mx-auto'>
        <div className={`w-full  h-full bg-white rounded ${!banner && "animate-pulse my-2"}`}>

          {/* Desktop slider */}
          <div className="hidden lg:block">
            <Slider {...settings}>
              {banners.map((img, i) => (
                <div key={i}>
                  <img
                    src={img}
                    alt="banner"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Mobile banner (static image) */}
          <div className='lg:hidden'>
              <Slider {...settings}>
              {mobilebanners.map((img, i) => (
                <div key={i+"mobilebanner"}>
                  <img
                    src={img}
                    alt="banner"
                    className="w-full h-full  object-cover rounded"
                  />
                </div>
              ))}
            </Slider>
          </div>
<div
  className="overflow-hidden whitespace-nowrap  mb-4 "
  style={{
    background: "linear-gradient(90deg, #000000, #001a33, #003366)",
  }}
>
  <style>
    {`
      @keyframes marqueeScroll {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}
  </style>

  {/* Main track */}
  <div
    className="flex"
    style={{
      width: "200%",
      animation: "marqueeScroll 12s linear infinite",
    }}
  >
    {/* FIRST COPY */}
    <p className="text-white text-[15px] tracking-wide font-semibold py-1 lg:py-2 pr-10">
      Currently we deliver only in Virar, Vasai, Nallasopara &nbsp; &nbsp; &nbsp; &nbsp;
      Currently we deliver only in Virar, Vasai, Nallasopara &nbsp; &nbsp; &nbsp; &nbsp;
       Currently we deliver only in Virar, Vasai, Nallasopara &nbsp; &nbsp; &nbsp; &nbsp;
    </p>

    {/* SECOND COPY (mirror for smooth loop) */}
    <p className="text-white text-[15px] tracking-wide font-semibold py-1 lg:py-2 pr-10">
       Currently we deliver only in Virar, Vasai, Nallasopara &nbsp; &nbsp; &nbsp; &nbsp;
       Currently we deliver only in Virar, Vasai, Nallasopara &nbsp; &nbsp; &nbsp; &nbsp;
       Currently we deliver only in Virar, Vasai, Nallasopara &nbsp; &nbsp; &nbsp; &nbsp;
    </p>
  </div>
</div>



        </div>
      </div>

      {/* Category section */}
      <div className='container gap-2  mx-auto px-4 my-2 grid grid-cols-3 md:grid-cols-8 lg:grid-cols-10'>
        {loadingCategory ? (
          new Array(20).fill(null).map((_, index) => (
            <div key={index} className='bg-white rounded p-4 animate-pulse min-h-36 grid gap-2 shadow-md'>
              <div className='bg-blue-100 min-h-24 rounded'></div>
              <div className='bg-blue-100 h-8 rounded'></div>
            </div>
          ))
        ) : (
          categoryData.map((cat, index) => (
            <div
              key={cat._id || index}
              className='w-full h-full cursor-pointer'
              onClick={() => handleRedirectProductListPage(cat._id, cat.name)}
            >
             
              <CategoryCardComponent cat={cat}/>
            </div>
          ))
        )}
      </div>

      {/* Category-wise products */}
      <div className='mx-2'>
        {categoryData.map((c) => (
          <CategoryWiseProductDisplay
            key={c?._id + "categoryWiseProduct"}
            id={c?._id}
            name={c?.name}
          />
        ))}
      </div>
    </section>
  )
}

export default Home



// import React from 'react'
// import banner from '../assets/banner.jpg'
// import mobilebanner from '../assets/banner-mobile.jpg'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import valideURLConvert from '../utils/valideURLConvert'
// import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
// import Slider from "react-slick"

// // ⚡ slick-carousel CSS import (important)
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"

// const Home = () => {
//   const loadingCategory = useSelector(state => state.product.loadingCategory)
//   const categoryData = useSelector(state => state.product.allCategory)
//   const subCategoryData = useSelector(state => state.product.allSubCategory)

//   const navigate = useNavigate()

//   const handleRedirectProductListPage = (id, cat) => {
//     const subcategory = subCategoryData.find(sub => {
//       return sub.category.some(c => c._id === id)
//     })

//     if (subcategory) {
//       const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
//       navigate(url)
//     }
//   }

//   const banners = [banner, banner,banner,banner] // you can add more images here
//   const mobilebanners =[mobilebanner,mobilebanner,mobilebanner]

//   // ⚡ Slider settings
//   const settings = {
//     autoplay: true,
//     autoplaySpeed: 1500,
//     infinite: true,
//     arrows: false, // next/prev arrows hide
//     dots: false,    // bottom dots show
//     slidesToShow: 1,
//     slidesToScroll: 1
//   }

//   return (
//     <section className='bg-white'>
//       <div className='container mx-auto'>
//         <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2"}`}>

//           {/* Desktop slider */}
//           <div className="hidden lg:block">
//             <Slider {...settings}>
//               {banners.map((img, i) => (
//                 <div key={i}>
//                   <img
//                     src={img}
//                     alt="banner"
//                     className="w-full h-full object-cover rounded"
//                   />
//                 </div>
//               ))}
//             </Slider>
//           </div>

//           {/* Mobile banner (static image) */}
//           <div className='lg:hidden'>
//               <Slider {...settings}>
//               {mobilebanners.map((img, i) => (
//                 <div key={i+"mobilebanner"}>
//                   <img
//                     src={img}
//                     alt="banner"
//                     className="w-full h-full  object-cover rounded"
//                   />
//                 </div>
//               ))}
//             </Slider>
//           </div>
          
//           {/* <img
//             src={mobilebanner}
//             className='w-full h-full lg:hidden object-cover rounded'
//             alt='banner'
//           /> */}
//         </div>
//       </div>

//       {/* Category section */}
//       <div className='container gap-2 mx-auto px-4 my-2 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10'>
//         {loadingCategory ? (
//           new Array(20).fill(null).map((_, index) => (
//             <div key={index} className='bg-white rounded p-4 animate-pulse min-h-36 grid gap-2 shadow-md'>
//               <div className='bg-blue-100 min-h-24 rounded'></div>
//               <div className='bg-blue-100 h-8 rounded'></div>
//             </div>
//           ))
//         ) : (
//           categoryData.map((cat, index) => (
//             <div
//               key={cat._id || index}
//               className='w-full h-full cursor-pointer'
//               onClick={() => handleRedirectProductListPage(cat._id, cat.name)}
//             >
//               <div>
//                 <img
//                   src={cat.image}
//                   alt='category'
//                   className='w-full h-full object-scale-down'
//                 />
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Category-wise products */}
//       <div className='mx-2'>
//         {categoryData.map((c) => (
//           <CategoryWiseProductDisplay
//             key={c?._id + "categoryWiseProduct"}
//             id={c?._id}
//             name={c?.name}
//           />
//         ))}
//       </div>
//     </section>
//   )
// }

// export default Home

