import { channelId } from './env'
import discordService from './services/discord-service'

discordService.createMessage(channelId, 'test').then((r) => console.log(true))
