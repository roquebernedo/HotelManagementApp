import { Router } from "express"
import { createRoom, getAllRooms, getRoom } from "./controller.js"
import { tokenExtractor, verifyRole, verifyToken } from "../../utils/verify.js"
const router = Router()

router.get('/', tokenExtractor, verifyToken, getRoom)
router.get('/all', tokenExtractor, verifyToken, getAllRooms)
router.post('/', tokenExtractor, verifyToken, verifyRole, createRoom)

export { router }