import dotenv from 'dotenv'
dotenv.config()

export const config = {
	trelloToken: process.env.TRELLO_TOKEN as string,
	trelloKey: process.env.TRELLO_API_KEY as string,
	boardId: process.env.TRELLO_BOARD_ID as string,
	trelloApi: 'https://api.trello.com/1',
}
