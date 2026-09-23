import type { PortfolioItem } from "@/data/types";
import { ItemContent } from "./ProjectPanel";

export default function SkillsPanel({ item }: { item: PortfolioItem }) {
  return <><div className="record-art" aria-hidden="true"><div className="vinyl"><div className="vinyl-center"><span>{item.title}</span><small>B-SIDE</small></div></div><div className="record-sleeve"><span>B-SIDE<br />RECORDS</span><strong>{item.title}</strong><small>{item.subtitle} / STEREO</small></div></div><ItemContent item={item} /><p className="record-note">Part of the collection. No arbitrary percentages, just tools to make things with.</p></>;
}