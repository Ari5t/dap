import Store from 'electron-store'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_NAME = 'messages'

export interface IMessage {
  id: string
  name: string
  channelId: string
  text: string
  schedule: string
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

  public getAll(): IMessage[] {
    return this.store[STORAGE_NAME] as IMessage[]
  }

  public getById(id: string) {}

  public create(newMeesage: IMessage) {
    const data = {
      id: uuidv4(),
      ...newMeesage,
    }

    this.set(STORAGE_NAME, [...this.getAll(), data])
  }
}

export default new MessageServices()
