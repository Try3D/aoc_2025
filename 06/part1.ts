import fs from "fs";

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const lines = data
    .trimEnd()
    .split("\n")
    .map((line) => line.trim().split(" ").filter(Boolean));

  const nums = lines.slice(0, -1).map((line) => line.map(Number));
  const operations = lines[lines.length - 1];

  let total = 0;
  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === "+") {
      for (let j = 0; j < nums.length; j++) {
        total += nums[j][i];
      }
    } else {
      let product = 1;
      for (let j = 0; j < nums.length; j++) {
        product *= nums[j][i];
      }
      total += product;
    }
  }
  console.log(total);
});
