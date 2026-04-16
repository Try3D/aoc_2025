import fs from "fs";
import Heap from "../utils/heap";

type Coordinate = {
  x: number;
  y: number;
  z: number;
};

type PairDist = {
  dist: number;
  a: Coordinate;
  b: Coordinate;
};

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const points = data
    .trim()
    .split("\n")
    .map((line) => line.split(",").map(Number))
    .map(([x, y, z]) => ({ x, y, z }));

  const heap = new Heap<PairDist>([], (a, b) => a.dist > b.dist);

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = distance(points[i], points[j]);

      const item: PairDist = {
        dist,
        a: points[i],
        b: points[j],
      };

      if (heap.heap.length < 1000) {
        heap.add(item);
      } else if (dist < heap.heap[0].dist) {
        heap.pop();
        heap.add(item);
      }
    }
  }

  const index = new Map<string, number>();

  points.forEach((p, i) => {
    index.set(`${p.x},${p.y},${p.z}`, i);
  });

  const n = points.length;
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);

  function find(x: number): number {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(a: number, b: number): boolean {
    const ra = find(a);
    const rb = find(b);

    if (ra === rb) return false;

    if (rank[ra] < rank[rb]) {
      parent[ra] = rb;
    } else if (rank[ra] > rank[rb]) {
      parent[rb] = ra;
    } else {
      parent[rb] = ra;
      rank[ra]++;
    }

    return true;
  }

  for (const item of heap.heap) {
    const u = index.get(`${item.a.x},${item.a.y},${item.a.z}`)!;
    const v = index.get(`${item.b.x},${item.b.y},${item.b.z}`)!;
    union(u, v);
  }

  const clusters = new Map<number, Coordinate[]>();

  for (let i = 0; i < n; i++) {
    const root = find(i);
    if (!clusters.has(root)) clusters.set(root, []);
    clusters.get(root)!.push(points[i]);
  }

  const clustes = [...clusters.values()]
    .map((c) => c.length)
    .sort((a, b) => b - a);

  console.log(clustes[0] * clustes[1] * clustes[2]);
});

function distance(a: Coordinate, b: Coordinate): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return dx * dx + dy * dy + dz * dz;
}
