import discordServices from 'src/services/discord-services'
import type { IpcMainInvokeEvent } from 'electron'

class DiscordControllers {
  public async isValidToken(
    _event: IpcMainInvokeEvent,
    token: string
  ): Promise<boolean> {
    return await discordServices.isValidToken(token)
  }
}

export default new DiscordControllers()
