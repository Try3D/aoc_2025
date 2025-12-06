import fs from "fs";

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data.trimEnd().split("\n");

  const freshIdx = lines.findIndex((line) => line === "");

  const freshRanges = lines
    .slice(0, freshIdx)
    .map((line) => line.split("-").map(Number));

  freshRanges.sort((a, b) => a[0] - b[0]);

  const array: number[][] = [];

  if (freshRanges.length > 0) {
    array.push(freshRanges[0]);

    for (let i = 1; i < freshRanges.length; i++) {
      const [currentStart, currentEnd] = freshRanges[i];
      const lastMerged = array[array.length - 1];

      if (currentStart <= lastMerged[1]) {
        lastMerged[1] = Math.max(lastMerged[1], currentEnd);
      } else {
        array.push([currentStart, currentEnd]);
      }
    }
  }

  let count = 0;
  for (let i = 0; i < array.length; i++) {
    count += array[i][1] - array[i][0] + 1;
  }

  console.log(count);
});
