import { Bot, GrammyError, HttpError } from 'grammy'
import { handleMessage, handleStart } from './bot/handlers.js'
import { config } from './config/config'

async function startBot() {
	try {
		if (!config.botToken.includes(':')) {
			throw new Error('Invalid BOT_TOKEN format. Please check your .env file')
		}

		const bot = new Bot(config.botToken)

		bot.command('start', handleStart)

		bot.on('message:text', handleMessage)

		bot.catch(err => {
			const ctx = err.ctx
			console.error(`Error while handling update ${ctx.update.update_id}:`)
			const e = err.error
			if (e instanceof GrammyError) {
				console.error('Error in request:', e.description)
			} else if (e instanceof HttpError) {
				console.error('Could not contact Telegram:', e)
			} else {
				console.error('Unknown error:', e)
			}
		})

		await bot.start({
			onStart: botInfo => {
				console.log(`✅ Bot @${botInfo.username} is running...`)
			},
		})
	} catch (error) {
		if (error instanceof Error) {
			console.error('Failed to start bot:', error.message)
			if (error.message.includes('Unauthorized')) {
				console.error('Please check your BOT_TOKEN in .env file')
			}
		} else {
			console.error('An unknown error occurred:', error)
		}
		process.exit(1)
	}
}

startBot()
