import { Context } from 'grammy'
import { trelloApi } from '../services/api.js'
import { mainKeyboard } from './keyboards.js'

export async function handleStart(ctx: Context) {
	await ctx.reply(
		'👋 Welcome to Phone Number Management Bot!\n\nI can help you check phone numbers and update Trello cards. Choose an option:',
		{ reply_markup: mainKeyboard }
	)
}

export async function handleMessage(ctx: Context) {
	if (!ctx.message?.text) return

	const text = ctx.message.text

	if (text === '📱 Check Phone Number') {
		await ctx.reply(
			'Please send me the phone number you want to check. It should be a valid 10-digit US phone number.'
		)
		return
	}

	if (text === '🔄 Update All Numbers') {
		await ctx.reply('🔄 Updating all numbers from Trello...')
		const result = await trelloApi.updateAllNumbers()
		await ctx.reply(
			result.success
				? `✅ Numbers updated successfully!${
						result.data ? `\nProcessed number: ${result.data.phoneNumber}` : ''
				  }`
				: '❌ ' + result.message
		)
		return
	}

	if (/^\+?\d+$/.test(text.replace(/\s/g, ''))) {
		const phoneNumber = text.replace(/\s/g, '')

		try {
			await ctx.reply('🔍 Checking phone number...')
			const result = await trelloApi.checkPhoneNumber(phoneNumber)
			await ctx.reply(
				result.success
					? `✅ ${result.message}\nFormatted number: ${result.data?.phoneNumber}`
					: '❌ ' + result.message,
				{ reply_markup: mainKeyboard }
			)
		} catch (error) {
			await ctx.reply('❌ Error processing phone number. Please try again.', {
				reply_markup: mainKeyboard,
			})
		}
	} else {
		await ctx.reply('Please choose an option:', { reply_markup: mainKeyboard })
	}
}
