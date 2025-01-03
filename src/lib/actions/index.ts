import type { Action } from './Action'
import { TestAction } from './TestAction'
import { CloseTabsAction } from './CloseTabsAction'

// Add all actions to this list
export const allActions = [
  new TestAction(),
  new CloseTabsAction(),
] satisfies Action[]

export async function runActions() {
  const actionPromises = allActions.map(async (action) => {
    if (await action.enabled.getValue()) {
      return action.run()
    }
  })
  await Promise.all(actionPromises)
}
