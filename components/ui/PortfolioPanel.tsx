import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, Disc3, Sparkles, X } from "lucide-react";
import { musicInterests } from "@/data/skills";
import type { PortfolioItem, Store } from "@/data/types";
import ProjectPanel, { ItemContent } from "./ProjectPanel";
import ExperiencePanel from "./ExperiencePanel";
import SkillsPanel from "./SkillsPanel";
import { storeIcons } from "./icons";

export default function PortfolioPanel({ store, item, onItem, onCloseItem, onOverview }: {
  store: Store; item: PortfolioItem | undefined; onItem: (itemId: string) => void; onCloseItem: () => void; onOverview: () => void;
}) {
  const close = useRef<HTMLButtonElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    close.current?.focus({ preventScroll: true });
    return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); else document.querySelector<HTMLButtonElement>("[data-directory-toggle]")?.focus({ preventScroll: true }); };
  }, [store.id]);
  useEffect(() => { scroll.current?.scrollTo(0, 0); }, [item?.id]);
  const Icon = storeIcons[store.id];
  return <section className={`portfolio-panel theme-${store.id}`} role="dialog" aria-labelledby="panel-title" style={{ "--store-color": store.color } as React.CSSProperties}>
    <div className="panel-topline"><span className="eyebrow"><span className="status-dot" /> {store.floor}</span><button ref={close} className="icon-button" onClick={onOverview} aria-label="Close panel and return to building"><X size={18} /></button></div>
    <div className="panel-scroll" ref={scroll}>
      <button className="text-back" onClick={item ? onCloseItem : onOverview}><ArrowLeft size={14} /> {item ? `Back to ${store.name}` : "Back to building"}</button>
      <div className="panel-symbol"><Icon size={30} strokeWidth={1.2} /><span>{store.number} / {store.category.toUpperCase()}</span></div>
      <h2 id="panel-title">{item?.title ?? store.name}</h2>
      <p className="panel-description">{item?.subtitle ?? store.description}</p>
      {item ? <div key={item.id} className="item-detail">
        {(item.category === "Projects" || item.category === "Experiments") ? <ProjectPanel item={item} /> : item.category === "Experience" ? <ExperiencePanel item={item} /> : item.category === "Skills" ? <SkillsPanel item={item} /> : <ItemContent item={item} />}
      </div> : <>
        <div className={`shop-menu ${store.id === "ramen" ? "ramen-menu" : ""}`}>
          <div className="menu-heading"><span>{store.id === "ramen" ? "THE PROJECT MENU" : store.id === "music" ? "IN THE CRATES" : store.id === "museum" ? "THE COLLECTION" : store.id === "football" ? "THE TROPHY CABINET" : "ON THE SHELF"}</span><span>{store.id === "ramen" ? "お品書き" : <Sparkles size={13} />}</span></div>
          {store.items.map((entry, index) => <button key={entry.id} className="menu-item" onClick={() => onItem(entry.id)} aria-label={`Open ${entry.title}`}>
            <span className="menu-item-number">{store.id === "music" ? <Disc3 size={24} strokeWidth={1} /> : store.id === "museum" ? <BookOpen size={19} strokeWidth={1.2} /> : String(index + 1).padStart(2, "0")}</span>
            <span className="menu-item-copy"><small>{entry.label}</small><strong>{entry.title}</strong>{store.id === "music" && <span>{entry.subtitle}</span>}</span>
            <ArrowUpRight size={17} />
          </button>)}
          <p className="menu-footer">{store.invitation}</p>
        </div>
        {store.id === "music" && <p className="interests-note"><span>ON THE SHOP PLAYLIST</span>{musicInterests.join(" · ")}</p>}
        <p className="shop-note">You can also explore the objects in the shop.</p>
      </>}
    </div>
    <div className="panel-footer"><span>SHANIT’S LITTLE NEIGHBORHOOD</span><span>EST. 2026</span></div>
  </section>;
}