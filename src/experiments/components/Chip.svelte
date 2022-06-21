<script lang="ts">
  export let colorStyle: string;
  export let name: string;
</script>

<div>
  <p>{name}</p>
  <div class="chip" style:--background={colorStyle}></div>
</div>

<style>
  p {
    line-height: 1.5rem;
    font-size: 12px;
  }

  .chip {
    --size: 150px;
    width: var(--size);
    height: var(--size);
    background: var(--background);
  }
</style>