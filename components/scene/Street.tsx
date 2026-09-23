import { useMemo } from "react";
import { Block, BlockInstances, Cylinder, Plant, Sign, Slab, type InstanceBlock } from "./primitives";
import StreetLight from "./StreetLight";

export default function Street() {
  const pavers = useMemo<InstanceBlock[]>(() => Array.from({ length: 28 }, (_, i) => ({
    position: [-4.35 + (i % 14) * 0.66, 0.325, 2.8 + Math.floor(i / 14) * 0.5],
    scale: [0.64, 0.05, 0.48], color: ["#686961", "#707069", "#656760", "#76756a"][i % 4],
  })), []);
  return <group>
    <Slab size={[11.8, 0.46, 8.5]} color="#272f31" position={[0, -0.17, 0.65]} />
    <Slab size={[9.4, 0.24, 5.75]} color="#626860" position={[0, 0.14, -0.08]} />
    <Block size={[9.4, 0.1, 0.14]} color="#8e8b75" position={[0, 0.26, 2.73]} />
    <BlockInstances blocks={pavers} />
    <Block size={[11.5, 0.02, 0.035]} color="#ad9764" position={[0, 0.072, 4.63]} />
    <Block size={[0.035, 0.02, 8.1]} color="#ad9764" position={[5.4, 0.072, 0.65]} />
    {[-4.7, -4.18, -3.66, -3.14, -2.62].map((x) => <Block key={x} size={[0.27, 0.02, 1.1]} color="#b1ada0" position={[x, 0.074, 3.76]} castShadow={false} />)}
    {[-0.5, 1.8, 4.1].map((x) => <Block key={x} size={[1.05, 0.015, 0.055]} color="#b8b0a0" position={[x, 0.074, 3.9]} castShadow={false} />)}
    <StreetLight position={[-3.75, 0.27, 1.8]} light />
    <StreetLight position={[3.9, 0.27, -1.85]} />
    <Plant position={[-3.35, 0.27, -0.4]} scale={1.7} />
    <Plant position={[3.5, 0.27, 1.25]} scale={1.2} />
    <group position={[3.7, 0.37, -0.05]} rotation={[0, -Math.PI / 2, 0]}>
      <Block size={[1.2, 0.09, 0.38]} color="#8a7051" position={[0, 0.32, 0]} />
      <Block size={[1.2, 0.28, 0.06]} color="#8a7051" position={[0, 0.56, -0.17]} />
      {[-0.45, 0.45].map((x) => <Block key={x} size={[0.06, 0.35, 0.28]} color="#3b4641" position={[x, 0.14, 0]} />)}
    </group>
    <group position={[-2.78, 0.64, 2.65]} rotation={[-0.1, 0.18, 0]}>
      <Block size={[0.63, 0.85, 0.1]} color="#786447" />
      <Sign text="TODAY’S" subtext="SPECIALS" width={0.52} height={0.45} color="#dec6a0" background="#2d3935" position={[0, 0.1, 0.056]} />
      <Sign text="CODE & RAMEN" width={0.5} height={0.17} color="#dec6a0" background="#2d3935" position={[0, -0.22, 0.056]} />
    </group>
    {[3.2, 4.2].map((x) => <Cylinder key={x} radius={0.055} height={0.65} color="#727c6c" position={[x, 0.57, 2.6]} />)}
    <Sign text="PAUL ST." width={1.2} height={0.25} color="#949d91" background="#303c36" position={[0.25, 0.02, 4.92]} />
  </group>;
}