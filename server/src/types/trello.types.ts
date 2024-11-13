export interface TrelloBoard {
	id: string
	name: string
	desc: string
	closed?: boolean
	[key: string]: any
}

export interface TrelloList {
	id: string
	name: string
	closed?: boolean
	idBoard?: string
	[key: string]: any
}

export interface TrelloCard {
	id: string
	name: string
	desc: string
	closed?: boolean
	idList?: string
	idBoard?: string
	[key: string]: any
}
