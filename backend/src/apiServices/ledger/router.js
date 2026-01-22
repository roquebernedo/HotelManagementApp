import { Router } from "express"
import { deleteEntry, getAll, getMonth, getWeek, getYear, newEntry, updateEntry } from "./controller.js"
import { tokenExtractor, verifyToken } from "../../utils/verify.js"
const router = Router()

router.get('/', tokenExtractor, verifyToken, getWeek)
router.get('/month', tokenExtractor, verifyToken, getMonth)
router.get('/year', tokenExtractor, verifyToken, getYear)
router.post('/', tokenExtractor, verifyToken, newEntry)
router.get('/all', tokenExtractor, verifyToken, getAll)
router.put('/', tokenExtractor, verifyToken, updateEntry)
router.delete('/', tokenExtractor, verifyToken, deleteEntry)

export { router }