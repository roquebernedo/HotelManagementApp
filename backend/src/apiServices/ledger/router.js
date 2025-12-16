import { Router } from "express"
import { newEntry } from "./controller.js"
import { tokenExtractor, verifyToken } from "../../utils/verify.js"
const router = Router()

router.post('/', tokenExtractor, verifyToken, newEntry)

export { router }