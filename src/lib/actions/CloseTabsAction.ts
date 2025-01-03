import { domains, safeURL } from '../configOptions'
import { Action } from './Action'
const regex_for_test = /(saahild.com|github.com)/

export class CloseTabsAction extends Action {
  name = 'Close Tabs'
  constructor() {
    super('close-tabs')
  }

  async run() {
    console.log('Bye bye tabs')

    const domainList = await domains.getValue()
    const safePage = await safeURL.getValue()

    const tabs = await browser.tabs.query({})

    const tabsToClose = tabs.filter((tab) => {
      const url = new URL(tab.url!)
      return !domainList.includes(url.hostname)
    })

    for (const tab of tabsToClose) {
      if (tab.active && safePage) {
        browser.tabs.update(tab.id!, {
          url: safePage,
        })
      } else {
        browser.tabs.remove(tab.id!)
      }
    }
  }
}
