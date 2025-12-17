import { Router } from "express"
import { createClient, deleteClient, editClient, getAllClients, getClient } from "./controller.js"
const router = Router()
import { tokenExtractor, verifyRole, verifyToken } from "../../utils/verify.js"

router.post('/', tokenExtractor, verifyToken ,createClient)
router.get('/', tokenExtractor, verifyToken, getClient)
router.get('/all', tokenExtractor, verifyToken, getAllClients)
router.put('/', tokenExtractor, verifyToken, editClient)
router.delete('/', tokenExtractor, verifyToken, verifyRole, deleteClient)

export { router }