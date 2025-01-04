import type { Trigger } from './Trigger'
import { KeyboardShortcutTrigger } from './KeyboardShortcutTrigger'
import { WindowBlurTrigger } from './WindowBlurTrigger'

// Add all triggers to this list
export const allTriggers = [
  new KeyboardShortcutTrigger(),
  new WindowBlurTrigger(),
] satisfies Trigger[]

export async function setupTriggers(callback: () => void) {
  for (const trigger of allTriggers) {
    trigger.enabled.watch((enabled) => {
      if (enabled) {
        trigger.start(callback)
      } else {
        trigger.stop()
      }
    })
    if (await trigger.enabled.getValue()) {
      trigger.start(callback)
    }
  }
}
