import {Router} from 'express'
import auth from '../middleware/auth.js'
import { addAddressController, deleteAddresscontroller, getAddress1controller, updateAddressController } from '../controllers/address.controller.js'
const addressRouter = Router()
addressRouter.post('/create',auth,addAddressController)
addressRouter.get("/get",auth,getAddress1controller)
addressRouter.put("/update",auth,updateAddressController)
addressRouter.delete('/disable',auth,deleteAddresscontroller)
export default addressRouter