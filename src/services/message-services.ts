import Store from 'electron-store'

const STORAGE_NAME = 'messages'

interface IMessage {
  id: string
  channelId: string
  message: string
  schedule: number
}

class MessageServices extends Store {
  constructor() {
    super({
      migrations: {
        '0.0.1': (store) => {
          store.set(STORAGE_NAME, [])
          store.set('phase', '0.0.1')
        },
      },
    })
  }

  public getMesssages() {
    return this.store[STORAGE_NAME]
  }

  public getMessage(id: string) {}

  public setMessage(data: IMessage) {}
}

export default new MessageServices()
