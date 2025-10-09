import { useEffect, useState } from 'react';

const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  const handleResize = () => {
    setIsMobile(window.innerWidth < breakpoint);
  };

  useEffect(() => {
    // listener add karo
    window.addEventListener('resize', handleResize);

    // mount ke time pe ek baar check karo
    handleResize();

    // cleanup pe listener remove karo
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return [isMobile];
};

export default useMobile;

// import React,{useEffect , useState} from 'react';
// const useMobile = (breakpoint = 720)=>{
//     const [isMobile,setIsMobile]=useState(window.innerWidth < breakpoint)
//     const handleResize = ()=>{
//         const checkpoint = window.innerWidth < breakpoint
//         setIsMobile(checkpoint)
//     }
//     useEffect(()=>{
//         handleResize()
//         window.removeEventListener('resize',handleResize)
//         return ()=>{
//             window.removeEventListener('resize',handleResize)
//         }
//     },[])
//     return [ isMobile]
// }
// export default useMobile