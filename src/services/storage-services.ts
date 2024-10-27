import Store from 'electron-store'

export enum StorageName {
  MESSAGES = 'messages',
}

export class Storage extends Store {
  constructor() {
    super({
      migrations: {
        '0.0.1': (store) => {
          store.set(StorageName.MESSAGES, [])
          store.set('phase', '0.0.1')
        },
      },
    })
  }
}
