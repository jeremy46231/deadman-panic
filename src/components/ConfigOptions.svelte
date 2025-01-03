<script lang="ts">
  import { domains, safeURL } from '@/lib/configOptions'
  // ^ both have async .getValue() and .setValue() methods
  // domains has string[], safeURL has string
  import { onMount } from 'svelte'

  let domainList = $state('')
  let urlValue = $state('')
  let keyboardShortcut = $state('')
  let hasLoaded = $state(false)

  let previousDomains = ''
  let previousURL = ''

  onMount(async () => {
    const savedDomains = await domains.getValue()
    domainList = savedDomains.join('\n')
    urlValue = await safeURL.getValue()
    const allCommands = await browser.commands.getAll()
    keyboardShortcut =
      allCommands.find((c) => c.name === 'panicKeyboardShortcut')?.shortcut ||
      ''
    hasLoaded = true
  })

  $effect(() => {
    if (!hasLoaded) return
    if (domainList !== previousDomains) {
      previousDomains = domainList
      domains.setValue(
        domainList
          .split('\n')
          .map((d) => d.trim())
          .filter(Boolean)
      )
    }
  })

  $effect(() => {
    if (!hasLoaded) return
    if (urlValue !== previousURL) {
      previousURL = urlValue
      safeURL.setValue(urlValue)
    }
  })
</script>

<div class="option">
  <label>
    <p>Domains</p>
    <textarea
      placeholder="github.com
docs.google.com"
      bind:value={domainList}
      disabled={!hasLoaded}
    ></textarea>
  </label>
  <p>
    Enter one domain per line. This will be compared against <a
      href="https://developer.mozilla.org/docs/Web/API/URL/hostname"
      ><code>url.hostname</code></a
    >.
  </p>
</div>

<div class="option">
  <label>
    <p>Safe URL</p>
    <input
      type="text"
      placeholder="about:newtab"
      bind:value={urlValue}
      disabled={!hasLoaded}
    />
  </label>
  <p>
    If a tab to be closed is currently visible, it will be replaced with this
    URL. <code>about:newtab</code> can be used to replace with a new tab. If this
    is blank, the tab will be closed anyway.
  </p>
</div>

<div>
  <label>
    <p>Keyboard Shortcut</p>
    <input type="text" bind:value={keyboardShortcut} disabled={true} />
  </label>
  <p>
    This is the keyboard shortcut to trigger a panic. It can be changed <a
      href="chrome://extensions/shortcuts">here</a
    >.
  </p>
</div>

<style>
  .option {
    margin-block: 0.5rem;
  }
</style>
