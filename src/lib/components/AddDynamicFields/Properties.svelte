<script lang="ts">
  import Switch from "../Switch/index.svelte";
  import Options from "./Options.svelte";
  import Range from "./Range.svelte";
  import Label from "../Label.svelte";

  export let label = "Custom fields";
  export let value;
  export let errors = [];
</script>

<Label {label} {errors} />

<div class="properties">
  <Switch
    label="Is custom input allowed"
    bind:value={value.isCustomInputAllowed}
  />

  <Switch label="Is multiselect" bind:value={value.isMultiSelect} />

  <Options label="Options" bind:options={value.options} />

  <Range label="Range" bind:range={value.range} />
</div>

<style type="text/postcss">
  .properties {
    @apply flex flex-col gap-y-2 p-3;
  }

  .custom-field-body {
    @apply flex flex-col   border-secondary rounded-md p-2 gap-y-2;
  }

  .add-field-body {
    @apply p-3 h-[600px] overflow-y-scroll;
  }

  .field-item {
    @apply flex text-primary font-bold justify-between;
  }

  .fields {
    @apply flex text-primary font-bold gap-2;
  }
</style>
