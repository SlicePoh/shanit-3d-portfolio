import Store, { type StoreRendererProps } from "./Store";
import Windows from "./Windows";
import NeonSign from "./NeonSign";
import { Block, Cylinder, Sign } from "./primitives";

function Lantern({ x }: { x: number }) {
  return <group position={[x, 1.25, 2.3]}>
    <Cylinder height={0.35} radius={0.017} position={[0, 0.43, 0]} color="#342c29" />
    <mesh castShadow><sphereGeometry args={[0.2, 10, 8]} /><meshStandardMaterial color="#eeb66e" emissive="#e99840" emissiveIntensity={0.8} roughness={0.8} /></mesh>
    <Cylinder height={0.05} radius={0.1} position={[0, 0.2, 0]} />
    <Cylinder height={0.05} radius={0.1} position={[0, -0.2, 0]} />
    <Sign text="麺" width={0.2} height={0.24} color="#743d29" background="#efb775" position={[0, 0, 0.195]} />
  </group>;
}

export default function RamenShop({ store, selected, onItem }: StoreRendererProps) {
  const [w, h, d] = store.scale;
  return <Store store={store} wall="#715447" trim="#493c34">
    <Windows width={w} height={h} depth={d} color="#dca366" divisions={4} />
    <NeonSign text={store.sign} subtext="NOODLES · IDEAS · GOOD COMPANY" position={[0, 1.92, 1.92]} width={3.7} height={0.49} color="#ffe0a7" background="#513b2e" />
    <group position={[0, 1.58, 2.0]} rotation={[0.19, 0, 0]}>
      <Block size={[5.0, 0.12, 0.9]} color="#a44f3e" />
      {[-2.16, -1.44, -0.72, 0, 0.72, 1.44, 2.16].map((x) => <Block key={x} size={[0.33, 0.13, 0.92]} color="#d58558" position={[x, 0.015, 0]} />)}
      <Block size={[5.0, 0.23, 0.075]} color="#ad5240" position={[0, -0.07, 0.45]} />
    </group>
    <Lantern x={-1.93} /><Lantern x={1.93} />
    <Block size={[3.8, 0.1, 0.4]} color="#634533" position={[0, 0.73, 1.93]} />
    {[-1.2, 0, 1.2].map((x, i) => <group key={x} position={[x, 0, 2.43]}>
      <Cylinder radius={0.17} height={0.09} position={[0, 0.47, 0]} color="#895a3d" />
      <Cylinder radius={0.035} height={0.4} position={[0, 0.23, 0]} color="#333a39" />
      <mesh position={[0, 0.84, -0.42]} rotation={[Math.PI, 0, 0]}><sphereGeometry args={[0.115, 10, 5, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#e4c8a0" /></mesh>
      {selected && <group onClick={(event) => { event.stopPropagation(); onItem(store.items[i].id); }}>
        <Sign text={store.items[i].title.toUpperCase()} width={0.8} height={0.2} position={[0, 1.12, -0.56]} background="#4b3229" color="#ffe0a7" />
      </group>}
    </group>)}
    <Sign text="OPEN LATE" width={0.7} height={0.23} position={[1.78, 0.45, 1.82]} color="#ddc48a" background="#3d443c" />
    <pointLight position={[0, 1.2, 2.3]} color="#ffab58" intensity={9} distance={5} decay={2} />
  </Store>;
}