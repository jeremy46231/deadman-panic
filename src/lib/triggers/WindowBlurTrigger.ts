import { Trigger } from './Trigger'

export class WindowBlurTrigger extends Trigger {
  name = 'Window Blur'
  constructor() {
    super('window-blur')
  }

  makeListener(callback: () => void) {
    let inFocus = true
    return function (window: number) {
      console.log('checking window', window)
      if (window === browser.windows.WINDOW_ID_NONE && inFocus) {
        callback()
        console.log('WindowBlurTrigger callback', callback)
        inFocus = false
      } else {
        inFocus = true
      }
    }
  }
  listener: ReturnType<typeof this.makeListener> | undefined
  start(callback: () => void) {
    this.listener = this.makeListener(callback)
    browser.windows.onFocusChanged.addListener(this.listener)
    console.log('WindowBlurTrigger started', callback)
  }
  stop() {
    if (!this.listener) return
    browser.windows.onFocusChanged.removeListener(this.listener)
    this.listener = undefined
  }
}
