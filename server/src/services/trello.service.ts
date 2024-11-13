import axios, { AxiosInstance } from 'axios'
import { config } from '../config'
import { TrelloBoard, TrelloCard, TrelloList } from '../types/trello.types'

export class TrelloService {
	private api: AxiosInstance
	private auth: string

	constructor() {
		this.auth = `key=${config.trelloKey}&token=${config.trelloToken}`
		this.api = axios.create({
			baseURL: config.trelloApi,
			params: {
				key: config.trelloKey,
				token: config.trelloToken,
			},
		})
	}

	async getBoard(): Promise<TrelloBoard> {
		const { data } = await this.api.get(`/boards/${config.boardId}`)
		return data
	}

	async getLists(): Promise<TrelloList[]> {
		const { data } = await this.api.get(`/boards/${config.boardId}/lists`)
		return data
	}

	async getCards(): Promise<Pick<TrelloCard, 'desc' | 'name' | 'id'>[]> {
		const { data } = await this.api.get(`/boards/${config.boardId}/cards`)
		return data.map((card: TrelloCard) => ({
			id: card.id,
			name: card.name,
			desk: card.desc,
		}))
	}
}
