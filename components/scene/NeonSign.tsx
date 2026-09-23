import { Block, Sign } from "./primitives";
import type { Vector3Tuple } from "@/data/types";

export default function NeonSign({ text, position, width = 2.5, color = "#98c4b7", background = "#253833", height = 0.4, neon = false, subtext }: {
  text: string; position: Vector3Tuple; width?: number; color?: string; background?: string; height?: number; neon?: boolean; subtext?: string;
}) {
  return <group position={position}>
    <Block size={[width + 0.12, height + 0.12, 0.15]} color={background} />
    <Sign text={text} subtext={subtext} width={width} height={height} color={color} background={background} glow={neon ? 1.4 : 0.35} position={[0, 0, 0.081]} />
    {neon && <Block size={[width - 0.1, 0.025, 0.025]} color={color} glow={2} position={[0, -height / 2 - 0.025, 0.1]} castShadow={false} />}
  </group>;
}