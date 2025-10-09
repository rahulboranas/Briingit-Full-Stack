
import AddressModel from '../models/address.model.js';
import UserModel from '../models/user.model.js';
export const addAddressController =async(request , response)=>{
    try{
        const userId  = request.userId //middleware 
        console.log("userid",userId)
const {address_line,city,state, pincode,country, mobile}=request.body
const createAddress =new AddressModel({
    address_line,
    city,
    state,
    country,
    pincode,
    mobile,
    userId : userId
})
const saveAddress =await createAddress.save()
const addUserAddressId = await UserModel.findByIdAndUpdate(userId , {$push:{address_details : saveAddress._id}})
return response.json({
    message : "Address Created Successfully",
    error:false,
    success:true,

    data:saveAddress
})
    }catch(error){
        return response.status(400).json({
            message : error.message || error ,
             error : true ,
            success : false
        })
    }
} 
export const getAddress1controller = async(request,response)=>{
   try{
      const userId =request.userId //middleware
      const data = await AddressModel.find({userId : userId}).sort({createdAt : -1})
      return response.json({
        data : data ,
        message:'list of address',
        error : false ,
         success : true
      })
   }catch(error){
      return response.status(500).json({
        message : error.message || error ,
         error:true,
         success:false
      })
   }
}
export const updateAddressController = async(request,response)=>{
    try{
        const userId = request.userId //middleware auth
        const {_id,address_line,state,country,city,pincode,mobile}=request.body
        const updateAddress = await AddressModel.updateOne({_id:_id,userId:userId},{address_line,
            city,
            state,
            country,
            mobile,
            pincode
        })
        return response.json({
            message:"Successfully Updated",
            error:false,
            success:true,
            data:updateAddress
        })
    }catch(error){
        return response.status(500).json({
            message : error.message || error,
            success:false,
            error:true
        })
    }
}
export const deleteAddresscontroller = async(request,response)=>{
    try{
        const userId = request.userId //middleware
        const {_id} = request.body
        const disableAddress = await AddressModel.updateOne({_id:_id,userId},{
            status:false
        })
        return response.json({
            message:"Address Removed",
            error:false,
            success:true
        })
    }catch(error){
        return response.status(500).json({
            message:error.message || error,
            error: true,
            success:false
        })
    }
}