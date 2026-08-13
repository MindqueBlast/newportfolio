import fs from "fs";
const p = "src/content/projects.ts";
let s = fs.readFileSync(p, "utf8");
const domains = {
  fenlens: { domain: "cv", relatedIds: ["smart-desk", "arduino-sorter"] },
  "smart-desk": { domain: "cv", relatedIds: ["fenlens", "drone-nav"] },
  neuroevolution: {
    domain: "simulation",
    relatedIds: ["city-crisis", "black-hole-ray-tracer"],
  },
  "black-hole-ray-tracer": {
    domain: "physics",
    relatedIds: ["neuroevolution", "city-crisis"],
  },
  terrawatch: { domain: "geospatial", relatedIds: ["city-crisis"] },
  "city-crisis": {
    domain: "simulation",
    relatedIds: ["neuroevolution", "terrawatch"],
  },
  "debate-elo": { domain: "fullstack", relatedIds: ["chat-app"] },
  "chat-app": { domain: "fullstack", relatedIds: ["debate-elo"] },
  webcraft: { domain: "games", relatedIds: ["processingjs-games"] },
  "unity-game": { domain: "games", relatedIds: ["processingjs-games"] },
  "processingjs-games": {
    domain: "games",
    relatedIds: ["webcraft", "unity-game"],
  },
  "vex-robot": { domain: "robotics", relatedIds: ["drone-nav", "arduino-sorter"] },
  "arduino-sorter": { domain: "robotics", relatedIds: ["fenlens", "vex-robot"] },
  "rc-airplane": { domain: "robotics", relatedIds: ["drone-nav"] },
  "drone-nav": { domain: "robotics", relatedIds: ["smart-desk", "vex-robot"] },
};
for (const [id, meta] of Object.entries(domains)) {
  const re = new RegExp(`(id: "${id}",[\\s\\S]*?tier: "[^"]+",)`);
  s = s.replace(re, (m) => {
    if (m.includes("domain:")) return m;
    return `${m}\n    domain: "${meta.domain}",\n    relatedIds: ${JSON.stringify(meta.relatedIds)},`;
  });
}
fs.writeFileSync(p, s);
console.log("patched");
