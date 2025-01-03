import type { WxtStorageItem } from 'wxt/storage'

export abstract class Action {
  /** Display name for the user */
  abstract name: string

  default = false
  /** Whether or not the action is defined */
  enabled: WxtStorageItem<boolean, {}>

  /** @param id Used internally, kebab-case ID */
  constructor(public id: string) {
    this.enabled = storage.defineItem<boolean>(
      `sync:action:${this.id}:enabled`,
      {
        fallback: this.default,
      }
    )
  }

  /** Panic! Run the action. */
  abstract run(): void | Promise<void>
}
