import { Bot, Context, GrammyError, HttpError } from 'grammy'
import { handleMessage, handleStart } from './bot/handlers.js'
import { config } from './config/config'

const ALLOWED_USER_IDS = [694852065, 1157199446]

async function checkAccess(ctx: Context, next: () => Promise<void>) {
	const userId = ctx.from?.id

	if (!userId || !ALLOWED_USER_IDS.includes(userId)) {
		await ctx.reply('You do not have access to this bot')
		return
	}

	await next()
}

async function startBot() {
	try {
		if (!config.botToken.includes(':')) {
			throw new Error('Invalid BOT_TOKEN format. Please check your .env file')
		}

		const bot = new Bot(config.botToken)

		bot.use(checkAccess)

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
