import { PhoneService } from '@/services/phone.service'
import { TrelloCard } from '@/types/trello.types'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

export class PhoneController {
	private phoneService: PhoneService

	constructor(prisma: PrismaClient) {
		this.phoneService = new PhoneService(prisma)
	}

	public processCard = async (
		req: Request,
		res: Response
	): Promise<Response> => {
		try {
			const card = req.body as TrelloCard

			if (!card || !card.desk) {
				return res.status(400).json({
					message: 'Invalid card data. Description is required.',
				})
			}

			const result = await this.phoneService.processJobPost(card)

			if (!result.phoneNumber) {
				return res.status(400).json({
					message: result.message,
				})
			}

			return res.status(200).json({
				success: true,
				message: result.message,
				data: {
					phoneNumber: result.phoneNumber,
				},
			})
		} catch (error) {
			console.error('Controller Error:', error)
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
				error: error instanceof Error ? error.message : 'Unknown error',
			})
		}
	}

	public getAllPhoneNumbers = async (
		_: Request,
		res: Response
	): Promise<Response> => {
		try {
			const phoneNumbers = await this.phoneService.getAllPhoneNumbers()

			return res.status(200).json({
				success: true,
				data: phoneNumbers,
			})
		} catch (error) {
			console.error('Controller Error:', error)
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
				error: error instanceof Error ? error.message : 'Unknown error',
			})
		}
	}

	public deletePhoneNumber = async (
		req: Request,
		res: Response
	): Promise<Response> => {
		try {
			const { number } = req.params

			if (!number) {
				return res.status(400).json({
					success: false,
					message: 'Phone number is required',
				})
			}

			await this.phoneService.deletePhoneNumber(number)

			return res.status(200).json({
				success: true,
				message: 'Phone number successfully deleted',
			})
		} catch (error) {
			console.error('Controller Error:', error)
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
				error: error instanceof Error ? error.message : 'Unknown error',
			})
		}
	}
}
