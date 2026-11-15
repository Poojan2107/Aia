// Print each catalog model's extent per axis (metres) to decide its front orientation.
import fs from "node:fs";
import { NodeIO } from "@gltf-transform/core";
import { KHRMeshQuantization, EXTMeshoptCompression } from "@gltf-transform/extensions";
import { MeshoptDecoder } from "meshoptimizer";
import { getBounds } from "@gltf-transform/core";
await MeshoptDecoder.ready;
const io = new NodeIO().registerExtensions([KHRMeshQuantization, EXTMeshoptCompression]).registerDependencies({ "meshopt.decoder": MeshoptDecoder });
for (const f of fs.readdirSync("public/models/catalog").filter((f) => f.endsWith(".glb"))) {
  const doc = await io.read(`public/models/catalog/${f}`);
  const { min, max } = getBounds(doc.getRoot().getDefaultScene() || doc.getRoot().listScenes()[0]);
  console.log(f.padEnd(48), ["x", "y", "z"].map((a, i) => `${a}=${(max[i] - min[i]).toFixed(3)}`).join("  "));
}
