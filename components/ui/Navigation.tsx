import { useEffect, useRef } from "react";
import { ArrowUpRight, GraduationCap, Map, MoveUpRight, UserRound, X } from "lucide-react";
import { stores } from "@/data/stores";
import type { StoreId } from "@/data/types";
import type { InformationPage } from "@/lib/navigation";
import { storeIcons } from "./icons";

export default function Navigation({ open, selected, onVisit, onInformation, onClose }: {
  open: boolean; selected: StoreId | null; onVisit: (id: StoreId) => void; onInformation: (page: InformationPage) => void; onClose: () => void;
}) {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (open) close.current?.focus(); }, [open]);
  if (!open) return null;
  return <section className="directory" role="dialog" aria-labelledby="directory-title" id="neighborhood-directory">
    <div className="directory-heading"><span className="eyebrow"><Map size={13} /> THE NEIGHBORHOOD</span><button ref={close} className="icon-button" onClick={onClose} aria-label="Close directory"><X size={17} /></button></div>
    <h2 id="directory-title">Pick a little world.</h2>
    <p className="directory-subtitle">No wrong turns here.</p>
    <div className="directory-stores">
      {stores.map((store) => {
        const Icon = storeIcons[store.id];
        return <button key={store.id} className={`directory-link ${selected === store.id ? "current" : ""}`} onClick={() => onVisit(store.id)} aria-label={`${store.category} — ${store.name}`} style={{ "--store-color": store.color } as React.CSSProperties}>
          <span className="directory-store-icon"><Icon size={20} strokeWidth={1.4} /></span>
          <span className="directory-store-copy"><strong>{store.category}</strong><span>{store.name}</span></span>
          <span className="directory-floor">{store.number}</span><MoveUpRight size={15} />
        </button>;
      })}
    </div>
    <div className="directory-other">
      <button onClick={() => onInformation("education")}><GraduationCap size={16} /> Education <ArrowUpRight size={14} /></button>
      <button onClick={() => onInformation("about")}><UserRound size={15} /> About me <ArrowUpRight size={14} /></button>
    </div>
    <p className="directory-note">Same stories. A more direct route.</p>
  </section>;
}