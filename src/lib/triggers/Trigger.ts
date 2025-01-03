export abstract class Trigger {
  /** Used internally, kebab-case ID */
  abstract id: string
  /** Display name for the user */
  abstract name: string

  async isEnabled() {
    return true // temp until config is implemented
    return await storage.getItem<boolean>(`sync:trigger:${this.id}:enabled`) || false
  }
  async setEnabled(enabled: boolean) {
    await storage.setItem(`sync:trigger:${this.id}:enabled`, enabled)
  }
  
  /** set up the trigger */
  abstract setup(callback: () => void): void
}