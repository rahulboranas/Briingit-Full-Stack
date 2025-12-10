import { Router } from 'express'
import { googleLogin } from '../controllers/authcontroller.js'
// import auth from '../middleware/auth.js'



const authRouter = Router()
authRouter.get("/test",(req,res)=>{
    res.send("hello")
})
authRouter.get("/google",googleLogin)

export default authRouter