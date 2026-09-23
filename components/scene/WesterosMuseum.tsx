import Store, { type StoreRendererProps } from "./Store";
import NeonSign from "./NeonSign";
import { Block, Cylinder, Sign } from "./primitives";

export default function WesterosMuseum({ store, selected, onItem }: StoreRendererProps) {
  const [w] = store.scale;
  return <Store store={store} wall="#65665e" trim="#484e4b">
    <Block size={[w - 0.4, 1.6, 0.04]} color="#9b8152" glow={0.19} position={[0, 1.1, 1.3]} />
    <NeonSign text={store.sign} position={[0, 1.95, 1.77]} width={3.55} height={0.3} color="#e0cea3" background="#444638" />
    <group position={[0, 1.16, 1.5]} onClick={(event) => { event.stopPropagation(); onItem(store.items[0].id); }}>
      <Block size={[1.4, 1.08, 0.05]} color="#715839" />
      <Sign text="WESTEROS" subtext="A FICTIONAL ATLAS" width={1.22} height={0.22} color="#65513b" background="#c8af77" position={[0, 0.38, 0.031]} />
      <Block size={[1.22, 0.7, 0.02]} color="#c0a36e" position={[0, -0.09, 0.035]} />
      <mesh position={[-0.1, -0.06, 0.054]} scale={[0.23, 0.35, 0.01]} rotation={[0, 0, -0.3]}><icosahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#786e49" /></mesh>
      <mesh position={[0.25, -0.15, 0.057]} scale={[0.13, 0.2, 0.01]} rotation={[0, 0, 0.6]}><icosahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#89744b" /></mesh>
    </group>
    {[-1.25, 1.25].map((x, i) => <group key={x} position={[x, 0.85, 1.5]} onClick={(event) => { event.stopPropagation(); onItem(store.items[i + 1].id); }}>
      <Block size={[0.55, 0.11, 0.45]} color="#594a38" position={[0, -0.32, 0]} />
      <Block size={[0.085, 0.65, 0.06]} color="#bac3b5" rotation={[0, 0, i ? -0.2 : 0.2]} />
      <Block size={[0.32, 0.065, 0.09]} color="#b39a61" position={[0, -0.18, 0.01]} />
      {selected && <Sign text={store.items[i + 1].label!} width={0.65} height={0.16} color="#d7c79a" background="#454137" position={[0, -0.53, 0.15]} />}
    </group>)}
    {[-1.82, 1.82].map((x) => <group key={x} position={[x, 1.13, 1.73]}>
      <Cylinder radius={0.07} height={1.45} color="#878377" />
      <Block size={[0.24, 0.12, 0.27]} color="#8e8b7a" position={[0, 0.72, 0]} />
      <Block size={[0.17, 0.23, 0.19]} color="#ffd189" glow={1.1} position={[0, 0.1, 0.19]} />
    </group>)}
    {[-1.65, -0.83, 0, 0.83, 1.65].map((x) => <Block key={x} size={[0.35, 0.25, 0.4]} color="#77796d" position={[x, 2.24, 1.45]} />)}
  </Store>;
}