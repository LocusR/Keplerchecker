import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { PhoneService } from '../services/phone.service'
import { TrelloService } from '../services/trello.service'
import { PhoneUtils } from '../utils/phone.utils'

export class TrelloController {
  private readonly trelloService: TrelloService
  private readonly phoneService: PhoneService

  constructor(prisma: PrismaClient) {
    this.trelloService = new TrelloService()
    this.phoneService = new PhoneService(prisma)
  }

  public getCards = async (req: Request, res: Response): Promise<void> => {
    try {
      const cards = await this.trelloService.getCards()
      
      const processedCards = await Promise.all(
        cards.map(async card => {
          const phoneNumber = PhoneUtils.extractPhoneNumber(card.desc)
          const phoneNumberResponse = phoneNumber 
            ? await this.phoneService.addNumber(phoneNumber)
            : { success: false, message: 'No phone number found' }

          return {
            ...card,
            phoneNumberResponse
          }
        })
      )

      res.json({
        success: true,
        data: processedCards
      })
    } catch (error) {
      console.error('Get cards error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to process Trello cards',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }
}