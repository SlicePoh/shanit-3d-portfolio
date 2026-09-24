import resume from "./resume.json";
import type { PortfolioItem } from "./types";

export const achievements = resume.achievements as PortfolioItem[];

export const jerseys = [
  { name: "RONALDINHO", number: "10" },
  { name: "MESSI", number: "10" },
  { name: "PEDRI", number: "8" },
  { name: "YAMAL", number: "19" },
];