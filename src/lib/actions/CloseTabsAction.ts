import { domains, safeURL } from '../configOptions'
import { Action } from './Action'

export class CloseTabsAction extends Action {
  name = 'Close Tabs'
  constructor() {
    super('close-tabs')
  }

  async run() {
    const domainList = await domains.getValue()
    const safePage = await safeURL.getValue()

    const tabs = await browser.tabs.query({})

    console.log(domainList, safePage, tabs)

    const tabsToClose = tabs.filter((tab) => {
      try {
        const url = new URL(tab.url!)
        if (!url.hostname) return false
        return !domainList.some(
          (domain) =>
            url.hostname === domain || url.hostname.endsWith('.' + domain)
        )
      } catch {
        return false
      }
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
