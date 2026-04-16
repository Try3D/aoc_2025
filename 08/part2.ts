import fs from "fs";

type Coordinate = {
  x: number;
  y: number;
  z: number;
};

type Edge = {
  dist: number;
  u: number;
  v: number;
};

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const points: Coordinate[] = data
    .trim()
    .split("\n")
    .map((line) => line.split(",").map(Number))
    .map(([x, y, z]) => ({ x, y, z }));

  const n = points.length;
  const edges: Edge[] = [];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push({ dist: distance(points[i], points[j]), u: i, v: j });
    }
  }

  edges.sort((a, b) => a.dist - b.dist);

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

  let edgesUsed = 0;
  let lastEdge: Edge | null = null;

  for (const edge of edges) {
    if (union(edge.u, edge.v)) {
      edgesUsed++;
      lastEdge = edge;

      if (edgesUsed === n - 1) {
        const a = points[lastEdge.u];
        const b = points[lastEdge.v];

        console.log(a.x * b.x);
        return;
      }
    }
  }
});

function distance(a: Coordinate, b: Coordinate): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return dx * dx + dy * dy + dz * dz;
}
