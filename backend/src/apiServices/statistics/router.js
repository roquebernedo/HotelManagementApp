import { Router } from "express"
const router = Router()
import { tokenExtractor, verifyToken } from "../../utils/verify.js"
import { getMonth, test } from "./controller.js"

router.get('/', tokenExtractor, verifyToken, test)
router.get('/month', tokenExtractor, verifyToken, getMonth)

export { router }
