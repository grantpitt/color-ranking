import { writable } from "svelte/store";
import produce from "immer";
import type { Color } from "../components/ColorBlock.svelte";
import untypedColors from "../assets/filtered-p3 2.json";
const colors = untypedColors as Array<Color>;

function createColorStore() {
  const { subscribe, set, update } = writable(
    colors.map((color) => ({
      ...color,
      score: 0
    }))
  );
  return {
    subscribe,
    updateScores: (updates: Map<number, number>) =>
      update((state) => {
        for (const [index, scoreDelta] of updates) {
          state[index].score += scoreDelta;
        }
        return state;
      })
  };
}

const colorStore = createColorStore();
export default colorStore;
