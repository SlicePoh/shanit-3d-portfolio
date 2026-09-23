import { achievements } from "./achievements";
import { experience } from "./experience";
import { experiments, projects } from "./projects";
import { skills } from "./skills";
import type { Store } from "./types";

export const stores: Store[] = [
  {
    id: "ramen", name: "Shinobi Ramen", sign: "SHINOBI RAMEN", category: "Projects",
    number: "01", floor: "GROUND FLOOR", color: "#eaa16b",
    description: "Ideas simmer here. A few things I’ve cooked up, served with a side of curiosity.",
    invitation: "Take a seat. Pick something from the menu.",
    position: [0, 0.48, 0.35], scale: [4.8, 2.25, 3.4], items: projects,
  },
  {
    id: "football", name: "Club 1899", sign: "CLUB 1899", category: "Achievements",
    number: "02", floor: "FIRST FLOOR", color: "#d2818f",
    description: "For the love of the game. Small wins, big moments, and a little blaugrana.",
    invitation: "Have a look inside the trophy cabinet.",
    position: [0.7, 2.78, 0.05], scale: [4.25, 2.05, 3.15], items: achievements,
  },
  {
    id: "museum", name: "The Westeros Archive", sign: "WESTEROS ARCHIVE", category: "Experience",
    number: "03", floor: "SECOND FLOOR", color: "#c9b488",
    description: "Every chapter leaves a mark. A small museum of the places I’ve been and the work I’ve done.",
    invitation: "Choose an exhibit. Follow the story.",
    position: [-1.05, 4.88, -0.15], scale: [3.9, 2.2, 3.25], items: experience,
  },
  {
    id: "music", name: "B-Side Records", sign: "B-SIDE RECORDS", category: "Skills",
    number: "04", floor: "THIRD FLOOR", color: "#8bb8ac",
    description: "A carefully collected stack. The tools, languages, and technologies in my rotation.",
    invitation: "Dig through the crates. Find your frequency.",
    position: [0.55, 7.13, -0.3], scale: [3.85, 2.1, 2.95], items: skills,
  },
  {
    id: "manga", name: "Midnight Manga", sign: "MIDNIGHT MANGA", category: "Experiments",
    number: "05", floor: "THE ATTIC", color: "#b3a1d2",
    description: "One more chapter before sleep. A secret shelf of experiments and wonderfully unfinished ideas.",
    invitation: "Something a little different on every shelf.",
    position: [-0.35, 9.28, -0.5], scale: [3.3, 2.0, 2.75], items: experiments,
  },
];

export const storeById = Object.fromEntries(stores.map((store) => [store.id, store])) as Record<Store["id"], Store>;

export const profile = {
  name: "Shanit Paul",
  title: "Developer. Collector of curiosities.",
  about: "I like building things that bring different worlds together. This little neighborhood is a home for my code, my curiosity, and the things I keep coming back to: football, music, manga, and a good story.",
  education: "This chapter is waiting for the actual résumé. Degree, institution, graduation year, and relevant coursework can be added here. No credentials have been assumed.",
};