import fs from "fs";

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data.trim().split("\n");

  let start = 50;

  let count = 0;

  for (let line of lines) {
    const n = Number(line.slice(1));

    start += line[0] === "L" ? -n : n;

    if (start % 100 === 0) count += 1;
  }

  console.log(count);
});
