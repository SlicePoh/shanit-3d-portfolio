import type { Store } from "@/data/types";

export default function StoreLabel({ store, hovered, selected, onVisit }: { store: Store; hovered: boolean; selected: boolean; onVisit: () => void }) {
  return <button className={`store-label ${hovered || selected ? "is-highlighted" : ""}`} onClick={onVisit} aria-label={`Explore ${store.category} at ${store.name}`} style={{ "--store-color": store.color } as React.CSSProperties}>
    <span className="label-line" /><span className="label-dot" />
    <span className="label-copy"><span>{store.category}</span><span className="label-name">{store.name}</span></span>
    <span className="label-number">{store.number}</span>
  </button>;
}