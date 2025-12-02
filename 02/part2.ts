import fs from "fs";

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data.trim().split("\n");

  const nums = lines
    .join("")
    .split(",")
    .map((item) => item.trim().split("-").map(Number));

  let count = 0;

  for (const [l, h] of nums) {
    for (let i = l; i <= h; i++) {
      count += isInvalid(i);
    }
  }

  console.log(count);
});

function isInvalid(i: number): number {
  const s = i.toString();

  for (let chunkSize = 1; chunkSize <= s.length / 2; chunkSize++) {
    if (s.length % chunkSize === 0) {
      const chunk = s.slice(0, chunkSize);
      const repeats = s.length / chunkSize;

      if (chunk.repeat(repeats) === s) {
        return i;
      }
    }
  }

  return 0;
}
