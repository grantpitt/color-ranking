<script lang="ts" context="module">
  export type Color = {
    code: string;
    name: string | null;
    rgb: [number, number, number];
    hex: string;
    lab: [number, number, number];
    cmky: [number, number, number] | null;
    book: string;
    p3: [number, number, number];
    p3Short: [number, number, number];
    gamut: string;
    score: number;
  };
</script>

<script lang="ts">
  import { browser } from "$app/env";
  import { buildPng } from "../utils/p3-pixels";

  export let color: Color;

  const isP3Available = browser && CSS.supports("color", "color(display-p3 0 0 0)");

  function backgroundStyle(color: Color) {
    if (isP3Available) {
      const [r, g, b] = color.p3;
      return `background-color: #${color.hex}; background-color: color(display-p3 ${r} ${g} ${b});`;
    }
    const [r, g, b] = color.p3Short;
    return `background: url(${buildPng(r, g, b)});`;
  }
</script>

<div class="color" style={backgroundStyle(color)} />

<style>
  .color {
    width: 100%;
    aspect-ratio: 1 / 1;
    background: var(--background-url);
  }
</style>
