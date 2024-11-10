import { Router } from 'express'
import { TrelloController } from '../controllers/trello.controller'

export const trelloRoutes = Router()
const trelloController = new TrelloController()

trelloRoutes.get('/board', trelloController.getBoard)
trelloRoutes.get('/lists', trelloController.getLists)
trelloRoutes.get('/cards', trelloController.getCards)
