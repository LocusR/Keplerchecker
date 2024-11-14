import { PrismaClient } from '@prisma/client'

export class DatabaseService {
	private static instance: DatabaseService
	private prisma: PrismaClient

	private constructor() {
		this.prisma = new PrismaClient()
	}

	public static getInstance(): DatabaseService {
		if (!DatabaseService.instance) {
			DatabaseService.instance = new DatabaseService()
		}
		return DatabaseService.instance
	}

	public getPrismaClient(): PrismaClient {
		return this.prisma
	}
}
