<script>
  import { onMount, onDestroy } from "svelte";
  export let open = false;
  export let duration = 0.8;
  export let placement = "right";
  export let size = null;
  export let zIndex = -1;
  export let height = null;
  export let width = null;
  export let left = null;
  export let targetElement = null;

  let w = "100%";

  let l = "0";

  let drawerTargetTop = 0;

  $: h = `calc(100vh - ${drawerTargetTop}px)`;
  let percentageX = 0;

  $: if (left) {
    l = left;
  }

  $: if (height) {
    h = height;
  }

  $: if (width) {
    w = width;
  }

  $: transform =
    placement === "right"
      ? `transform: translate(${percentageX}%, 0)`
      : `transform: translate(0, ${percentageX}%)`;

  $: style = `--duration: ${duration}s; --size: ${size}; z-index: ${zIndex}; ${
    percentageX > 0 && transform
  }; height: ${h}; width: ${w}; left: ${l}px; top: ${drawerTargetTop}px`;

  $: if (open) {
    percentageX = 0;
  } else {
    percentageX = 100;
  }

  $: drawerTargetTop = targetElement?.getBoundingClientRect()?.top;

  function updatePosition() {
    if (typeof window !== "undefined" && targetElement) {
      drawerTargetTop = targetElement.getBoundingClientRect().top;
    }
  }

  onMount(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updatePosition);
      updatePosition(); // initial calculation
    }
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", updatePosition);
    }
  });
</script>

<div class="drawer" {style}>
  <div class="panel {placement}">
    <slot />
  </div>
</div>

<style type="text/postcss">
  .drawer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    transition: transform var(--duration) ease;
  }

  .panel {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
    overflow: hidden;
  }
</style>
