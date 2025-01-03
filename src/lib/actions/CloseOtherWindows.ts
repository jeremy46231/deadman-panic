import { Action } from "./Action"
const regex_for_test =  /(saahild.com|github.com)/
export class CloseTabsAction extends Action {
  id = 'closed-regexed-windows'
  name = 'Close Windows (regex)'

  async run() {
    console.log('Bye bye tabs')
    // browser.tabs.getCurrent().then(console.log)
const tabs = await browser.tabs.query({})
for(const tab of tabs) {
    console.log(regex_for_test.test(tab.url!), tab.url, tab.pendingUrl)
    if(tab.url && tab.url.match(regex_for_test)) {
        if(tab.active) {
            // redirect tab
            browser.tabs.update(tab.id!, { url: `https://motherfuckingwebsite.com/`})
        } else  {
            browser.tabs.remove(tab.id!)
        }
    }

}
  }
}