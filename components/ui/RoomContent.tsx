import { useEffect, useRef } from "react";
import { ArrowUpRight, Award, BookOpen, Disc3, Trophy } from "lucide-react";
import { roomDisplays, rooms, type RoomDisplay } from "@/data/rooms";
import type { PortfolioItem, Store } from "@/data/types";
import { useCompactView } from "@/lib/useCompactView";

type DisplayItemProps = Readonly<{ style: RoomDisplay["style"]; item: PortfolioItem }>;

function ItemSymbol({ style, item, index }: DisplayItemProps & { readonly index: number }) {
  switch (style) {
    case "certificates": return <Award size={18} />;
    case "award": return item.kind === "award" ? <Trophy size={25} /> : <BookOpen size={25} />;
    case "skills": return <Disc3 size={18} />;
    default: return String(index + 1).padStart(2, "0");
  }
}

function ItemSummary({ style, item }: DisplayItemProps) {
  switch (style) {
    case "skills": return <span className="wall-skills">{item.technologies?.map((skill) => <span key={skill}>{skill}</span>)}</span>;
    case "exhibit": return <><span className="exhibit-company">{item.company}</span><span className="exhibit-date">{item.date}</span><span className="exhibit-read">Read all {item.highlights?.length} contributions <ArrowUpRight size={15} /></span></>;
    case "certificates": return <span>{item.subtitle}</span>;
    case "award": return <span>{item.kind === "writing" ? item.label : item.subtitle}</span>;
    default: return <span className="menu-date">{item.date} <ArrowUpRight size={18} /></span>;
  }
}

/** These are faces of physical displays, not screen-space cards. RoomSurfaces positions them. */
export default function RoomContent({ store, onItem, blocked }: Readonly<{ store: Store; onItem: (id: string) => void; blocked: boolean }>) {
  const compact = useCompactView();
  return <div className={`room-surfaces theme-${store.id}`} inert={blocked} aria-label={`${store.name} physical displays`}>
    {roomDisplays(store.id, compact).map((display) => {
      const items = display.itemIds ? store.items.filter((item) => display.itemIds!.includes(item.id)) : store.items;
      return <section key={display.id} id={`room-surface-${display.id}`} className={`room-surface surface-${display.style}`} style={{ width: display.width * 100, height: display.height * 100 }} aria-label={display.title}>
        <div className="surface-heading"><span>{display.style === "menu" ? store.sign : display.title}</span><span aria-hidden="true">{display.style === "menu" ? "お品書き" : "✦"}</span></div>
        {display.style === "menu" && <h2>{display.title}</h2>}
        <div className="surface-items">{items.map((item, index) => <button key={item.id} data-room-item={item.id} onClick={() => onItem(item.id)} aria-label={`Open ${item.title}`} className="surface-item">
          <span className="surface-item-label"><ItemSymbol style={display.style} item={item} index={index} /><span>{item.label}</span></span>
          <strong>{item.title}</strong>
          <ItemSummary style={display.style} item={item} />
        </button>)}</div>
        {display.style === "placeholder" && <><h2>A story still unwritten.</h2><p>{store.description}</p><p>{store.invitation}</p></>}
        {display.style === "menu" && <p className="surface-footnote">Select a dish. Discover what went into it.</p>}
      </section>;
    })}
  </div>;
}

export function RoomHeading({ store }: Readonly<{ store: Store }>) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => { ref.current?.focus({ preventScroll: true }); }, [store.id]);
  return <div className="room-caption"><span>{store.number} / {rooms[store.id].title}</span><h1 ref={ref} tabIndex={-1}>{store.name}</h1><p>{store.id === "manga" ? "A new chapter, coming later." : "Look around. Select a display to read its story."}</p></div>;
}