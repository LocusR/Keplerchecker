import dotenv from 'dotenv'
dotenv.config()

export const config = {
	botToken: process.env.BOT_TOKEN as string,
	keplerApi: 'http://localhost:5000',
}
