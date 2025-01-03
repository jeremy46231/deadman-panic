import type { Action } from './Action'
import { TestAction } from './TestAction'

// Add all actions to this list
export const allActions = [new TestAction()] satisfies Action[]

export async function runActions() {
  const actionPromises = allActions.map(async (action) => {
    if (await action.isEnabled()) {
      return action.run()
    }
  })
  await Promise.all(actionPromises)
}
