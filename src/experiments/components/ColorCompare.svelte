<script lang="ts">
  import Chip from "./Chip.svelte";
  import colorsJson from "../../assets/filtered-p3 2.json";
  import { buildPng } from "../../utils/p3-pixels";
  import type { Color as ColorType } from "../../components/Chip.svelte";
  import { onMount, onDestroy } from "svelte";

  let Color;
  let mounted = false;
  onMount(async () => {
    Color = (await import("colorjs.io")).default;
    mounted = true;
  });

  let index = 0;
  // console.log(colorsJson)
  let p3Colors = colorsJson.filter((color) => color.gamut === "p3");
  // console.log(p3Colors);

  let colors = p3Colors;

  // let color: ColorType = {
  //   book: "FHI Nylon Brights TN",
  //   cmky: null,
  //   code: "13-0340 TN",
  //   hex: "69FF47",
  //   lab: [93.73, -70.74, 72.03],
  //   name: "Green Gecko",
  //   p3: [0.5864011893876834, 1.0437955019170877, 0.427574349035647],
  //   p3Short: [38430, 2870, 28021],
  //   rgb: [105, 255, 71]
  // };

  //   let color: ColorType = {
  //     book: "Formula Guide Coated",

  // cmky: null,

  // code: "2069 C",

  // hex: "A438A8",

  // lab: [44.24, 55.3, -36.57],

  // name: null,

  // p3: [0.6073222595351847, 0.2565194538532654, 0.635676505002708],

  // p3Short: [39801, 16811, 41659],

  // rgb: [164, 56, 168],
  //   }

  let color: ColorType = {
    code: "18-4630 TCX",
    name: "Tahitian Tide",
    rgb: [0, 108, 127],
    hex: "006C7F",
    lab: [39.78, -26.42, -21.58],
    cmky: null,
    book: "FHI Cotton TCX",
    p3: [0.05842927400781207, 0.40868662971737485, 0.4926439472376048],
    p3Short: [3828, 26782, 32284],
    gamut: "p3"
  };

  $: console.log(color);

  function randomColor(): ColorType {
    const randomInt = Math.floor(Math.random() * colors.length);
    return colors[randomInt];
  }

  $: rgb = (() => {
    const [r, g, b] = color.rgb;
    return `rgb(${r}, ${g}, ${b})`;
  })();

  $: hex = (() => {
    return "#" + color.hex;
  })();

  $: p3 = (() => {
    const [r, g, b] = color.p3;
    return `color(display-p3 ${r} ${g} ${b})`;
  })();

  $: p3Short = (() => {
    const [r, g, b] = color.p3Short;
    return `url(${buildPng(r, g, b)})`;
  })();

  $: colorJsP3 = (() => {
    if (!mounted) {
      return null;
    }
    let c = new Color({ space: "lab", coords: color.lab });
    let cP3 = c.to("p3");
    let [r, g, b] = cP3.coords;
    return `color(display-p3 ${r} ${g} ${b})`;
  })();

  $: colorJs = (() => {
    if (!mounted) {
      return null;
    }
    let c = new Color({ space: "lab", coords: color.lab });
    let cP3 = c.to("p3");
    let [r, g, b] = cP3.coords;
    let s = 65536;
    return `url(${buildPng(Math.trunc(r * s), Math.trunc(g * s), Math.trunc(b * s))})`;
  })();

  $: labToRGB = (() => {
    if (!mounted) {
      return "none";
    }
    let c = new Color({ space: "lab", coords: color.lab });
    let cP3 = c.to("srgb");
    return cP3.toString({ inGamut: false });
  })();
  $: console.log(labToRGB);

  $: p3GammutIcon = color.name !== null ? "💥" : "";

  $: name = color.name !== null ? color.name + " " : "";

  $: console.log("LAB TO RGB:", labToRGB);
  $: console.log("ACTUAL RGB:", color.rgb);
</script>

<svelte:window on:keydown={() => (color = randomColor())} />
<h3>Color Comparison ({name}{color.code})</h3>
<h3>P3: {color.p3}</h3>
<p>LAB: {color.lab}, P3 Short: {color.p3Short}</p>
<main style:--color={rgb}>
  <Chip name="rgb" colorStyle={rgb} />
  <Chip name="hex" colorStyle={hex} />
  <Chip name={`p3 (vin) ${p3GammutIcon}`} colorStyle={p3} />
  <Chip name={`p3Short (vin) in image ${p3GammutIcon}`} colorStyle={p3Short} />
  {#if mounted}
    <Chip name={`p3 (colorjs) ${p3GammutIcon}`} colorStyle={colorJsP3} />
    <Chip name={`p3Short (colorjs) in image ${p3GammutIcon}`} colorStyle={colorJs} />
    <Chip name={`lab to rgb (colorjs)`} colorStyle={labToRGB} />
  {/if}
</main>

<style>
  @media (color-gamut: p3) {
    main {
      /* background-color: color(display-p3 1 0 0.331); */
      /* background-color: rgb(38.591% 105.76% 30.432%); */
    }
  }

  main {
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;

    /* background-color: color(display-p3 1 0 0.331);
    background-color: rgb(0% 67.39% 98.14%); */
    background: var(--color);
  }
</style>
