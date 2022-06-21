import type { RequestHandler } from "./__types";

function randomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

export const get: RequestHandler<{
  leftIndex: number;
  rightIndex: number;
}> = () => {
  const numColors = 22875;
  const leftIndex = randomNumber(numColors);
  const rightIndex = randomNumber(numColors);
  return {
    body: {
      leftIndex,
      rightIndex
    }
  };
};
