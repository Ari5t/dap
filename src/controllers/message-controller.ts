import messageServices, { IMessage } from '../services/message-services'
import type { IpcMainInvokeEvent } from 'electron'

class MessageControllers {
  public getAll(_event: IpcMainInvokeEvent): IMessage[] {
    return messageServices.getAll()
  }

  public getById(_event: IpcMainInvokeEvent, id: string) {
    messageServices.getById(id)
  }

  public create(_event: IpcMainInvokeEvent, data: IMessage) {
    return messageServices.create(data)
  }

  public edit(_event: IpcMainInvokeEvent, data: IMessage) {
    return messageServices.edit(data)
  }

  public remove(_event: IpcMainInvokeEvent, id: string) {
    return messageServices.remove(id)
  }
}

export default new MessageControllers()
