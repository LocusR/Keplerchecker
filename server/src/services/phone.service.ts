import { TrelloCard } from '@/types/trello.types'
import { PhoneUtils } from '@/utils/phoneUtil'
import { PrismaClient } from '@prisma/client'

export class PhoneService {
	constructor(private prisma: PrismaClient) {}

	private async isPhoneNumberExists(phoneNumber: string): Promise<boolean> {
		const existingPhone = await this.prisma.phoneNumber.findUnique({
			where: { number: phoneNumber },
		})
		return !!existingPhone
	}

	private async savePhoneNumber(phoneNumber: string): Promise<void> {
		await this.prisma.phoneNumber.create({
			data: {
				number: phoneNumber,
			},
		})
	}

	public async processJobPost(post: TrelloCard): Promise<{
		message: string
		phoneNumber?: string
	}> {
		try {
			const phoneNumber = PhoneUtils.extractPhoneNumber(post.desk)

			if (!phoneNumber) {
				return {
					message: 'Phone number not found in the description',
				}
			}

			if (!PhoneUtils.isValidPhoneNumber(phoneNumber)) {
				return {
					message: 'Invalid phone number format',
				}
			}

			const exists = await this.isPhoneNumberExists(phoneNumber)
			if (exists) {
				return {
					message: 'Phone number already exists in database',
					phoneNumber,
				}
			}

			await this.savePhoneNumber(phoneNumber)

			return {
				message: 'Phone number successfully saved',
				phoneNumber,
			}
		} catch (error) {
			console.error('Error processing job post:', error)
			return {
				message:
					error instanceof Error ? error.message : 'Unknown error occurred',
			}
		}
	}

	public async getAllPhoneNumbers() {
		return this.prisma.phoneNumber.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		})
	}

	public async deletePhoneNumber(number: string) {
		return this.prisma.phoneNumber.delete({
			where: {
				number,
			},
		})
	}
}
