import { Trigger } from './Trigger'

export class KeyboardShortcutTrigger extends Trigger {
  name = 'Keyboard Shortcut'
  constructor() {
    super('keyboard-shortcut')
  }

  start(callback: () => void) {
    browser.commands.onCommand.addListener(async (command) => {
      if (
        command === 'panicKeyboardShortcut' &&
        (await this.enabled.getValue())
      ) {
        callback()
      }
    })
  }

  stop(): void {}
}
