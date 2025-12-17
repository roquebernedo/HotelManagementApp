import { Router } from "express"
import { changeAvailability, createRoom, deleteRoom, editRoom, getAllRooms, getRoom } from "./controller.js"
import { tokenExtractor, verifyRole, verifyToken } from "../../utils/verify.js"
const router = Router()

router.get('/', tokenExtractor, verifyToken, getRoom)
router.get('/all', tokenExtractor, verifyToken, getAllRooms)
router.post('/', tokenExtractor, verifyToken, verifyRole, createRoom)
router.put('/', tokenExtractor, verifyToken, verifyRole, editRoom)
router.put('/availability', tokenExtractor, verifyToken, changeAvailability)
router.delete('/', tokenExtractor, verifyToken, deleteRoom)

export { router }