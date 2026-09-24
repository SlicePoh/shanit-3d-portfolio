import resume from "./resume.json";
import type { PortfolioItem } from "./types";

export const projects = resume.projects as PortfolioItem[];
export const experiments: PortfolioItem[] = [];