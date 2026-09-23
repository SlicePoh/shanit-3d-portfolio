import type { Store as StoreData } from "@/data/types";
import { Block } from "./primitives";

export default function StoreInteraction({ store, selected, hovered, onHover, onVisit, children }: {
  store: StoreData; selected: boolean; hovered: boolean;
  onHover: (hovered: boolean) => void; onVisit: () => void; children: React.ReactNode;
}) {
  const [w, , d] = store.scale;
  return <group position={store.position} onPointerOver={(event) => { event.stopPropagation(); onHover(true); }} onPointerOut={() => onHover(false)} onClick={(event) => { event.stopPropagation(); onVisit(); }}>
    {children}
    {(selected || hovered) && <Block size={[w + 0.25, 0.035, 0.035]} position={[0, 0.11, d / 2 + 0.18]} color={store.color} glow={1.8} castShadow={false} />}
  </group>;
}