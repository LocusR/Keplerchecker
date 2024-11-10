import { Request, Response } from 'express'
import { TrelloService } from '../services/trello.service'

export class TrelloController {
	private trelloService: TrelloService

	constructor() {
		this.trelloService = new TrelloService()
	}

	getBoard = async (req: Request, res: Response): Promise<void> => {
		try {
			const board = await this.trelloService.getBoard()
			if (!board.id) {
				throw new Error('Invalid board response')
			}
			res.json(board)
		} catch (error) {
			console.error('Get board error:', error)
			res.status(500).json({
				error: error instanceof Error ? error.message : 'Unknown error',
			})
		}
	}

	getLists = async (req: Request, res: Response): Promise<void> => {
		try {
			const lists = await this.trelloService.getLists()
			res.json(lists)
		} catch (error) {
			console.error('Get lists error:', error)
			res.status(500).json({
				error: error instanceof Error ? error.message : 'Unknown error',
			})
		}
	}

	getCards = async (req: Request, res: Response): Promise<void> => {
		try {
			const cards = await this.trelloService.getCards()
			res.json(cards)
		} catch (error) {
			console.error('Get cards error:', error)
			res.status(500).json({
				error: error instanceof Error ? error.message : 'Unknown error',
			})
		}
	}
}
