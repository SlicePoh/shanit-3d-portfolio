import { useState } from "react";
import { Line, useCursor } from "@react-three/drei";
import { stores } from "@/data/stores";
import type { StoreId } from "@/data/types";
import RamenShop from "./RamenShop";
import FootballStore from "./FootballStore";
import MusicStore from "./MusicStore";
import WesterosMuseum from "./WesterosMuseum";
import MangaShop from "./MangaShop";
import StoreInteraction from "./StoreInteraction";
import { Block, Cylinder, Plant, Sign } from "./primitives";
import Windows from "./Windows";
import type { StoreRendererProps } from "./Store";

const renderers: Record<StoreId, React.ComponentType<StoreRendererProps>> = {
  ramen: RamenShop, football: FootballStore, music: MusicStore, museum: WesterosMuseum, manga: MangaShop,
};

function Utilities() {
  return <group>
    <Cylinder radius={0.065} height={6.5} color="#837967" position={[2.99, 3.55, -0.85]} />
    <Cylinder radius={0.06} height={1.4} color="#837967" position={[2.35, 6.8, -0.85]} rotation={[0, 0, -Math.PI / 2]} />
    {[3.8, 8.05].map((y, i) => <group key={y} position={[i ? 2.61 : 2.98, y, -0.3]}>
      <Block size={[0.38, 0.52, 0.8]} color="#8a8b7d" />
      <mesh position={[0.201, 0, 0]} rotation={[0, Math.PI / 2, 0]}><circleGeometry args={[0.18, 12]} /><meshStandardMaterial color="#444d4a" /></mesh>
      <Block size={[0.41, 0.04, 0.73]} color="#667069" />
    </group>)}
    <group position={[-1.05, 11.62, -0.78]}>
      {[-0.35, 0.35].map((x) => <Block key={x} size={[0.07, 0.55, 0.07]} color="#6b6557" position={[x, 0, 0]} />)}
      <Cylinder radius={0.54} height={0.82} color="#826548" position={[0, 0.61, 0]} />
      {[0.24, 0.6, 1.0].map((y) => <Cylinder key={y} radius={0.555} height={0.05} color="#404c46" position={[0, y, 0]} />)}
      <mesh position={[0, 1.13, 0]} castShadow><coneGeometry args={[0.64, 0.28, 10]} /><meshStandardMaterial color="#566159" roughness={0.9} /></mesh>
    </group>
    <group position={[0.58, 11.8, 0.1]}>
      {[-0.53, 0.53].map((x) => <Block key={x} size={[0.055, 1, 0.06]} color="#68746b" position={[x, 0, 0]} />)}
      <Sign text="AFTER" subtext="H O U R S" width={1.7} height={0.88} position={[0, 0.25, 0.05]} color="#f0c08b" background="#36403b" glow={0.55} />
    </group>
    <Cylinder radius={0.018} height={1.5} color="#929687" position={[0.63, 12.03, -1.47]} />
    <Block size={[0.94, 0.022, 0.023]} color="#929687" position={[0.63, 12.5, -1.47]} />
    <Plant position={[1.0, 11.53, 0.45]} scale={0.75} />
    <Plant position={[-2.48, 7.19, 0.75]} scale={0.8} />
    <Line points={[[-3.75, 3.45, 1.8], [-2.8, 3.01, 1.65], [-1.9, 2.92, 1.65], [-0.6, 3.17, 1.65]]} color="#373c37" lineWidth={1} />
    <group position={[-2.45, 3.25, -0.15]}>
      <Block size={[0.07, 2.5, 0.07]} color="#676b62" position={[-0.2, 0, 0]} />
      <Block size={[0.07, 2.5, 0.07]} color="#676b62" position={[0.2, 0, 0]} />
      {Array.from({ length: 9 }, (_, i) => <Block key={i} size={[0.46, 0.045, 0.06]} color="#7c7c6f" position={[0, -1.1 + i * 0.28, 0]} />)}
    </group>
  </group>;
}

export default function Building({ selected, onVisit, onHover }: {
  selected: StoreId | null; onVisit: (id: StoreId) => void; onHover: (id: StoreId | null) => void;
}) {
  const [hovered, setHovered] = useState<StoreId | null>(null);
  useCursor(hovered !== null);
  return <group>
    {stores.map((store) => {
      const Renderer = renderers[store.id];
      return <StoreInteraction key={store.id} store={store} selected={selected === store.id} hovered={hovered === store.id} onHover={(over) => { setHovered(over ? store.id : null); onHover(over ? store.id : null); }} onVisit={() => onVisit(store.id)}>
        <Renderer store={store} selected={false} onItem={() => onVisit(store.id)} />
      </StoreInteraction>;
    })}
    {/* Inhabited, staggered upper floors support the preserved attic. */}
    {[{ y: 5.13, x: -0.45, color: "#755347", angle: -0.08 }, { y: 7.2, x: 0.1, color: "#4e6260", angle: 0.07 }].map(({ y, x, color, angle }) => <group key={y} position={[x, y, -0.5]} rotation={[0, angle, 0]}>
      <Block size={[3.8, 1.95, 3]} position={[0, 0.96, 0]} color={color} />
      <group position={[0, 0, 0.5]}><Windows width={3.8} height={1.95} depth={3} color="#e6b66c" divisions={3} /></group>
      <group rotation={[0, Math.PI / 2, 0]}><group position={[0, 0, 0.5]}><Windows width={3} height={1.95} depth={3.8} color="#cd9b61" divisions={2} /></group></group>
      <Block size={[4, 0.08, 0.5]} position={[0, 0.35, 1.75]} color="#3c4441" />
      {[-1.85, 0, 1.85].map((post) => <Block key={post} size={[0.035, 0.6, 0.035]} position={[post, 0.65, 1.98]} color="#737366" />)}
      <Block size={[3.75, 0.035, 0.035]} position={[0, 0.93, 1.98]} color="#737366" />
      <Block size={[4.05, 0.14, 3.3]} position={[0, 2.0, 0]} color="#494c45" />
    </group>)}
    <Utilities />
  </group>;
}