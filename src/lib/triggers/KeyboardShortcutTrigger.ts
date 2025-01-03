import { Trigger } from "./Trigger"

export class KeyboardShortcutTrigger extends Trigger {
  id = 'keyboard-shortcut'
  name = 'Keyboard Shortcut'

  setup(callback: () => void) {
    browser.commands.onCommand.addListener((command) => {
      if (command === 'panicKeyboardShortcut') {
        callback()
      }
    })
  }
}