import type { Color } from "../components/ColorBlock.svelte";

let printStd = true;
export function scoreUpdates(winnerIndex: number, loserIndex: number, colors: Color[]) {
  const updates = new Map<number, number>();
  const winnerColor = colors[winnerIndex];
  const loserColor = colors[loserIndex];
  const [winnerDelta, loserDelta] = eloDeltas(winnerColor.score, loserColor.score);
  const radius = 7;
  printStd = true;
  colors.forEach((color, index) => {
    const normToWinner = norm(color.lab, winnerColor.lab);
    const normToLoser = norm(color.lab, loserColor.lab);
    // const deltaFromWinner = normToWinner < radius ? normalish(normToWinner) * winnerDelta : 0;
    // const deltaFromLoser = normToLoser < radius ? normalish(normToLoser) * loserDelta : 0;
    const deltaFromWinner =
      normalish(norm(color.lab, winnerColor.lab), winnerColor.score) * winnerDelta;
    const deltaFromLoser =
      normalish(norm(color.lab, loserColor.lab), loserColor.score) * loserDelta;
    const scoreUpdate = deltaFromWinner + deltaFromLoser;
    updates.set(index, scoreUpdate);
  });
  return updates;
}

function eloDeltas(winnerScore: number, loserScore: number) {
  const winnerDelta = 2 / (1 + Math.pow(10, (loserScore - winnerScore) / 400));
  const loserDelta = -2 / (1 + Math.pow(10, (winnerScore - loserScore) / 400));
  console.log("winnerDelta", winnerDelta);
  console.log("loserDelta", loserDelta);
  return [winnerDelta, loserDelta];
}

// Convert linear 0-1 value to normalish distribution
function normalish(norm: number, score: number) {
  const stdDev = (1 / (Math.abs(score) + (1 / 4))) + 2;
  if (printStd) {
    console.log("stdDev", stdDev);
    printStd = false;
  }
  return Math.exp(-0.5 * Math.pow(norm / stdDev, 2));
}

function norm(lab1: Color["lab"], lab2: Color["lab"]) {
  return Math.sqrt(
    Math.pow(lab1[0] - lab2[0], 2) + Math.pow(lab1[1] - lab2[1], 2) + Math.pow(lab1[2] - lab2[2], 2)
  );
}
