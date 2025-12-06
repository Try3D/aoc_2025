import fs from "fs";

type Coordinate = {
  x: number;
  y: number;
};

const directions: Coordinate[] = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 1 },
];

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data.trim().split("\n");

  let n = lines.length;
  let m = lines[0].length;

  let count = 0;

  let increment = 0;
  do {
    increment = 0;

    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[y].length; x++) {
        if (lines[y][x] !== "@") {
          continue;
        }

        let num = 0;

        for (let dir of directions) {
          let nx = x + dir.x;
          let ny = y + dir.y;

          if (ny >= 0 && ny < n && nx >= 0 && nx < m && lines[ny][nx] === "@") {
            num += 1;
          }
        }

        if (num < 4) {
          lines[y] = lines[y].slice(0, x) + "." + lines[y].slice(x + 1);
          increment += 1;
        }
      }
    }

    count += increment;
  } while (increment > 0);

  console.log(count);
});
