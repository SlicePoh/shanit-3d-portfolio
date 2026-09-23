import type { PortfolioItem } from "./types";

export const experience: PortfolioItem[] = [
  {
    id: "siemens-sde", title: "Siemens · SDE", category: "Experience",
    subtitle: "The engineering chapter.",
    description: "An exhibit reserved for the Siemens software engineering role. Add the actual team, dates, technical responsibilities, and measurable outcomes from your résumé.",
    highlights: ["Role and employment dates to be added", "Key responsibilities and contributions to be added", "Technical impact and project outcomes to be added"],
    label: "CHAPTER II", prototype: true,
  },
  {
    id: "internship", title: "The First Chapter", category: "Experience",
    subtitle: "Internship & early explorations.",
    description: "Every story starts somewhere. This exhibit is a placeholder for the internship experience: the company, team, what was built, and what was learned.",
    label: "CHAPTER I", prototype: true,
  },
  {
    id: "engineering-work", title: "Behind the Build", category: "Experience",
    subtitle: "The work between the milestones.",
    description: "A space for an engineering case study: a difficult technical problem, the decisions behind its solution, and the impact of the work. Details will be supplied from the actual résumé.",
    label: "FIELD NOTES", prototype: true,
  },
];