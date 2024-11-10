import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export class TrelloUtil {
	private static baseUrl = process.env.TRELLO_BASE_URL

	static async makeRequest<T>(endpoint: string): Promise<T> {
		try {
			const response = await axios.get(`${this.baseUrl}${endpoint}`, {
				params: {
					key: process.env.TRELLO_API_KEY,
					token: process.env.TRELLO_TOKEN,
				},
			})
			return response.data
		} catch (error) {
			throw new Error(`Trello API request failed`)
		}
	}
}
