<script lang="ts">
  import MultiSelect from "./MultiSelect.svelte";
  import Label from "../Label.svelte";

  export let value = null;
  export let options = [];
  export let label = "";
  export let errors = [];
  export let className = "";
  export let ui = "default";
  export let isMultiSelect = false;

  const selectOption = (optionValue) => {
    const isSelected = value === optionValue;
    value = isSelected ? null : optionValue;
  };
</script>

{#if isMultiSelect}
  <MultiSelect bind:values={value} {options} {className} {errors} {label} />
{:else}
  <div>
    <Label {label} {errors} />

    <div class={className}>
      {#each options as option}
        <div
          on:click={() => selectOption(option.value)}
          class="option bg-secondary border-primary {value === option.value
            ? 'selected'
            : ''}"
        >
          {option.label}
        </div>
      {/each}
    </div>
  </div>
{/if}

<style type="text/postcss">
  .option {
    @apply flex justify-center items-center cursor-pointer p-2 my-2 rounded-xl font-bold text-lg transition-all duration-200 ease-in-out shadow-sm text-secondary hover:opacity-60 min-w-[60px];
  }

  .selected {
    @apply bg-accent text-primary;
  }
</style>
