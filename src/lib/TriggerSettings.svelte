<script lang="ts">
  import type { Trigger } from './triggers/Trigger'
  import { onMount } from 'svelte'

  const { trigger }: { trigger: Trigger } = $props()

  let isEnabled = $state(false)
  let hasLoaded = $state(false)
  let isSaving = $state(false)
  let previousValue: boolean

  onMount(async () => {
    isEnabled = await trigger.enabled.getValue()
    hasLoaded = true
  })

  $effect(() => {
    let cancelled = false
    if (hasLoaded && isEnabled !== previousValue) {
      previousValue = isEnabled
      isSaving = true
      ;(async () => {
        await trigger.enabled.setValue(isEnabled)
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
    {trigger.name}
  </label>
</span>
