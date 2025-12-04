import { Outlet, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import './App.css'
import Header from './components/Header'
import Footer from './components/footer'
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import SummeryApi from './common/SummeryApi';
import { handleAddItemCart } from './store/cartProduct'
import GlobalProvider, { useGlobalContext } from './provider/GlobalProvider';
import { BsCart4 } from "react-icons/bs";
import CartMobileLink from './components/CartMobile';


function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }
  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummeryApi.getCategory
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))
        // setCategoryData(responseData.data)
      }

    } catch (error) {
      console.error("Error in fetchData:", error)
    } finally {
      dispatch(setLoadingCategory(false))
    }

  }
  const fetchSubCategory = async () => {
    try {

      const response = await Axios({
        ...SummeryApi.getSubCategory
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data))
        // setCategoryData(responseData.data)
      }

    } catch (error) {
      console.error("Error in fetchData:", error)
    } finally {

    }

  }
  //      const fetchCartItem = async()=>{
  //         try{
  // const response = await Axios ({
  //   ...SummeryApi.getCartItem
  // })
  // const {data : responseData}= response
  // if(responseData.success){
  //   dispatch(handleAddItemCart(responseData.data))
  //   console.log("response now data",responseData )
  // }
  //         }catch(error){
  //           console.log
  //         }
  //       }

  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
   
  }, [])
 
  return (<GlobalProvider>
    <Header />
    <main className='min-h-[78vh]'>
      <Outlet />
    </main>
    <Footer />
    <Toaster />
    {
      location.pathname !== '/checkout' && (
        <CartMobileLink/>
     
      )
    }
    
  
  </GlobalProvider>

  )

   
}

export default App 