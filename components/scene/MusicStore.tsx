import { recordColors } from "@/data/skills";
import Store, { type StoreRendererProps } from "./Store";
import Windows from "./Windows";
import NeonSign from "./NeonSign";
import { Block, Sign } from "./primitives";

export default function MusicStore({ store, selected, onItem }: StoreRendererProps) {
  const [w, h, d] = store.scale;
  const visibleRecords = selected ? store.items : store.items.slice(0, 4);
  return <Store store={store} wall="#435650" trim="#34423e">
    <Windows width={w} height={h} depth={d} color="#c49e66" divisions={2} />
    <NeonSign text={store.sign} position={[0, 1.83, 1.58]} width={3.27} height={0.33} color="#a3d3ba" background="#263f36" neon />
    {[0.55, 1.1].map((y) => <Block key={y} size={[2.7, 0.06, 0.25]} color="#694b33" position={[0, y, 1.25]} />)}
    {visibleRecords.map((item, i) => <group key={item.id} position={[-1.03 + (i % 6) * 0.4, i < 6 ? 0.86 : 1.4, 1.37]} onClick={(event) => { event.stopPropagation(); onItem(item.id); }}>
      <Block size={[0.32, 0.35, 0.05]} color={recordColors[i]} />
      <mesh position={[0, 0, 0.036]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.13, 0.13, 0.015, 18]} /><meshStandardMaterial color="#252c2c" roughness={0.7} /></mesh>
      <mesh position={[0, 0, 0.049]}><circleGeometry args={[0.038, 12]} /><meshStandardMaterial color={recordColors[i]} /></mesh>
      {selected && <Sign text={item.title} width={0.34} height={0.11} position={[0, -0.24, 0.04]} color="#f6dfae" background="#3d3026" />}
    </group>)}
    {[-1.55, 1.55].map((x) => <group key={x} position={[x, 0.75, 1.3]}>
      <Block size={[0.35, 0.73, 0.25]} color="#262e2d" />
      {[0.15, -0.15].map((y) => <mesh key={y} position={[0, y, 0.13]}><circleGeometry args={[0.11, 12]} /><meshStandardMaterial color="#77766a" /></mesh>)}
    </group>)}
    <group position={[2.1, 1.2, 0.45]} rotation={[0, Math.PI / 2, 0]}>
      <NeonSign text="33⅓" subtext="RPM" position={[0, 0, 0]} width={0.7} height={0.82} background="#365148" color="#cde3b1" />
    </group>
    <pointLight position={[0, 1, 1.7]} color="#ffce85" intensity={4} distance={3.5} decay={2} />
  </Store>;
}