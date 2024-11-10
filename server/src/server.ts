import dotenv from 'dotenv'
import express, { Express, NextFunction, Request, Response } from 'express'
import { trelloRoutes } from './routes/trello.routes'

dotenv.config()

const app: Express = express()

app.use(express.json())
app.use('/trello', trelloRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack)
	res.status(500).json({ error: 'Something went wrong!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
