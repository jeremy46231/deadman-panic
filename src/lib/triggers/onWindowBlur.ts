import { Trigger } from './Trigger'

export class WindowBlur extends Trigger {
  name = 'Window blur'
  constructor() {
    super('windowblur')
  }

  default = false
 inFocus = true 
 async checkWindow(window:number) {
  if(window == browser.windows.WINDOW_ID_NONE && this.inFocus) {
    this.req_callback!()
    this.inFocus = false
  } else {
    this.inFocus = true
  }
 }
 req_callback: (() => void) | undefined
  start(callback: () => void) {
    // on window blur for active tab
this.req_callback = callback;
    browser.windows.onFocusChanged.addListener(this.checkWindow)
  }

  stop(): void {
      browser.windows.onFocusChanged.removeListener(this.checkWindow)
}
}
