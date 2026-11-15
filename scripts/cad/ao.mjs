// Baked ambient occlusion per vertex, so recesses, slots and inner corners darken like a real
// casting in a studio instead of looking evenly lit CAD. Offline, no dependencies: the whole
// product's surface is rasterised into a voxel grid, then from each vertex a fixed set of
// cosine-weighted rays is marched through the grid; nearby hits occlude more than far ones.
// Returns one value 0..1 per vertex (1 = open) for every group, in the order given.

const RAYS = 48;
// Fixed, well-spread directions around +Z (Fibonacci spiral, cosine-weighted).
const dirs = [];
for (let i = 0; i < RAYS; i++) {
  const u = (i + 0.5) / RAYS;
  const r = Math.sqrt(u);
  const a = i * 2.399963229728653; // golden angle
  dirs.push([r * Math.cos(a), r * Math.sin(a), Math.sqrt(1 - u)]);
}

export function bakeAO(groups, { cells = 192, reach = 0.22 } = {}) {
  // Bounds of every group together (they occlude each other).
  const lo = [Infinity, Infinity, Infinity];
  const hi = [-Infinity, -Infinity, -Infinity];
  for (const g of groups) for (let i = 0; i < g.pos.length; i += 3) for (let k = 0; k < 3; k++) {
    lo[k] = Math.min(lo[k], g.pos[i + k]);
    hi[k] = Math.max(hi[k], g.pos[i + k]);
  }
  const span = Math.max(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]);
  const cell = span / cells;
  const dim = [0, 1, 2].map((k) => Math.max(1, Math.ceil((hi[k] - lo[k]) / cell) + 3));
  const grid = new Uint8Array(dim[0] * dim[1] * dim[2]);
  const at = (x, y, z) => {
    const i = Math.floor((x - lo[0]) / cell) + 1, j = Math.floor((y - lo[1]) / cell) + 1, k = Math.floor((z - lo[2]) / cell) + 1;
    if (i < 0 || j < 0 || k < 0 || i >= dim[0] || j >= dim[1] || k >= dim[2]) return -1;
    return i + dim[0] * (j + dim[1] * k);
  };

  // Rasterise triangles: sample each one densely enough that no voxel it crosses is skipped.
  for (const g of groups) {
    const p = g.pos;
    for (let t = 0; t < g.idx.length; t += 3) {
      const a = g.idx[t] * 3, b = g.idx[t + 1] * 3, c = g.idx[t + 2] * 3;
      const e1 = Math.hypot(p[b] - p[a], p[b + 1] - p[a + 1], p[b + 2] - p[a + 2]);
      const e2 = Math.hypot(p[c] - p[a], p[c + 1] - p[a + 1], p[c + 2] - p[a + 2]);
      const n = Math.min(400, Math.ceil((Math.max(e1, e2) / cell) * 2) + 1);
      for (let i = 0; i <= n; i++) for (let j = 0; j <= n - i; j++) {
        const u = i / n, v = j / n, w = 1 - u - v;
        const id = at(p[a] * w + p[b] * u + p[c] * v, p[a + 1] * w + p[b + 1] * u + p[c + 1] * v, p[a + 2] * w + p[b + 2] * u + p[c + 2] * v);
        if (id >= 0) grid[id] = 1;
      }
    }
  }

  const maxDist = span * reach;
  const step = cell * 0.6;
  const start = cell * 1.75; // leave the vertex's own voxel shell
  return groups.map((g) => {
    const out = new Float32Array(g.pos.length / 3);
    for (let v = 0, i = 0; i < g.pos.length; i += 3, v++) {
      let nx = g.nrm[i] ?? 0, ny = g.nrm[i + 1] ?? 0, nz = g.nrm[i + 2] ?? 1;
      const nl = Math.hypot(nx, ny, nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      // Tangent frame around the normal.
      const ax = Math.abs(nx) < 0.9 ? [1, 0, 0] : [0, 1, 0];
      let tx = ny * ax[2] - nz * ax[1], ty = nz * ax[0] - nx * ax[2], tz = nx * ax[1] - ny * ax[0];
      const tl = Math.hypot(tx, ty, tz); tx /= tl; ty /= tl; tz /= tl;
      const bx = ny * tz - nz * ty, by = nz * tx - nx * tz, bz = nx * ty - ny * tx;
      const ox = g.pos[i] + nx * start, oy = g.pos[i + 1] + ny * start, oz = g.pos[i + 2] + nz * start;
      let occ = 0;
      for (const [dx, dy, dz] of dirs) {
        const rx = tx * dx + bx * dy + nx * dz, ry = ty * dx + by * dy + ny * dz, rz = tz * dx + bz * dy + nz * dz;
        for (let d = 0; d < maxDist; d += step) {
          const id = at(ox + rx * d, oy + ry * d, oz + rz * d);
          if (id < 0) break;
          if (grid[id]) { occ += 1 - d / maxDist; break; }
        }
      }
      out[v] = 1 - occ / RAYS;
    }
    return out;
  });
}
