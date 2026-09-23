import type { PortfolioItem } from "./types";

export const projects: PortfolioItem[] = [
  {
    id: "shinobi-tracker", title: "Shinobi Tracker", category: "Projects",
    subtitle: "Computer vision, with a little shinobi spirit.",
    description: "A real-time hand-sign recognition concept that turns webcam gestures into an interactive experience. Bringing together on-device machine learning, a responsive interface, and playful 3D feedback.",
    technologies: ["React", "TypeScript", "MediaPipe", "Machine Learning", "Three.js"],
    highlights: ["Recognize hand gestures directly in the browser", "Translate predictions into real-time visual feedback", "Explore the meeting point of anime and creative engineering"],
    label: "HOUSE SPECIAL", prototype: true,
  },
  {
    id: "memblock", title: "MemBlock", category: "Projects",
    subtitle: "Small blocks. Connected ideas.",
    description: "A placeholder for the MemBlock project. This entry is ready for the actual problem statement, architecture, screenshots, and outcomes.",
    technologies: ["Project details to be added"], label: "CHEF’S PICK", prototype: true,
  },
  {
    id: "vewrite", title: "Vewrite", category: "Projects",
    subtitle: "A space for the next good idea.",
    description: "A placeholder for the Vewrite project. Replace this sample description with the real story behind the project and its technical decisions.",
    technologies: ["Project details to be added"], label: "FRESHLY MADE", prototype: true,
  },
];

export const experiments: PortfolioItem[] = [
  {
    id: "after-hours", title: "After Hours", category: "Experiments",
    subtitle: "The little neighborhood you’re standing in.",
    description: "An experiment in spatial storytelling: a portfolio built as a procedural, interactive night-time diorama. Every shop is a different part of the story, and every model starts with simple geometry.",
    technologies: ["Next.js", "React Three Fiber", "Drei", "Three.js", "TypeScript"],
    highlights: ["Procedural architecture with replaceable store renderers", "Accessible HTML navigation alongside the 3D world", "Shared geometry, instanced details, and on-demand rendering"],
    label: "VOL. 01",
  },
  {
    id: "ml-sketchbook", title: "The ML Sketchbook", category: "Experiments",
    subtitle: "Unfinished ideas are welcome here.",
    description: "A reserved shelf for future AI/ML experiments, creative coding sketches, and personal prototypes. Actual experiments and results can be added here as they take shape.",
    technologies: ["AI / ML", "Creative coding"], label: "COMING SOON", prototype: true,
  },
];