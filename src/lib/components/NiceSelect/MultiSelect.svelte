<script lang="ts">
  import Label from "../Label.svelte";
  export let values = [];
  export let options = [];
  export let label = "";
  export let errors = [];
  export let className = "";

  const selectOption = (optionValue) => {
    const isSelected = values.includes(optionValue);
    if (isSelected) {
      values = values.filter((value) => value !== optionValue);
    } else {
      values = [...values, optionValue];
    }
  };
</script>

<div>
  <Label {label} {errors} />

  <div class={className}>
    {#each options as option}
      <div
        on:click={() => selectOption(option.value)}
        class="option bg-secondary border-primary {values?.includes(
          option.value
        )
          ? 'selected'
          : ''}"
      >
        {option.label}
      </div>
    {/each}
  </div>
</div>

<style type="text/postcss">
  .option {
    @apply flex justify-center items-center cursor-pointer p-2 my-2 rounded-xl font-bold text-lg transition-all duration-200 ease-in-out shadow-sm text-secondary min-w-[60px];
  }

  .selected {
    @apply bg-accent text-primary;
  }
</style>
