import { request, response } from "express";
import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";
export const AddCategoryController =async(request , response)=>{
    try{
        const {name , image} = request.body
        if(!name || !image){
            return response.status(400).json({
                message:'enter required fields',
                error:true,
                success:false
            })
        }
const addCategory =new CategoryModel({
    name,
    image
})
const saveCategory =await addCategory.save()
if(!saveCategory){
    return response.status(500).json({
        message:"not created",
        error:true,
        success:false
    })
}
return response.json({
    message : "Add Category",
    success : true,
    error:false
})
    }catch(error){
        return response.status(500).json({
            message : error.message || error,
            error:true,
            success : false
        })

    }

}
export const getCategoryController=async(request,response)=>{
try{
const data =await CategoryModel.find().sort({createdAt : -1})
return response.json({
    data:data,
    error:false,
    success:true
})
}catch(error){
     console.error("Error in getCategoryController:", error);
   return response.status(500).json({
    message: error.message || error,
    success:false,
    error:true
   })
}
}
//update a categorty
export const updateCategoryController = async(request,response)=>{
    try{
const { _id , name , image}=request.body
    console.log("UPDATE request body:", { _id , name , image })
const update = await CategoryModel.findByIdAndUpdate(
    _id,{
  name,
  image  
}, { new: true } )
 console.log("DB updated category:", update)  
return response.json({
    message : "Update Category",
    success:true,
    error:false,
    data: update
})
    }catch(error){
        console.error("Error in updateCategoryController:", error)  
        return response.status(500).json({
            message:error.message || error,
            error : true,
            success:false
        })
    }
}

export const deleteCategoryController = async(request,response)=>{
    try{
            const {_id} =request.body
            const checkSubCategory = await SubCategoryModel.find({
           category : {
            "$in" : [_id]
           }
            }).countDocuments()

              const checkProduct = await ProductModel.find({
           category : {
            "$in" : [ _id ]
           }
            }).countDocuments()
            if(checkSubCategory > 0 || checkProduct > 0 ){
                return response.status(400).json({
                    message : "Already Category is used cannot deleted",
                    error : true,
                    success:false
                })
            }
            const deleteCategory = await CategoryModel.deleteOne({_id : _id})
            return response.json({
                message : "Delete category successfully",
                data:deleteCategory,
                error:false,
                success:true
            })
    }catch(error){
        return response.json({
            message:error.message || error,
            success:false,
            error:true

        })
    }
}