import { Router } from "express"
import { createReservation, getAllReservations } from "./controller.js"
import { tokenExtractor, verifyToken } from "../../utils/verify.js"
const router = Router()

router.get('/all', tokenExtractor, verifyToken, getAllReservations)
router.post('/', tokenExtractor, verifyToken, createReservation)

export { router }