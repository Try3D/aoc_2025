import fs from "fs";

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data.trim().split("\n");

  const nums = lines
    .join("")
    .split(",")
    .map((item) => item.split("-").map(Number));

  let count = 0;

  for (const [l, h] of nums) {
    for (let i = l; i <= h; i++) {
      count += isInvalid(i);
    }
  }

  console.log(count);
});

function isInvalid(i: number) {
  const s = i.toString();

  if (s.length % 2 === 0) {
    if (s.slice(0, s.length / 2) === s.slice(s.length / 2)) {
      return i;
    }
  }

  return 0;
}
