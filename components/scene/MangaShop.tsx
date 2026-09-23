import { useMemo } from "react";
import Store, { type StoreRendererProps } from "./Store";
import NeonSign from "./NeonSign";
import Windows from "./Windows";
import { Block, BlockInstances, Sign, type InstanceBlock } from "./primitives";

export default function MangaShop({ store, selected, onItem }: StoreRendererProps) {
  const [w, h, d] = store.scale;
  const books = useMemo<InstanceBlock[]>(() => Array.from({ length: 24 }, (_, i) => ({
    position: [-1.17 + (i % 12) * 0.21, 0.76 + Math.floor(i / 12) * 0.49, 1.24],
    scale: [0.14, 0.28 + (i % 3) * 0.035, 0.17],
    color: ["#b78880", "#bdb4a2", "#727993", "#a0a18a", "#b6a077"][i % 5],
  })), []);
  return <Store store={store} wall="#55516b" trim="#393a50">
    <Windows width={w} height={h} depth={d} color="#b29b8a" divisions={2} />
    <NeonSign text={store.sign} position={[0, 1.76, 1.52]} width={2.87} height={0.3} color="#dcc3e6" background="#493b60" />
    <BlockInstances blocks={books} />
    {[0.52, 1.01, 1.48].map((y) => <Block key={y} size={[2.7, 0.06, 0.28]} color="#504154" position={[0, y, 1.2]} />)}
    <group position={[-1.91, 1.25, 1.45]}>
      <NeonSign text="漫画" subtext="MANGA" position={[0, 0, 0]} width={0.53} height={1.03} color="#c8ace9" background="#4b3b63" neon />
    </group>
    {selected && store.items.map((item, i) => <group key={item.id} position={[-0.7 + i * 1.4, 0.23, 1.5]} onClick={(event) => { event.stopPropagation(); onItem(item.id); }}>
      <Sign text={item.title.toUpperCase()} width={1.2} height={0.2} color="#e2c8ed" background="#44354b" />
    </group>)}
    <group position={[0, 2.08, 0]}>
      <Block size={[3.5, 0.15, 3.05]} color="#555566" />
      <Block size={[3.5, 0.17, 0.12]} color="#686374" position={[0, 0.13, -1.47]} />
      <Block size={[0.12, 0.17, 3.05]} color="#686374" position={[1.7, 0.13, 0]} />
    </group>
  </Store>;
}