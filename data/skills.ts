import type { PortfolioItem } from "./types";

const records = [
  ["TypeScript", "Languages", "Typed interfaces, safer refactors, and expressive application models.", "#76b8c8"],
  ["JavaScript", "Languages", "The language connecting browser interactions and server-side applications.", "#d5b665"],
  ["Python", "Languages", "A versatile toolkit for automation, data exploration, and machine learning.", "#819d7c"],
  ["Rust", "Languages", "Exploring memory safety, performance, and systems-level thinking.", "#bd795b"],
  ["Java", "Languages", "Object-oriented foundations and the ecosystem of enterprise applications.", "#b28769"],
  ["React", "Frontend", "Composable interfaces, stateful interactions, and component-driven design.", "#80b8c3"],
  ["Angular", "Frontend", "Structured, component-based interfaces and application architecture.", "#c97778"],
  ["Node.js", "Backend", "JavaScript beyond the browser: APIs, tools, and server-side workflows.", "#91a987"],
  ["AWS", "Cloud", "Cloud infrastructure and the building blocks of deployed applications.", "#d7a364"],
  ["PostgreSQL", "Data", "Relational modeling, expressive queries, and durable application data.", "#839ab7"],
  ["Three.js", "Creative web", "Geometry, lighting, and interactive worlds rendered in the browser.", "#ad8bbb"],
] as const;

export const skills: PortfolioItem[] = records.map(([title, group, description], index) => ({
  id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"), title, category: "Skills",
  subtitle: group, description, technologies: [group],
  label: `SIDE ${index < 5 ? "A" : "B"} · ${String(index + 1).padStart(2, "0")}`,
}));

export const recordColors = records.map((record) => record[3]);
export const musicInterests = ["Queen", "Seedhe Maut", "Fossils", "KR$NA", "Hemanta Mukherjee"];