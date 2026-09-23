import { Block, Cylinder } from "./primitives";
import type { Vector3Tuple } from "@/data/types";

export default function StreetLight({ position, light = false }: { position: Vector3Tuple; light?: boolean }) {
  return <group position={position}>
    <Cylinder radius={0.11} height={0.25} position={[0, 0.13, 0]} color="#354541" />
    <Cylinder radius={0.042} height={3.15} position={[0, 1.6, 0]} color="#4b5a53" />
    <Block size={[0.65, 0.07, 0.07]} color="#4b5a53" position={[0.28, 3.15, 0]} />
    <Block size={[0.46, 0.08, 0.25]} color="#536258" position={[0.52, 3.12, 0]} />
    <Block size={[0.35, 0.035, 0.18]} color="#ffdb9a" glow={2.5} position={[0.52, 3.06, 0]} />
    {light && <pointLight position={[0.52, 2.96, 0]} color="#ffd69a" intensity={12} distance={6} decay={2} />}
  </group>;
}