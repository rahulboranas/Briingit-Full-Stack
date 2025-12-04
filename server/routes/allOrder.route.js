import { Router } from 'express'
import auth from '../middleware/auth.js'
import { getAllOrderAsPerUser, getAllOrders } from '../controllers/allOrder.controller.js'

const allOrderRouter = Router()
allOrderRouter.get("/get_all_order",getAllOrders)
allOrderRouter.get("/get_all_order_as_per_user",auth,getAllOrderAsPerUser)
export default allOrderRouter