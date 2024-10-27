import Store from 'electron-store'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_NAME = 'messages'

export interface IMessage {
  id?: string
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

  public getById(id: string) {
    const [message] = this.getAll().filter((v) => v.id === id)

    return message
  }

  public create(newMeesage: IMessage) {
    const data = {
      id: uuidv4(),
      ...newMeesage,
    }

    this.set(STORAGE_NAME, [...this.getAll(), data])
  }

  public edit(data: IMessage) {
    const all = this.getAll()
    const index = all.findIndex((v) => v.id === data.id)

    all[index] = data

    this.set(STORAGE_NAME, all)
  }

  public remove(id: string) {
    const newList = this.getAll().filter((v) => v.id !== id)

    this.set(STORAGE_NAME, newList)
  }
}

export default new MessageServices()
