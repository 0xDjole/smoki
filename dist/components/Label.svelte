<script>export let label = "";
export let errors = [];
</script>

{#if label}
  <label class:label-error={errors.length} for={label} class="label"
    >{label}</label
  >
{/if}

<style>
  .label {

    margin-bottom: 0.5rem;

    font-size: 1.125rem;

    line-height: 1.75rem;

    font-weight: 700;

    --tw-text-opacity: 1;

    color: rgb(255 255 255 / var(--tw-text-opacity))
}

@media (min-width: 768px) {

    .label {

        font-size: 1.5rem;

        line-height: 2rem
    }
}

  .label-error {

    color: var(--error-background-color)
}</style>
