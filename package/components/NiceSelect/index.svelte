<script>import MultiSelect from "./MultiSelect.svelte";
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

<style>
  .option {

    margin-top: 0.5rem;

    margin-bottom: 0.5rem;

    display: flex;

    min-width: 60px;

    cursor: pointer;

    align-items: center;

    justify-content: center;

    border-radius: 0.75rem;

    padding: 0.5rem;

    font-size: 1.125rem;

    line-height: 1.75rem;

    font-weight: 700;

    color: var(--secondary-text-color);

    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);

    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

    transition-property: all;

    transition-duration: 200ms;

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)
}

.option:hover {

    opacity: 0.6
}

  .selected {

    background-color: var(--accent-background-color);

    color: var(--primary-text-color)
}</style>
