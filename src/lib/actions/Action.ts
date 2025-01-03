export abstract class Action {
  /** Used internally, kebab-case ID */
  abstract id: string
  /** Display name for the user */
  abstract name: string

  async isEnabled() {
    return (
      (await storage.getItem<boolean>(`sync:action:${this.id}:enabled`)) ||
      false
    )
  }
  async setEnabled(enabled: boolean) {
    await storage.setItem(`sync:action:${this.id}:enabled`, enabled)
  }

  /** Panic! Run the action. */
  abstract run(): void | Promise<void>
}
