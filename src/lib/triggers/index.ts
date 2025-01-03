import { KeyboardShortcutTrigger } from "./KeyboardShortcutTrigger"

const triggers = [
  new KeyboardShortcutTrigger(),
]

export function setupTriggers(callback: () => void) {
  triggers.forEach(trigger => {
    trigger.setup(async () => {
      if (await trigger.isEnabled()) {
        callback()
      }
    })
  })
} 