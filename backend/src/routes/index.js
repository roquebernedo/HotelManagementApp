import { Router } from "express"
const router = Router()
import { router as userRouter } from '../apiServices/user/router.js'

router.use('/user', userRouter)

export default router