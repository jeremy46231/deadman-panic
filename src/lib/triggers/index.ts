import { KeyboardShortcutTrigger } from './KeyboardShortcutTrigger'
import { Trigger } from './Trigger'

export const allTriggers = [new KeyboardShortcutTrigger()] satisfies Trigger[]

export function setupTriggers(callback: () => void) {
  allTriggers.forEach((trigger) => {
    trigger.setup(async () => {
      if (await trigger.isEnabled()) {
        callback()
      }
    })
  })
}
