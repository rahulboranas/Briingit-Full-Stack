import { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SummeryApi from "../common/SummeryApi";
import Axios from "../utils/Axios";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PricewithDiscount";
import { handleAddAddress } from "../store/addressSlice";

export const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountPrice, setNotDiscountPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state?.user);

  // ===================== FETCH CART =====================
  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummeryApi.getCartItem,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ===================== UPDATE CART =====================
  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummeryApi.updateCartItem,
        data: {
          _id: id,
          qty: qty,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  // ===================== DELETE CART =====================
  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummeryApi.deleteCartItem,
        data: {
          _id: cartId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // FIRST TIME FETCH CART
  useEffect(() => {
    fetchCartItem();
  }, []);

  // ===================== PRICE CALCULATION =====================
  useEffect(() => {
    // Qty
    const qty = cartItem.reduce((preve, curr) => preve + curr.quantity, 0);
    setTotalQty(qty);

    // Discount Price
    const tPrice = cartItem.reduce((preve, curr) => {
      const priceAfterDiscount = pricewithDiscount(
        curr?.productId?.price,
        curr?.productId?.discount
      );
      return preve + priceAfterDiscount * curr.quantity;
    }, 0);

    setTotalPrice(tPrice);

    // MRP Price
    const notDiscountPrice = cartItem.reduce(
      (preve, curr) => preve + curr?.productId?.price * curr.quantity,
      0
    );

    setNotDiscountPrice(notDiscountPrice);
  }, [cartItem]);

  // ===================== LOGOUT =====================
  const handlelogoutOut = () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
  };

  // ===================== ADDRESS =====================
  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummeryApi.getAddress,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (user?._id) {
        fetchCartItem();
        fetchAddress();
    } else {
        dispatch(handleAddItemCart([]));  // CART CLEAR
    }
}, [user]);


  // REFETCH on user change
  // useEffect(() => {
  //   fetchCartItem();
  //   handlelogoutOut();
  //   fetchAddress();
  // }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        totalPrice,
        totalQty,
        notDiscountPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;


// import { createContext,useContext, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import SummeryApi from "../common/SummeryApi";
// import Axios from "../utils/Axios";
// import { useEffect } from "react";
// import { handleAddItemCart } from "../store/cartProduct";
// import AxiosToastError from "../utils/AxiosToastError";
// import toast from "react-hot-toast";
// import { pricewithDiscount } from "../utils/PricewithDiscount";
// import { handleAddAddress } from "../store/addressSlice";
// import { setOrder } from "../store/orderSlice";
// export const GlobalContext =createContext(null)
// export const useGlobalContext = ()=>useContext(GlobalContext)
// const GlobalProvider =({children})=>{
//     const dispatch =useDispatch()
//      const [totalPrice,setTotalPrice]=useState(0)
//      const [notDiscountPrice,setNotDiscountPrice]=useState(0)
//     const [totalQty , setTotalQty] =useState(0)

//       const cartItem =useSelector(state => state.cartItem.cart)
//       const user =useSelector(state => state?.user)
//       const fetchCartItem = async()=>{
//         try{
// const response = await Axios ({
//   ...SummeryApi.getCartItem
// })
// const {data : responseData}= response
// if(responseData.success){
//   dispatch(handleAddItemCart(responseData.data))

// }
//         }catch(error){
//           console.log(error)
//         }
//       }
//       const updateCartItem = async(id,qty)=>{
//         try{
// const response =await Axios({
//   ...SummeryApi.updateCartItem,
//   data:{
//     _id : id ,
//     qty : qty
//   }
// })
// const {data : responseData}=response
// if(responseData.success){
//   toast.success(responseData.message)
//   fetchCartItem()
//   return responseData
// }
//         }catch(error){

//           AxiosToastError(error)
//           return error
//         }
//       }
//       const deleteCartItem = async(cartId)=>{
// try{
//   const response = await Axios({
//     ...SummeryApi.deleteCartItem,
//     data:{
//       _id : cartId
//     }
//   })
//   const { data:responseData }=response
//   if(responseData.success){
//     toast.success(responseData.message)
//     fetchCartItem()
//   }
// }catch(error){
//   AxiosToastError("its ME rahukl");
// }
//       }
//       useEffect(()=>{
//          fetchCartItem()
//       },[])
//       useEffect(()=>{
//          const qty = cartItem.reduce((preve,curr)=>{
//           return preve + curr.quantity
      
//           },0)
          
//       setTotalQty(qty)
//       const tPrice =cartItem.reduce((preve,curr)=>{
//         // return preve + (curr.productId.price * curr.quantity)
//         const priceAfterDiscount =pricewithDiscount(curr?.productId?.price,curr?.productId?.discount)
//         return preve + (priceAfterDiscount * curr.quantity)
//       },0)
//       setTotalPrice(tPrice)

//        const notDiscountPrice =cartItem.reduce((preve,curr)=>{
//         return preve + (curr?.productId?.price * curr.quantity)
//         // const priceAfterDiscount =pricewithDiscount(curr?.productId?.price,curr?.productId?.discount)
//         // return preve + (priceAfterDiscount * curr.quantity)
//       },0)
//       setNotDiscountPrice(notDiscountPrice)
//       },[cartItem])
     
//       const handlelogoutOut =()=>{
//         localStorage.clear()
//         dispatch(handleAddItemCart([]))
//       }
//       const fetchAddress = async()=>{
//         try{
//                  const response = await Axios({
//                   ...SummeryApi.getAddress
//                  })
//                  const {data : responseData}=response
//                  if(responseData.success){
//                   dispatch(handleAddAddress(responseData.data))
//                  }
//         }catch(error){

//         }
//       }
//       const fetchOrder = async()=>{
//         try{
//              const response = await Axios({
//               ...SummeryApi.getOrderItems
//              })
//              const {data : responseData}=response
//              if(responseData.success){
// dispatch(setOrder(responseData.data))
//              }
//         }catch(error){
//           console.log(error)
//         }
//       }
//        useEffect(()=>{
//         fetchCartItem()
//         handlelogoutOut()
//         fetchAddress()
//         fetchOrder()
//       },[user])
//     return(
//         <GlobalContext.Provider value={{fetchCartItem,
//           updateCartItem,deleteCartItem,fetchAddress,totalPrice,totalQty,notDiscountPrice,fetchOrder
          
//         }}>
//             {children}
//         </GlobalContext.Provider>
//     )
// }
// export default GlobalProvider

