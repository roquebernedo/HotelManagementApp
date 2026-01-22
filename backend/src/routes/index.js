import { Router } from "express"
const router = Router()
import { router as userRouter } from '../apiServices/user/router.js'
import { router as clientRouter } from "../apiServices/client/router.js"
import { router as roomRouter } from "../apiServices/room/router.js"
import { router as reservationRouter } from "../apiServices/reservation/router.js"
import { router as ledgerRouter } from "../apiServices/ledger/router.js"
import { router as statisticsRouter } from "../apiServices/statistics/router.js"

router.use('/user', userRouter)
router.use('/client', clientRouter)
router.use('/room', roomRouter)
router.use('/reservation', reservationRouter)
router.use('/ledger', ledgerRouter)
router.use('/statistics', statisticsRouter)

export default router