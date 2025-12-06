import fs from "fs";

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data.trimEnd().split("\n");

  const freshIdx = lines.findIndex((line) => line === "");

  const freshRanges = lines
    .slice(0, freshIdx)
    .map((line) => line.split("-").map(Number));

  const ingredients = lines.slice(freshIdx + 1).map(Number);

  let count = 0;

  for (let ingredient of ingredients) {
    for (let [start, end] of freshRanges) {
      if (ingredient >= start && ingredient <= end) {
        count += 1;
        break;
      }
    }
  }

  console.log(count);
});
