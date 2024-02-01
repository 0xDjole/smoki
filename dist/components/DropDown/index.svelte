<script>import { _ } from "svelte-i18n";
import Modal from "../Modal/index.svelte";
import SvgIcon from "../SvgIcon.svelte";
import Label from "../Label.svelte";
import DropDownIcon from "../../utils/icons/dropdown.svg?raw";
export let value = null;
export let options = [];
export let label = "";
export let errors = [];
let showModal = false;
const selectOption = (optionValue) => {
    value = optionValue;
    showModal = false;
};
$: selectedOption = options.find((option) => option.value === value);
</script>

<div>
  <Label {errors} {label} />
  <div
    on:click={() => (showModal = true)}
    class="flex justify-between option bg-secondary border-primary selected"
  >
    <span>{selectedOption?.label || $_("choose")}</span>

    <SvgIcon data={DropDownIcon} width={"25px"} size={"25px"} color={"white"} />
  </div>
</div>

<Modal
  height={"60%"}
  title={`${$_("choose")}`}
  {showModal}
  onCancel={() => (showModal = false)}
>
  <div class="px-3">
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
</Modal>

<style>
  .option {

    margin-top: 0.5rem;

    margin-bottom: 0.5rem;

    cursor: pointer;

    border-radius: 0.375rem;

    padding: 0.25rem;

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

@media (min-width: 768px) {

    .option {

        padding: 0.75rem
    }
}

  .selected {

    background-color: var(--accent-background-color);

    color: var(--primary-text-color)
}</style>
