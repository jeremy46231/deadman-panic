import { runActions } from "@/lib/actions"
import { setupTriggers } from "@/lib/triggers"

async function panic() {
  console.log('Panic!')
  await runActions()
  console.log('Actions completed')
}

export default defineBackground(() => {
  console.log('hello world')
  setupTriggers(panic)
  console.log('Triggers have been set up!')
  browser.runtime.onStartup.addListener(() => {
    console.log('onStartup')
  })
})
