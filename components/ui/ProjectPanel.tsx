import { ArrowUpRight, Github } from "lucide-react";
import type { PortfolioItem } from "@/data/types";

export function ItemContent({ item }: { item: PortfolioItem }) {
  return <>
    <p className="item-description">{item.description}</p>
    {item.technologies && <div className="technology-list" aria-label="Technologies">{item.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>}
    {item.highlights && <div className="item-highlights"><h3>A closer look</h3><ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div>}
    {item.prototype && <p className="prototype-note"><span /> Prototype entry. Final details and links will be added from the actual résumé.</p>}
  </>;
}

export default function ProjectPanel({ item }: { item: PortfolioItem }) {
  return <>
    <div className="project-art" aria-hidden="true"><div className="project-orbit orbit-one" /><div className="project-orbit orbit-two" /><span className="project-monogram">{item.id === "shinobi-tracker" ? "忍" : item.title.slice(0, 2).toUpperCase()}</span><span className="art-caption">A LITTLE CURIOSITY, MADE REAL.</span></div>
    <ItemContent item={item} />
    <div className="project-links">
      {item.github ? <a href={item.github} target="_blank" rel="noopener noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={14} /></a> : <button disabled title="The repository URL has not been provided"><Github size={15} /> GitHub <span>soon</span></button>}
      {item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={14} /></a> : <button disabled title="The live demo URL has not been provided">Live demo <span>soon</span></button>}
    </div>
  </>;
}