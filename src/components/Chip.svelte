<script lang="ts">
  import ColorBlock from "./ColorBlock.svelte";
  import type { Color } from "./ColorBlock.svelte";

  export let color: Color;
</script>

<section>
  <div class="color">
    <ColorBlock {color} />
  </div>
  <p class="code">{color.code}</p>
  <p class="name">{color.name || "--"}</p>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
  }

  .color {
    width: 280px;
  }

  p {
    margin: 0;
  }

  .code {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1rem;
  }

  .name {
    margin-top: 0.5rem;
    font-size: 1.25rem;
  }

  .name:after {
    content: "";
    display: inline-block;
  }
</style>
