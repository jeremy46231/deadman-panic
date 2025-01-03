import { CloseTabsAction } from "./CloseOtherWindows"
import { TestAction } from "./TestAction"

// Add all actions to this list
const actions = [
  new TestAction(),
  new CloseTabsAction()
]

export async function runActions() {
  const actionPromises = actions.map(async action => {
    if (await action.isEnabled()) {
      return action.run()
    }
  })
  await Promise.all(actionPromises)
}
