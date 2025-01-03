import { Action } from "./Action"

export class TestAction extends Action {
  id = 'test-action'
  name = 'Test Action'

  run() {
    console.log('Test action ran!')
    //  sorry openning tabs is interfering with the other one
    // browser.tabs.create({ url: 'data:text/plain,Test action ran!' })
  }
}