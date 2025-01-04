import { KeyboardShortcutTrigger } from './KeyboardShortcutTrigger'
import { WindowBlur } from './onWindowBlur'
import { Trigger } from './Trigger'

export const allTriggers = [new KeyboardShortcutTrigger(), new WindowBlur()] satisfies Trigger[]

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
