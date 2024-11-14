import { PrismaClient } from '@prisma/client'
import { ApiResponse } from '../types/response.types'
import { PhoneUtils } from '../utils/phone.utils'

export class PhoneService {
	private readonly prisma: PrismaClient

	constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	public async isPhoneNumberExists(phoneNumber: string): Promise<boolean> {
		if (!PhoneUtils.isValidPhoneNumber(phoneNumber)) {
			throw new Error('Invalid phone number format')
		}

		const existingPhone = await this.prisma.phoneNumber.findUnique({
			where: { number: phoneNumber },
			select: { id: true },
		})
		return !!existingPhone
	}

	public async savePhoneNumber(phoneNumber: string): Promise<void> {
		if (!PhoneUtils.isValidPhoneNumber(phoneNumber)) {
			throw new Error('Invalid phone number format')
		}

		await this.prisma.phoneNumber.create({
			data: { number: phoneNumber },
		})
	}

	public async addNumber(phoneNumber: string): Promise<ApiResponse> {
		try {
			if (!phoneNumber) {
				return {
					success: false,
					message: 'Phone number is required',
				}
			}

			if (!PhoneUtils.isValidPhoneNumber(phoneNumber)) {
				return {
					success: false,
					message: 'Invalid phone number format',
				}
			}

			const exists = await this.isPhoneNumberExists(phoneNumber)
			if (exists) {
				return {
					success: false,
					message: 'Phone number already exists in the database',
				}
			}

			await this.savePhoneNumber(phoneNumber)
			return {
				success: true,
				message: 'Phone number successfully saved',
				data: { phoneNumber },
			}
		} catch (error) {
			console.error('PhoneService Error:', error)
			throw new Error(
				error instanceof Error ? error.message : 'Unknown error occurred'
			)
		}
	}
}
