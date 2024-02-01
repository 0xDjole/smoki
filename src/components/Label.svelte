<script lang="ts">
  export let label = "";
  export let errors = [];
</script>

{#if label}
  <label class:label-error={errors.length} for={label} class="label"
    >{label}</label
  >
{/if}

<style type="text/postcss">
  .label {
    @apply text-white text-lg mb-2 font-bold md:text-2xl;
  }

  .label-error {
    @apply text-error;
  }
</style>
