import { Block, BlockInstances, Cylinder } from "../primitives";
import SuppliedArtwork from "./SuppliedArtwork";

export default function MuseumRoom() {
  return <group>
    <BlockInstances blocks={Array.from({ length: 48 }, (_, i) => ({ position: [-4.25 + (i % 12) * 0.77, 0.65 + Math.floor(i / 12) * 1.48, -2.45], scale: [0.68, 0.22, 0.08], color: i % 3 ? "#595a56" : "#66645b" }))} />
    {[-2.6, 0, 2.6].map((x, i) => <group key={x} position={[x, 0, -0.5]}>
      <Block size={[1.15, 0.2, 1.1]} position={[0, 0.12, 0]} color="#74736b" />
      <Block size={[0.95, 0.78, 0.9]} position={[0, 0.6, 0]} color="#444b4d" />
      <Block size={[1.16, 0.08, 1.1]} position={[0, 1, 0]} color="#aaa081" />
      {i === 0 ? <group position={[0, 1.22, 0]}>
        <Cylinder radius={0.29} height={0.17} color="#b39553" />
        {Array.from({ length: 7 }, (_, index) => <mesh key={index} position={[Math.sin(index * Math.PI * 2 / 7) * 0.25, 0.18, Math.cos(index * Math.PI * 2 / 7) * 0.25]}><coneGeometry args={[0.07, 0.27, 4]} /><meshStandardMaterial color="#bfa467" metalness={0.65} roughness={0.4} /></mesh>)}
      </group> : i === 1 ? <group position={[0, 1.45, 0]} rotation={[0, 0, 0.3]}>
        <Block size={[0.07, 0.8, 0.05]} color="#c6c5b4" />
        <Block size={[0.37, 0.06, 0.1]} position={[0, -0.16, 0]} color="#bca272" />
        <Block size={[0.07, 0.22, 0.07]} position={[0, -0.3, 0]} color="#4d362d" />
      </group> : <mesh position={[0, 1.35, 0]} scale={[0.6, 0.8, 0.5]}><icosahedronGeometry args={[0.45, 0]} /><meshStandardMaterial color="#7e9994" metalness={0.5} roughness={0.5} /></mesh>}
      <mesh position={[0, 1.48, 0]}><boxGeometry args={[1.05, 0.86, 1]} /><meshPhysicalMaterial color="#d6e8db" transparent opacity={0.09} depthWrite={false} roughness={0.1} /></mesh>
    </group>)}
    <SuppliedArtwork name="westeros" position={[-4.51, 3.2, -0.3]} rotation={[0, Math.PI / 2, 0]} width={1.55} height={2.4} />
    {/* Abstract sword-backed seat, not a character or screen-used model. */}
    <group position={[3.9, 0.3, 1]}>
      <Block size={[0.7, 0.55, 0.65]} color="#44494a" />
      {[-0.3, -0.15, 0, 0.15, 0.3].map((x) => <Block key={x} size={[0.09, 1.4 - Math.abs(x), 0.08]} position={[x, 0.7, -0.22]} rotation={[0, 0, -x * 0.4]} color="#7d8584" />)}
    </group>
    {[-4.05, 4.05].map((x) => <group key={x} position={[x, 2.6, -2.1]}>
      <Cylinder radius={0.05} height={0.7} color="#635442" />
      <mesh position={[0, 0.47, 0]}><coneGeometry args={[0.09, 0.26, 6]} /><meshBasicMaterial color="#ffc878" /></mesh>
      <pointLight position={[0, 0.5, 0.2]} intensity={3} color="#ffaf62" distance={3} />
    </group>)}
  </group>;
}