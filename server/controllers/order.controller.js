import UserModel from "../models/user.model.js";
import CartProductModel from "../models/cartProduct.model.js";
import AddressModel from "../models/address.model.js";
import AllOrderModel from "../models/allOrder.model.js";

export const CashOnDeliveryOrderController= async (req, res) => {
  try {
    const userId = req.userId; // AUTH MIDDLEWARE SE AYEGA
    const { addressId,subTotalAmt} = req.body;
   

    if (!addressId) {
      return res.status(400).json({ message: "Delivery address required" });
    }

    // USER
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ADDRESS
    const address = await AddressModel.findById(addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    // CART PRODUCTS
    const cartItems = await CartProductModel.find({ userId }).populate("productId");

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // PRODUCT LIST + TOTAL CALCULATION
    let orderProducts = [];
    let totalAmount = subTotalAmt;

    

    for (let item of cartItems) {
      if (!item.productId) continue;

    const priceWithDiscount = (price, discount) => {
    const discountAmount = Math.ceil((Number(price) * Number(discount)) / 100);
    const actualPrice = Number(price) - discountAmount;
    return actualPrice;
  };
   const discountedPrice = priceWithDiscount(item.productId.price, item.productId.discount);

      orderProducts.push({
        productId: item.productId._id,
        name: item.productId.name,
        image: item.productId.image,
        price:discountedPrice,
        quantity: item.quantity
      });

    //   totalAmount += item.productId.price * item.quantity;
    }

    // CREATE ORDER
    const newOrder = await AllOrderModel.create({
      user: user._id,

      userInfo: {
        name: user.name,
        email: user.email,
        mobile: user.mobile
      },

      deliveryAddress: {
        address_line: address.address_line,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
        mobile: address.mobile
      },

      products: orderProducts,
      paymentMethod: "COD",       // ⭐ FORCE COD
      paymentStatus: "PENDING",
      orderStatus: "PLACED",
      totalAmount
    });

    // DELETE ALL CART ITEMS
    await CartProductModel.deleteMany({ userId });

    // CLEAR shopping_cart[] in user model
    await UserModel.updateOne(
      { _id: userId },
      { $set: { shopping_cart: [] } }
    );

    return res.status(200).json({
      message: "Order placed successfully (COD)",
      success: true,
      order: newOrder
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};


// import CartProductModel from "../models/cartProduct.model.js";
// import OrderModel from "../models/order.model.js";
// import UserModel from "../models/user.model.js";
// import mongoose from "mongoose";
// export async function CashOnDeliveryOrderController(request,response){
//     try{
//         const userId = request.userId 
//         const {list_items,totalAmt,addressId,subTotalAmt} = request.body
//         console.log("list_item",list_items)
//         console.log("totalAmt",totalAmt)
//         console.log("addressId",addressId)
//         console.log("subTotal",subTotalAmt)
// const payload = list_items.map(el=>{
    
//     return({
//          userId:userId,
//                 orderId:`ORD-${new mongoose.Types.ObjectId()}`,
//                 productId:el.productId._id,
//                 product_details:{
                       
//                     name:el.productId.name,
//                     image:el.productId.image,
                
//                 },
//                 quantity: el.quantity,
//                 paymentId:"",
//                 payment_status:"CASH ON DELIVERY",
//                 delivery_address: addressId,
//                 subTotalAmt:subTotalAmt ,
//                 totalAmt:  totalAmt  ,
              
// })


           
//         }
//     )
//     const generatedOrder = await OrderModel.insertMany(payload)

// const removeCartItems =await CartProductModel.deleteMany({userId : userId})
// const updateInUSer =await UserModel.updateOne({_id : userId},{shopping_cart:[]})
// return response.json({
//     message : "Order  successfully",
//     error:false,
//     success:true,
//     data : generatedOrder
// })
// }
//     catch(error){
//         return response.status(500).json({
//             message:error.message || error,
//             error:true,
//             success:false
            
//         })
//     }
// }


export async function getOrderDetailsController(request,response){
try{
    const userId = request.userId
   const orderList = await OrderModel.find({ userId }).sort({ createdAt: -1 }).populate('productId')

    return response.json({
        message:"order list",
        data:orderList,
        error:false,
        success:true
    })
}catch(error){
    return response.status(500).json({
        message:message.error || error,
        error:true,
        success:false
    })
}
}