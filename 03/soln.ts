import fs from "fs";

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data.trim().split("\n");

  const mapping = lines.map((line) => line.split("").map(Number));

  let part1 = 0;
  let part2 = 0;

  for (let i = 0; i < mapping.length; i++) {
    part1 += voltage(mapping[i], 2);
    part2 += voltage(mapping[i], 12);
  }

  console.log("Part1:", part1);
  console.log("Part2:", part2);
});

function voltage(mapping: number[], n: number): number {
  if (n === 0) {
    return 0;
  }

  let maxV = -1;
  let maxIdx = -1;

  for (let i = 0; i <= mapping.length - n; i++) {
    if (maxV < mapping[i]) {
      maxV = mapping[i];
      maxIdx = i;
    }
  }

  return Math.pow(10, n - 1) * maxV + voltage(mapping.slice(maxIdx + 1), n - 1);
}
