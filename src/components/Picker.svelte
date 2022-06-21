<script lang="ts">
  import Chip from "../components/Chip.svelte";
  import Key from "../components/Key.svelte";
  import { fly } from "svelte/transition";
  import type { Color } from "./ColorBlock.svelte";
  import { scoreUpdates } from "../utils/color";
  import ColorBlock from "./ColorBlock.svelte";
  import colors from "../utils/store";

  $: ranking = [...$colors].sort((a, b) => b.score - a.score);

  export let leftIndex: number;
  export let rightIndex: number;

  $: options = {
    left: <Color>$colors[leftIndex],
    right: <Color>$colors[rightIndex]
  };

  function randomIndex() {
    return Math.floor(Math.random() * $colors.length);
  }

  function setNextColorIndex(side: "left" | "right" | "both") {
    if (side === "left" || side === "both") {
      leftIndex = randomIndex();
    }
    if (side === "right" || side === "both") {
      rightIndex = randomIndex();
    }
  }

  function clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
  }

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

  function updateColors() {
    leftIndex = randomIndex();
    const epsilon = 100;
    const leftRank = ranking.findIndex(color => color.code === $colors[leftIndex].code);
    const rightRank = clamp(getRandomInt(-epsilon, epsilon) + leftRank, 0, ranking.length);
    console.log({ rightRank, leftIndex, leftRank });
    rightIndex = $colors.findIndex(color => color.code === ranking[rightRank].code);
    console.log(leftRank, rightRank, leftIndex, rightIndex);
    // rightIndex = leftIndex + 2; // randomIndex();
  }

  let showHint = false;
  function hint() {
    showHint = true;
    setInterval(() => {
      showHint = false;
    }, 3000);
  }

  const pick = (winner: "left" | "right") => () => {
    const resultIndexMap = {
      left: leftIndex,
      right: rightIndex
    };
    const loser = winner === "left" ? "right" : "left";
    const winnerIndex = resultIndexMap[winner];
    const loserIndex = resultIndexMap[loser];
    console.log(`${winner} wins!`);
    colors.updateScores(scoreUpdates(winnerIndex, loserIndex, $colors));
    // setNextColorIndex(loser);
    updateColors();
    console.log("next color set!");
  };
</script>

<div class="options">
  <div class="option">
    <Chip color={options.left} />
    <Key key="ArrowLeft" on:pick={pick("left")} on:click|once={hint} />
    <!-- <div class="similar-section">
      {#each leftNear as color}
        <ColorBlock {color} />
      {/each}
    </div> -->
  </div>
  <div class="option">
    <Chip color={options.right} />
    <Key key="ArrowRight" on:pick={pick("right")} on:click|once={hint} />
    <!-- <div class="similar-section">
      {#each rightNear as color}
        <ColorBlock {color} />
      {/each}
    </div> -->
  </div>
</div>

<div class="ranking">
  {#each ranking.slice(0, 20) as color}
    <ColorBlock {color} />
  {/each}
</div>

{#if showHint}
  <div class="hint" transition:fly={{ duration: 500, x: 500 }}>
    <p>You can use your arrow keys to pick your prefered color!</p>
  </div>
{/if}

<style>
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    margin: 1.5rem 0;
  }

  .option {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    place-self: start;
    gap: 3rem;
  }

  .hint {
    position: absolute;
    bottom: 1rem;
    right: 0;
    width: 500px;
    display: grid;
    place-content: center;
    background-color: #f4f4f4;
    border: 1px solid #dedede;
    border-radius: 0.25rem 0 0 0.25rem;
  }

  /* .similar-section {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
  } */

  .ranking {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    gap: 4px;
    margin-top: 4rem;
  }
</style>
