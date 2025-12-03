import { Router } from "express"
import { adminEmailUpdate, adminPwUpdate, approveUser, deleteUser, getAllUsers, getUser, roleUpdate } from "./controller.js"
import { deleteMessage, setMessage } from "../announcement/controller.js"
const router = Router()

router.get('/', getUser)
router.get('/all', getAllUsers)
router.put('/approve', approveUser)
router.put('/password', adminPwUpdate)
router.put('/email', adminEmailUpdate)
router.put('/role', roleUpdate)
router.delete('/delete', deleteUser)

router.post('/announcement', setMessage)
router.delete('/announcement', deleteMessage)

export { router }