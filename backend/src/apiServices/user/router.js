import { Router } from "express"
const router = Router()
import { autoLogin, changeEmail, changePassword, checkEmailToken, checkPasswordToken, forgotPassword, login, newPassword, signin } from "./controller.js"
import { router as adminRouter } from "./adminRouter.js"
import { tokenExtractor, verifyToken } from "../../utils/verify.js"
import { getMessage } from "../announcement/controller.js"

router.post('/signin', signin)
router.post('/login', login)
router.get('/autologin', tokenExtractor, autoLogin)
router.put('/changePassword', tokenExtractor, verifyToken, changePassword)
router.post('/forgotPassword', forgotPassword)
router.get('/checkPasswordToken', checkPasswordToken)
router.put('/newPassword', newPassword)
router.put('/changeEmail', tokenExtractor, verifyToken, changeEmail)
router.put('/checkEmailToken', checkEmailToken)
router.get('/announcement', getMessage)

// Admin
router.use('/admin', tokenExtractor, verifyToken, adminRouter)

export { router }