import ApiDiscord from './api'

interface IDiscordService {
  createMessage(channelId: string, content: string): Promise<void>
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
}

export default new DiscordService()
