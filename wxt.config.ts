import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-svelte'],
  manifest: {
    permissions: ['storage'],
    commands: {
      panicKeyboardShortcut: {
        suggested_key: {
          default: 'Ctrl+Shift+1',
        },
        description: 'Trigger',
        global: true,
      },
    },
  },
})
