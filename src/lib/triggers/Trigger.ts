import type { WxtStorageItem } from 'wxt/storage'

export abstract class Trigger {
  /** Display name for the user */
  abstract name: string

  /** Whether or not the trigger is defined */
  enabled: WxtStorageItem<boolean, {}>

  /** @param id Used internally, kebab-case ID */
  constructor(public id: string) {
    this.enabled = storage.defineItem<boolean>(
      `sync:trigger:${this.id}:enabled`,
      {
        fallback: false,
      }
    )
  }

  /** Set up the trigger */
  abstract start(callback: () => void): void
  /** Stop listening for the trigger */
  abstract stop(): void
}
