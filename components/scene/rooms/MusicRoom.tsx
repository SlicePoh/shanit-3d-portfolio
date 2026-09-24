import { musicInterests, recordColors } from "@/data/skills";
import { Block, Cylinder, Sign } from "../primitives";
import SuppliedArtwork from "./SuppliedArtwork";

function Record({ x, y, z, color }: { x: number; y: number; z: number; color: string }) {
  return <group position={[x, y, z]}>
    <Cylinder radius={0.31} height={0.025} rotation={[Math.PI / 2, 0, 0]} color="#151e21" />
    <Cylinder radius={0.1} height={0.03} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.015]} color={color} />
    <mesh rotation={[0, 0, 0]} position={[0, 0, 0.018]}><torusGeometry args={[0.24, 0.006, 4, 28]} /><meshStandardMaterial color="#394448" /></mesh>
  </group>;
}

function Strings({ position, small = false }: { position: [number, number, number]; small?: boolean }) {
  return <group position={position} scale={small ? 0.65 : 1} rotation={[0, 0, -0.14]}>
    <mesh scale={[0.38, 0.5, 0.12]}><sphereGeometry args={[1, 12, 10]} /><meshStandardMaterial color={small ? "#9b5631" : "#c79553"} /></mesh>
    <mesh position={[0, 0.15, 0.12]}><circleGeometry args={[0.1, 14]} /><meshStandardMaterial color="#37261d" /></mesh>
    <Block size={[0.11, 0.9, 0.09]} position={[0, 0.8, 0]} color="#6b432a" />
    <Block size={[0.18, 0.22, 0.1]} position={[0, 1.3, 0]} color="#b88047" />
    {[0, 1, 2, 3].map((i) => <Block key={i} size={[0.005, 1.35, 0.004]} position={[-0.03 + i * 0.02, 0.54, 0.14]} color="#d7cba9" />)}
  </group>;
}

export default function MusicRoom() {
  return <group>
    {[-3.95, 3.95].flatMap((x) => [1.9, 2.7, 3.5].map((y, i) => <Record key={`${x}-${y}`} x={x} y={y} z={-2.4} color={recordColors[i]} />))}
    <Block size={[2.6, 0.8, 0.8]} position={[-2.45, 0.45, 0.3]} color="#71533a" />
    <Block size={[1.2, 0.12, 0.75]} position={[-2.6, 0.94, 0.3]} color="#252c29" />
    <Cylinder radius={0.29} height={0.025} position={[-2.75, 1.02, 0.3]} color="#111a1d" />
    <Cylinder radius={0.075} height={0.03} position={[-2.75, 1.03, 0.3]} color="#d5a268" />
    <Block size={[0.025, 0.025, 0.42]} position={[-2.27, 1.04, 0.22]} rotation={[0, -0.5, 0]} color="#ada898" />
    {[-3.9, 3.9].map((x) => <group key={x} position={[x, 0.85, -0.35]}>
      <Block size={[0.7, 1.6, 0.65]} color="#292c2c" />
      {[0.36, -0.38].map((y) => <Cylinder key={y} radius={0.22} height={0.025} rotation={[Math.PI / 2, 0, 0]} position={[0, y, 0.34]} color="#77765f" />)}
    </group>)}
    <Strings position={[3.25, 1.1, 0.4]} />
    <Strings position={[2.5, 1.15, 0.4]} small />
    {/* A compact piano and harmonium; all atmospheric, not navigation. */}
    {[{ x: 0.3, y: 0.65, scale: 1 }, { x: 1.75, y: 0.4, scale: 0.55 }].map(({ x, y, scale }) => <group key={x} position={[x, y, 0.8]} scale={scale}>
      <Block size={[1.35, 1, 0.55]} color="#352d27" />
      <Block size={[1.4, 0.1, 0.7]} position={[0, 0.05, 0.2]} color="#493b2b" />
      {Array.from({ length: 14 }, (_, i) => <Block key={i} size={[0.075, 0.03, 0.3]} position={[-0.56 + i * 0.085, 0.12, 0.34]} color={i % 3 === 1 ? "#292d2c" : "#e0d5bb"} />)}
    </group>)}
    <Sign text={musicInterests.join(" / ")} width={4.2} height={0.2} position={[0, 0.38, -2.44]} background="#304b46" color="#a9b9a1" />
    <SuppliedArtwork name="queen" width={0.7} height={0.8} position={[-4.51, 3.5, -0.3]} rotation={[0, Math.PI / 2, 0]} />
    <SuppliedArtwork name="seedheMaut" width={0.7} height={0.7} position={[4.51, 3.5, -0.3]} rotation={[0, -Math.PI / 2, 0]} />
  </group>;
}