import { useMemo } from "react";
import { Block, BlockInstances, Slab, type InstanceBlock } from "./primitives";
import type { Store as StoreData } from "@/data/types";

export interface StoreRendererProps {
  readonly store: StoreData;
  readonly selected: boolean;
  readonly onItem: (itemId: string) => void;
}

/** Model boundary: replace this shell or a storefront renderer without changing navigation. */
export default function Store({ store, wall, trim, children }: { store: StoreData; wall: string; trim: string; children: React.ReactNode }) {
  const [w, h, d] = store.scale;
  const bricks = useMemo<InstanceBlock[]>(() => Array.from({ length: 24 }, (_, i) => ({
    position: [w / 2 + 0.006, 0.2 + Math.floor(i / 6) * 0.46, -d / 2 + 0.27 + (i % 6) * (d - 0.45) / 6],
    scale: [0.024, 0.015, (d - 0.5) / 6 - 0.06], color: i % 3 ? trim : "#6d655d",
  })), [w, d, trim]);
  return <group>
    <Slab size={[w + 0.28, 0.18, d + 0.27]} color={trim} position={[0, 0, 0]} />
    <Block size={[w, h, 0.2]} color={wall} position={[0, h / 2, -d / 2]} />
    <Block size={[0.2, h, d]} color={wall} position={[-w / 2, h / 2, 0]} />
    <Block size={[0.2, h, d]} color={wall} position={[w / 2, h / 2, 0]} />
    <Block size={[w, 0.32, d]} color={wall} position={[0, h - 0.13, 0]} />
    <Block size={[w, 0.34, 0.2]} color={wall} position={[0, 0.19, d / 2]} />
    <Slab size={[w + 0.24, 0.12, d + 0.23]} color={trim} position={[0, h, 0]} />
    <Block size={[w + 0.31, 0.045, d + 0.3]} color="#1c2428" position={[0, h - 0.1, 0]} />
    <BlockInstances blocks={bricks} />
    {children}
  </group>;
}