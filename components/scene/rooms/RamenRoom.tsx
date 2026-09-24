import { Block, Cylinder, Sign } from "../primitives";

function Bowl({ x }: { x: number }) {
  return <group position={[x, 1.23, 0.6]}>
    <mesh><sphereGeometry args={[0.25, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} /><meshStandardMaterial color="#d2bb95" side={2} /></mesh>
    <Cylinder radius={0.21} height={0.02} position={[0, 0.01, 0]} color="#bf7541" />
    <Cylinder radius={0.065} height={0.02} position={[0.04, 0.027, 0.03]} color="#f0d6b4" />
    <Cylinder radius={0.025} height={0.025} position={[0.04, 0.033, 0.03]} color="#ca7b8b" />
    {[0, 0.07].map((z) => <Block key={z} size={[0.54, 0.02, 0.02]} position={[0, 0.06, z]} rotation={[0, 0.3, 0]} color="#d3a566" />)}
  </group>;
}

export default function RamenRoom() {
  return <group>
    <Block size={[6.6, 1.05, 0.8]} color="#5e3827" position={[0, 0.55, 0.65]} />
    <Block size={[6.9, 0.16, 1.15]} color="#b78149" position={[0, 1.12, 0.65]} />
    {[-2.6, -1.3, 1.3, 2.6].map((x) => <group key={x}>
      <Cylinder radius={0.29} height={0.13} color="#b94f35" position={[x, 0.67, 1.7]} />
      <Cylinder radius={0.065} height={0.62} color="#282829" position={[x, 0.31, 1.7]} />
      <Cylinder radius={0.23} height={0.06} color="#32302c" position={[x, 0.05, 1.7]} />
      <Bowl x={x} />
    </group>)}
    {[-3.05, 3.05].map((x) => <group key={x} position={[x, 3.7, -1.4]}>
      <Cylinder radius={0.28} height={0.7} color="#c95a36" />
      {[-0.3, 0.3].map((y) => <Cylinder key={y} radius={0.3} height={0.05} color="#403226" position={[0, y, 0]} />)}
      <Sign text="RAMEN" width={0.36} height={0.17} position={[0, 0, 0.285]} background="#b2442f" color="#ffe2a4" />
    </group>)}
    <Sign text="一 楽" width={1.1} height={1.55} position={[-3.7, 2.5, -2.44]} background="#d1b890" color="#634b39" />
    <Block size={[0.95, 0.08, 0.4]} position={[3.6, 1.7, -2.15]} color="#a57549" />
    {[0, 1, 2].map((i) => <Cylinder key={i} radius={0.09} height={0.65} rotation={[0, 0, Math.PI / 2]} position={[3.6, 1.83 + i * 0.16, -2.12]} color="#d2b17a" />)}
  </group>;
}