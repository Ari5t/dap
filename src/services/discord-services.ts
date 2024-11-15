import { StatusCodes } from 'http-status-codes'

import ApiDiscord from './api'

interface IDiscordService {
  createMessage(channelId: string, content: string): Promise<void>
  isValidToken(token: string): Promise<boolean>
}

class DiscordService implements IDiscordService {
  public async createMessage(channelId: string, content: string) {
    try {
      const body = {
        tts: false,
        content,
      }

      await ApiDiscord.post(`/channels/${channelId}/messages`, body)
    } catch (error) {
      console.log(error)
    }
  }

  public async isValidToken(token: string) {
    try {
      const { status } = await ApiDiscord.get('/users/@me', {
        headers: {
          authorization: token,
        },
      })

      return StatusCodes.OK === status
    } catch (error) {
      console.log(error)
    }
  }
}

export default new DiscordService()
