<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let key: "ArrowLeft" | "ArrowRight";
  $: icon = {
    ArrowLeft: "←",
    ArrowRight: "→"
  }[key];

  const dispatch = createEventDispatcher();

  function pick() {
    dispatch("pick");
  }

  function click() {
    dispatch("click");
    dispatch("pick");
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === key) {
      pick();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />
<button
  class="key"
  on:click={click}
  title="You can use your arrow keys to pick your prefered color!"
>
  <kbd>{icon}</kbd>
</button>

<style>
  .key {
    --scale: 2;

    background: linear-gradient(-120deg, rgb(244, 243, 243), #f1f0f0);
    box-shadow: 0 0 0 calc(var(--scale) * 1px) #dedede,
      calc(var(--scale) * 1px) calc(var(--scale) * 1px) 0 calc(var(--scale) * 1px) #e8e8e8;
    text-align: center;

    padding: calc(var(--scale) * 0.25rem) calc(var(--scale) * 0.5rem);
    border-radius: 0.25rem;
    display: inline-block;
    font-family: inherit;
    font-size: calc(var(--scale) * 0.875rem);
    line-height: calc(var(--scale) * 1rem);
    white-space: nowrap;
    font-weight: 500;
    color: #454545;
    border: none;
  }

  button:focus {
    outline: none;
  }
</style>
