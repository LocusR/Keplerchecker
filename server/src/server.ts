import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import express, { Express, NextFunction, Request, Response } from 'express'
import { trelloRoutes } from './routes/trello.routes'

dotenv.config()

const prisma = new PrismaClient()
const app: Express = express()

app.use(express.json())
app.use('/trello', trelloRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack)
	res.status(500).json({ error: 'Something went wrong!' })
})

async function main() {
	const PORT = process.env.PORT || 5000
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`)
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
