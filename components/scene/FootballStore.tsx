import { jerseys } from "@/data/achievements";
import Store, { type StoreRendererProps } from "./Store";
import Windows from "./Windows";
import NeonSign from "./NeonSign";
import { Block, Cylinder, Sign } from "./primitives";

function Trophy({ onClick }: { onClick: () => void }) {
  return <group position={[1.52, 0.72, 1.55]} onClick={(event) => { event.stopPropagation(); onClick(); }}>
    <Block size={[0.38, 0.1, 0.28]} color="#54453b" />
    <Cylinder radius={0.045} height={0.2} color="#dcb779" position={[0, 0.12, 0]} />
    <mesh position={[0, 0.28, 0]}><cylinderGeometry args={[0.16, 0.075, 0.22, 8]} /><meshStandardMaterial color="#e7bd69" metalness={0.6} roughness={0.3} /></mesh>
    <mesh position={[0, 0.25, 0]}><torusGeometry args={[0.19, 0.025, 5, 12]} /><meshStandardMaterial color="#cda760" metalness={0.5} roughness={0.4} /></mesh>
  </group>;
}

export default function FootballStore({ store, selected, onItem }: StoreRendererProps) {
  const [w, h, d] = store.scale;
  return <Store store={store} wall="#394650" trim="#303e48">
    <Windows width={w} height={h} depth={d} color="#c5a281" divisions={2} />
    <NeonSign text={store.sign} subtext="FOOTBALL & THE FINER MOMENTS" position={[0, 1.8, 1.72]} width={3.15} height={0.37} color="#dfbca5" background="#57323f" />
    <Block size={[w, 0.14, 0.35]} color="#8d4653" position={[0, 1.52, 1.7]} />
    <Block size={[w, 0.11, 0.37]} color="#405a72" position={[0, 1.4, 1.7]} />
    {jerseys.map((jersey, i) => <group key={jersey.name} position={[-1.36 + i * 0.76, 1.03, 1.48]}>
      <Block size={[0.38, 0.48, 0.045]} color="#344d74" />
      <Block size={[0.12, 0.48, 0.05]} color="#9b4a5c" />
      <Block size={[0.17, 0.19, 0.045]} position={[-0.24, 0.13, 0]} rotation={[0, 0, -0.45]} color="#9b4a5c" />
      <Block size={[0.17, 0.19, 0.045]} position={[0.24, 0.13, 0]} rotation={[0, 0, 0.45]} color="#344d74" />
      <Sign text={jersey.number} width={0.2} height={0.25} position={[0, -0.03, 0.031]} color="#ead0a2" background="#523d61" />
      {selected && <Sign text={jersey.name} width={0.55} height={0.12} position={[0, -0.42, 0.035]} color="#f6d8a4" background="#3d3d3b" />}
    </group>)}
    <Trophy onClick={() => onItem(store.items[0].id)} />
    <Block size={[w + 0.5, 0.1, 0.75]} color="#404b4b" position={[0, 0.05, 1.9]} />
    <Block size={[w + 0.5, 0.045, 0.05]} color="#82918a" position={[0, 0.54, 2.25]} />
    {[-2.2, -1.1, 0, 1.1, 2.2].map((x) => <Block key={x} size={[0.035, 0.48, 0.035]} color="#727e78" position={[x, 0.28, 2.25]} />)}
  </Store>;
}