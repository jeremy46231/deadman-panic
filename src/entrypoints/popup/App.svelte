<script lang="ts">
  import { allTriggers } from '@/lib/triggers'
  import { allActions } from '@/lib/actions'
  import TriggerSettings from '@/components/TriggerSettings.svelte'
  import ActionSettings from '@/components/ActionSettings.svelte'
  import ConfigOptions from '@/components/ConfigOptions.svelte'
</script>

<main>
  <form>
    <h2>Triggers</h2>
    {#each allTriggers as trigger}
      <TriggerSettings {trigger}></TriggerSettings>
    {/each}

    <h2>Actions</h2>
    {#each allActions as action}
      <ActionSettings {action}></ActionSettings>
    {/each}

    <h2>Config</h2>
    <ConfigOptions></ConfigOptions>
  </form>
</main>

<style>
  h2 {
    margin-block: 0.5rem;
  }
  main {
    width: 20rem;
    margin: 1rem;
  }
</style>
