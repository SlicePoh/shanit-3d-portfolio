import { jerseys } from "@/data/achievements";
import { Block, Cylinder, Sign } from "../primitives";
import SuppliedArtwork from "./SuppliedArtwork";

export default function FootballRoom({ onItem }: { onItem: (id: string) => void }) {
  return <group>
    <Block size={[9.2, 0.2, 0.06]} position={[0, 5.5, -2.43]} color="#973a47" />
    <group position={[-2.7, 0, 0.1]} onClick={(event) => { event.stopPropagation(); onItem("rising-star"); }}>
      <Block size={[1.3, 0.85, 1.1]} color="#27364b" position={[0, 0.45, 0]} />
      <Block size={[1.4, 0.1, 1.2]} color="#bba06e" position={[0, 0.92, 0]} />
      <Cylinder radius={0.24} height={0.09} color="#b49a5d" position={[0, 1.02, 0]} />
      <Cylinder radius={0.055} height={0.45} color="#d4b764" position={[0, 1.27, 0]} />
      <mesh position={[0, 1.65, 0]}><cylinderGeometry args={[0.32, 0.1, 0.47, 10]} /><meshStandardMaterial color="#d1ae5f" metalness={0.7} roughness={0.28} /></mesh>
      {[-0.3, 0.3].map((x) => <mesh key={x} position={[x, 1.66, 0]}><torusGeometry args={[0.16, 0.025, 6, 12]} /><meshStandardMaterial color="#bca25b" metalness={0.7} roughness={0.3} /></mesh>)}
    </group>
    {jerseys.map((jersey, i) => <group key={jersey.name} position={[-1.0 + i * 1.05, 0.92, 0.2]}>
      <Block size={[0.63, 0.8, 0.07]} color="#294477" />
      <Block size={[0.21, 0.8, 0.085]} color="#943744" />
      {[-0.39, 0.39].map((x) => <Block key={x} size={[0.27, 0.3, 0.08]} position={[x, 0.24, 0]} rotation={[0, 0, x > 0 ? -0.5 : 0.5]} color="#294477" />)}
      <Sign text={jersey.number} subtext={jersey.name} width={0.51} height={0.5} position={[0, 0.01, 0.05]} color="#d7bd7a" background="#263e71" />
      <Cylinder radius={0.015} height={1.4} color="#827864" position={[0, -0.05, -0.12]} />
    </group>)}
    <group position={[3.85, 0.29, 1.4]}>
      <mesh><icosahedronGeometry args={[0.28, 1]} /><meshStandardMaterial color="#e0d8bb" flatShading /></mesh>
      <mesh position={[0, 0.08, 0.24]}><circleGeometry args={[0.085, 5]} /><meshStandardMaterial color="#353b3b" /></mesh>
    </group>
    <Block size={[0.5, 0.14, 0.22]} position={[2.8, 0.18, 1.5]} color="#332e2e" />
    <Block size={[0.5, 0.14, 0.22]} position={[3.1, 0.18, 1.55]} color="#332e2e" />
    <SuppliedArtwork name="barcelona" width={0.75} height={0.9} position={[4.51, 3.3, -0.15]} rotation={[0, -Math.PI / 2, 0]} />
  </group>;
}