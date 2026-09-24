import { readFile, writeFile, mkdir, copyFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { marked } from "marked";

const root = fileURLToPath(new URL("../", import.meta.url));
const categories = { projects: "Projects", skills: "Skills", experience: "Experience", achievements: "Achievements" };
const plain = (text) => text.replace(/\*\*|`/g, "").replace(/\s+/g, " ").trim();
const safeLink = (value) => {
  if (!value || value.includes("[ADD ")) return undefined;
  // Accept either a bare URL or a normal Markdown link. Never publish unsafe schemes.
  const candidate = value.match(/^\[[^\]]*\]\(([^)]+)\)$/)?.[1] ?? value;
  const url = new URL(candidate);
  if (!["https:", "http:"].includes(url.protocol)) throw new Error("Only HTTP(S) portfolio links are allowed");
  return url.href;
};

function bullets(list) {
  return list.items.map((item) => {
    const text = item.tokens.filter((token) => token.type !== "list").map((token) => token.text ?? "").join(" ");
    const nested = item.tokens.filter((token) => token.type === "list").flatMap(bullets);
    return plain(text + (nested.length ? " " + nested.join(", ") : ""));
  });
}

const data = {};
for (const [name, category] of Object.entries(categories)) {
  const source = await readFile(resolve(root, "content", `${name}.md`), "utf8");
  const sections = source.split(/^## /m).slice(1);
  data[name] = sections.map((section) => {
    const [title, ...lines] = section.split("\n");
    const body = lines.join("\n");
    const metadata = Object.fromEntries([...body.matchAll(/^\*\*([^*]+):\*\*\s*(.+)$/gm)].map((match) => [match[1], match[2].trim()]));
    if (!metadata.Id) throw new Error(`Missing Id in ${name}: ${title}`);
    const tokens = marked.lexer(body.replace(/^\*\*[^*]+:\*\*.*$/gm, ""));
    const highlights = tokens.filter((token) => token.type === "list").flatMap(bullets);
    const description = tokens.filter((token) => token.type === "paragraph").map((token) => plain(token.text)).join("\n\n");
    return {
      id: metadata.Id, title: title.trim(), category,
      subtitle: metadata.Subtitle ?? [metadata.Company ?? metadata.Type ?? metadata.Provider, metadata.Platform, metadata.Date].filter(Boolean).join(" · "),
      description: description || (category === "Skills" ? highlights.join(" · ") : metadata.Company ?? metadata.Provider ?? ""),
      label: metadata.Label, date: metadata.Date, company: metadata.Company, kind: metadata.Kind,
      technologies: category === "Skills" ? highlights : metadata.Technologies?.split(",").map((skill) => skill.trim()),
      highlights: category === "Skills" ? undefined : highlights.length ? highlights : undefined,
      github: safeLink(metadata.Repository), link: safeLink(metadata["Live Link"] ?? metadata.Link),
    };
  });
  if (new Set(data[name].map((item) => item.id)).size !== data[name].length) throw new Error(`Duplicate IDs in ${name}`);
}

// Optional, user-supplied artwork. Missing assets simply leave the procedural decoration in place.
const assets = {
  barcelona: ["FC_Barcelona logo.png", "barcelona.png"],
  westeros: ["map-westeros old.png", "westeros.png"],
  queen: ["Queen.png", "queen.png"],
  seedheMaut: ["Seehde Maut logo.png", "seedhe-maut.png"],
};
data.artwork = {};
await mkdir(resolve(root, "public", "artwork"), { recursive: true });
for (const [id, [source, target]] of Object.entries(assets)) {
  const path = resolve(root, "reference", source);
  try { await access(path); } catch { continue; }
  await copyFile(path, resolve(root, "public", "artwork", target));
  data.artwork[id] = `/artwork/${target}`;
}
await writeFile(resolve(root, "data", "resume.json"), JSON.stringify(data, null, 2) + "\n");
console.log(`Prepared ${Object.keys(categories).length} Markdown collections and ${Object.keys(data.artwork).length} supplied artworks.`);