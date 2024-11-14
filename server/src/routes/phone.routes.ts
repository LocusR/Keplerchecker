import { Router } from 'express'
import { PhoneController } from '../controllers/phone.controller'
import { DatabaseService } from '../services/database.service'

const phoneRouter = Router()
const prisma = DatabaseService.getInstance().getPrismaClient()
const phoneController = new PhoneController(prisma)

phoneRouter.post('/add', phoneController.addPhoneNumber)

export default phoneRouter
