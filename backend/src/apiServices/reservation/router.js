import { Router } from "express"
import { createReservation, deleteReservation, editReservation, getAllReservations, getReservation, quickPayment } from "./controller.js"
import { tokenExtractor, verifyToken } from "../../utils/verify.js"
const router = Router()

router.get('/', tokenExtractor, verifyToken, getReservation)
router.get('/all', tokenExtractor, verifyToken, getAllReservations)
router.post('/', tokenExtractor, verifyToken, createReservation)
router.put('/', tokenExtractor, verifyToken, editReservation)
router.delete('/', tokenExtractor, verifyToken, deleteReservation)
router.put('/quickpayment', verifyToken, quickPayment)

export { router }