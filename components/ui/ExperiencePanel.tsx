import { BookOpen } from "lucide-react";
import type { PortfolioItem } from "@/data/types";
import { ItemContent } from "./ProjectPanel";

export default function ExperiencePanel({ item }: { item: PortfolioItem }) {
  return <><div className="exhibit-plate"><BookOpen size={35} strokeWidth={1} /><span>FROM THE CAREER ARCHIVE</span><strong>{item.label}</strong></div><ItemContent item={item} /></>;
}