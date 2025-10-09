import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRuppe'
import { pricewithDiscount} from '../utils/PricewithDiscount'

const MyOrders = () => {
  const order = useSelector(state => state.orders.order)
  const cartItem_details = useSelector(state => state.cartItem.cart)
  console.log("its cart item",cartItem_details)
  console.log("order items",order)
  return (
    <div>
      <div className='bg-white shadow-md p-3 font-semibold '>
        <h1>Order</h1>
      </div>
      {
        !order[0] && (
          <NoData/>
        )}
        {
        order.map((order,index)=>{
         

   
          return(
       

            <div key={order._id+index+"order"} className='order rounded text-sm p-4'>
              <p>Product No : {order?.orderId}</p>
              <div className='flex'>
                <img className='w-14 h-14 object-scale-down '
                src={order.product_details.image[0]}
                />
                <div className='px-4 grid gap-1 '>
                  <p className='text-xs font-semibold'>{order.product_details.name}</p>
                     <p className='text-xs'>{ DisplayPriceInRupees(pricewithDiscount(order.productId.price,order.productId.
discount))}</p>
<p className='text-xs'>Qty:{order.quantity}</p>
                    
                  </div>
                 

                  </div>
                  
                
                </div>
       
          )
        })
        }
      
    </div>
  )
}

export default MyOrders
