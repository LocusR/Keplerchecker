import { Router } from 'express'
import { TrelloController } from '../controllers/trello.controller'
import { DatabaseService } from '../services/database.service'

const trelloRouter = Router()
const prisma = DatabaseService.getInstance().getPrismaClient()
const trelloController = new TrelloController(prisma)

trelloRouter.get('/cards', trelloController.getCards)

export default trelloRouter
