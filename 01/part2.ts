import fs from "fs";

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data.trim().split("\n");

  let start = 50;
  let count = 0;

  for (let line of lines) {
    const n = Number(line.slice(1));
    count += Math.floor(n / 100);

    const angle = n % 100;

    if (line[0] === "L") {
      start -= angle;

      if (start + angle !== 0 && start % 100 <= 0) {
        count += 1;
      }
    } else {
      start += angle;

      if (start >= 100) {
        count += 1;
      }
    }
    start = start % 100;
    start = start >= 0 ? start : 100 + start;
  }

  console.log(count);
});
