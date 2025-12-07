import fs from "fs";

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data.trimEnd().split("\n");
  const start = (lines[0].length - 1) / 2;

  console.log(recurse(start, 1, new Map()));

  function recurse(
    cur: number,
    idx: number,
    cache: Map<string, number>,
  ): number {
    if (cur < 0 || cur >= lines[0].length) {
      return 0;
    } else if (idx === lines.length - 1) {
      return 1;
    }

    const key = `${cur}:${idx}`;

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    if (lines[idx][cur] === ".") {
      cache.set(key, recurse(cur, idx + 1, cache));
      return cache.get(key)!;
    } else {
      cache.set(
        key,
        recurse(cur - 1, idx + 1, cache) + recurse(cur + 1, idx + 1, cache),
      );
      return cache.get(key)!;
    }
  }
});
