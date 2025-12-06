import fs from "fs";

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data.trimEnd().split("\n");

  const nums = lines.slice(0, -1);
  const operations = lines[lines.length - 1]
    .split(" ")
    .filter((item) => item !== "");

  let maxW = nums.reduce((a, b) => {
    return a > b.length ? a : b.length;
  }, 0);

  const flipped = [];

  for (let i = 0; i < maxW; i++) {
    let out = 0;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j][i] === " ") {
        continue;
      }

      out = 10 * out + Number(nums[j][i]);
    }

    flipped.push(out);
  }

  let total = 0;

  let i = 0;
  for (let operation of operations) {
    if (operation === "*" && i < flipped.length) {
      let product = 1;
      while (flipped[i] !== 0 && i < flipped.length) {
        product *= flipped[i];
        i += 1;
      }
      total += product;
    } else {
      while (flipped[i] !== 0 && i < flipped.length) {
        total += flipped[i];
        i += 1;
      }
    }
    i++;
  }

  console.log(total);
});
