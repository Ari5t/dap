import { v4 as uuidv4 } from 'uuid'
import { Storage, StorageName } from './storage-services'

export interface IMessage {
  id?: string
  name: string
  channelId: string
  text: string
  schedule: string
}

class MessageServices extends Storage {
  constructor() {
    super()
  }

  public getAll(): IMessage[] {
    return this.store[StorageName.MESSAGES] as IMessage[]
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

    this.set(StorageName.MESSAGES, [...this.getAll(), data])
  }

  public edit(data: IMessage) {
    const all = this.getAll()
    const index = all.findIndex((v) => v.id === data.id)

    all[index] = data

    this.set(StorageName.MESSAGES, all)
  }

  public remove(id: string) {
    const newList = this.getAll().filter((v) => v.id !== id)

    this.set(StorageName.MESSAGES, newList)
  }
}

export default new MessageServices()
