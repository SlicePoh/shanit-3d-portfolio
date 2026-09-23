import { Block } from "./primitives";

export default function Windows({ width, height, depth, color = "#e9ab67", divisions = 3 }: { width: number; height: number; depth: number; color?: string; divisions?: number }) {
  return <group position={[0, height * 0.47, depth / 2 - 0.15]}>
    <Block size={[width - 0.42, height * 0.61, 0.035]} color={color} glow={0.32} position={[0, 0, -0.25]} castShadow={false} />
    <Block size={[width - 0.4, 0.09, 0.17]} color="#39312c" position={[0, -height * 0.3, 0.015]} />
    <Block size={[width - 0.4, 0.07, 0.13]} color="#39312c" position={[0, height * 0.3, 0.015]} />
    {Array.from({ length: divisions + 1 }, (_, i) => <Block key={i} size={[0.075, height * 0.62, 0.14]} color="#363232" position={[(i / divisions - 0.5) * (width - 0.42), 0, 0.02]} />)}
    <Block size={[width - 0.4, 0.055, 0.12]} color="#4f3c30" position={[0, height * 0.12, 0.025]} />
  </group>;
}