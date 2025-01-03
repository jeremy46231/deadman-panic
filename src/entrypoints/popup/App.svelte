<script lang="ts">
  import { allTriggers } from '@/lib/triggers'
  import { allActions } from '@/lib/actions'
  import TriggerSettings from '@/lib/TriggerSettings.svelte'
  import ActionSettings from '@/lib/ActionSettings.svelte'
</script>

<main>
  <form>
    <h2>Triggers</h2>
    {#each allTriggers as trigger}
      <TriggerSettings {trigger}></TriggerSettings>
    {/each}
  </form>

  <form>
    <h2>Actions</h2>
    {#each allActions as action}
      <ActionSettings {action}></ActionSettings>
    {/each}
  </form>
</main>

<style>
  h2 {
    margin-block: 0.5rem;
  }
  main {
    width: max-content;
    margin: 1rem;
  }
</style>
