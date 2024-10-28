import Store from 'electron-store'

export enum StorageName {
  MESSAGES = 'messages',
  SETTINGS = 'settings',
}

export class Storage extends Store {
  constructor() {
    super({
      name: 'dap-storage',
      migrations: {
        '0.0.1': (store) => {
          store.set(StorageName.MESSAGES, [])
          store.set('phase', '0.0.1')
        },
        '>=0.0.2': (store) => {
          store.set(StorageName.SETTINGS, {
            token: '',
          })
          store.set('phase', '0.0.2')
        },
      },
    })
  }
}
