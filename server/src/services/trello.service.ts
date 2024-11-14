import axios, { AxiosInstance } from 'axios'
import { config } from '../config'
import { TrelloCard } from '../types/trello.types'

export class TrelloService {
	private readonly api: AxiosInstance

	constructor() {
		this.api = axios.create({
			baseURL: config.trelloApi,
			params: {
				key: config.trelloKey,
				token: config.trelloToken,
			},
			timeout: 5000,
		})
	}

	public async getCards(): Promise<Pick<TrelloCard, 'desc' | 'name' | 'id'>[]> {
		try {
			const { data } = await this.api.get<TrelloCard[]>(
				`/boards/${config.boardId}/cards`
			)
			return data.map(({ id, name, desc }) => ({
				id,
				name,
				desc,
			}))
		} catch (error) {
			console.error('TrelloService Error:', error)
			throw new Error(
				error instanceof Error
					? `Failed to fetch Trello cards: ${error.message}`
					: 'Failed to fetch Trello cards'
			)
		}
	}
}
