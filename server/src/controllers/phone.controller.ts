import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { PhoneService } from '../services/phone.service'
import { TrelloCard } from '../types/trello.types'
import { PhoneUtils } from '../utils/phone.utils'

export class PhoneController {
	private readonly phoneService: PhoneService

	constructor(prisma: PrismaClient) {
		this.phoneService = new PhoneService(prisma)
	}

	public async updateNumberList(post: TrelloCard): Promise<{
		success: boolean
		message: string
		phoneNumber?: string
	}> {
		try {
			const phoneNumber = PhoneUtils.extractPhoneNumber(post.desc)

			if (!phoneNumber) {
				return {
					success: false,
					message: 'Phone number not found in the description',
				}
			}

			if (!PhoneUtils.isValidPhoneNumber(phoneNumber)) {
				return {
					success: false,
					message: 'Invalid phone number format',
				}
			}

			const response = await this.phoneService.addNumber(phoneNumber)
			return {
				success: response.success,
				message: response.message,
				phoneNumber: response.success ? phoneNumber : undefined,
			}
		} catch (error) {
			console.error('Error processing job post:', error)
			return {
				success: false,
				message:
					error instanceof Error ? error.message : 'Unknown error occurred',
			}
		}
	}

	public addPhoneNumber = async (
		req: Request<{}, {}, { phoneNumber: string }>,
		res: Response
	): Promise<void> => {
		try {
			const { phoneNumber } = req.body

			if (!phoneNumber) {
				res.status(400).json({
					success: false,
					message: 'Phone number is required',
				})
				return
			}

			const result = await this.phoneService.addNumber(phoneNumber)
			res.status(result.success ? 200 : 400).json(result)
		} catch (error) {
			console.error('Controller Error:', error)
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}
}
