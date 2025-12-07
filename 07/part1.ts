import fs from "fs";

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data.trimEnd().split("\n");

  const start = (lines[0].length - 1) / 2;

  let queue = [start];

  let count = 0;
  for (let i = 1; i < lines.length; i++) {
    const newQueue = new Set<number>();
    for (let item of queue) {
      if (lines[i][item] === ".") {
        newQueue.add(item);
      } else if (lines[i][item] === "^") {
        count += 1;
        if (item > 0) {
          newQueue.add(item - 1);
        }
        if (item < lines[0].length - 1) {
          newQueue.add(item + 1);
        }
      }
    }

    queue = [...newQueue];
  }

  console.log(count);
});
