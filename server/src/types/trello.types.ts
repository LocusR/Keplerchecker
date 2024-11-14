export interface TrelloCard {
	id: string
	name: string
	desc: string
	closed?: boolean
	idList?: string
	idBoard?: string
	[key: string]: any
}
