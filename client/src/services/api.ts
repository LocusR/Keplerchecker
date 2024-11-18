import axios from 'axios'
import { config } from '../config/config'
import { formatPhoneNumber } from '../utils/phoneValidator.js'

const api = axios.create({
	baseURL: config.keplerApi,
})

export interface ApiResponse {
	success: boolean
	message: string
	data?: {
		phoneNumber: string
	}
}

export const trelloApi = {
	async checkPhoneNumber(phoneNumber: string): Promise<ApiResponse> {
		try {
			const formattedNumber = formatPhoneNumber(phoneNumber)
			const response = await api.post('/trello/add', {
				phoneNumber: formattedNumber,
			})
			return response.data
		} catch (error) {
			console.error('Error checking phone number:', error)
			return {
				success: false,
				message: 'The number already exists in the database ',
			}
		}
	},

	async updateAllNumbers(): Promise<ApiResponse> {
		try {
			const response = await api.get('/trello/cards')
			return response.data
		} catch (error) {
			console.error('Error updating numbers:', error)
			return {
				success: false,
				message: 'Failed to update numbers. Please try again later.',
			}
		}
	},
}
