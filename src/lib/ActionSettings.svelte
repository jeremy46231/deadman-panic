<script lang="ts">
  import type { Action } from './actions/Action'
  import { onMount } from 'svelte'

  const { action }: { action: Action } = $props()

  let isEnabled = $state(false)
  let hasLoaded = $state(false)
  let isSaving = $state(false)
  let previousValue: boolean

  onMount(async () => {
    isEnabled = await action.enabled.getValue()
    hasLoaded = true
  })

  $effect(() => {
    let cancelled = false
    if (hasLoaded && isEnabled !== previousValue) {
      previousValue = isEnabled
      isSaving = true
      ;(async () => {
        await action.enabled.setValue(isEnabled)
        if (cancelled) return
        isSaving = false
      })()
    }
    return () => cancelled = true
  })
</script>

<span>
  <label>
    <input
      type="checkbox"
      bind:checked={isEnabled}
      disabled={!hasLoaded || isSaving}
    />
    {action.name}
  </label>
</span>
