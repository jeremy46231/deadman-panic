import { Action } from './Action'

export class TestAction extends Action {
  name = 'Test Action'
  constructor() {
    super('test-action')
  }

  run() {
    console.log('Test action ran!')
    browser.tabs.create({ url: 'data:text/plain,Test action ran!' })
  }
}
