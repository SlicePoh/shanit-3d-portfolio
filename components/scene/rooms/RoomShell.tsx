import type { ReactNode } from "react";
import type { StoreRoom } from "@/data/rooms";
import { Block, BlockInstances, Cylinder, Sign } from "../primitives";

export default function RoomShell({ room, children }: { room: StoreRoom; children: ReactNode }) {
  return <group>
    <Block size={[9.6, 0.25, 6.6]} position={[0, -0.14, 0]} color="#242b30" />
    <BlockInstances blocks={Array.from({ length: 20 }, (_, i) => ({ position: [-4.5 + i * 0.47, 0.02, 0], scale: [0.45, 0.08, 6.3], color: i % 3 ? room.floor : "#665443" }))} />
    <Block size={[9.5, 6.3, 0.22]} position={[0, 3.1, -2.6]} color={room.wall} />
    <Block size={[0.2, 6.3, 5.6]} position={[-4.65, 3.1, 0.1]} color={room.wall} />
    <Block size={[0.2, 6.3, 5.6]} position={[4.65, 3.1, 0.1]} color={room.wall} />
    {[-4.4, 4.4].map((x) => <Block key={x} size={[0.18, 6.2, 0.2]} position={[x, 3.1, -2.42]} color="#a17b51" />)}
    <Block size={[9.3, 0.18, 0.3]} position={[0, 6.12, -2.4]} color="#a17b51" />
    <Block size={[9.3, 0.1, 0.1]} position={[0, 0.26, -2.42]} color="#96704b" />
    {[-3.8, 3.8].map((x) => <group key={x} position={[x, 4.85, -1.95]}>
      <Cylinder radius={0.025} height={0.75} color="#252729" position={[0, 0.5, 0]} />
      <mesh><coneGeometry args={[0.33, 0.3, 12]} /><meshStandardMaterial color="#876546" /></mesh>
      <Block size={[0.3, 0.03, 0.3]} position={[0, -0.14, 0]} color="#ffe2a1" glow={2} />
      <pointLight color="#ffd39b" intensity={9} distance={7} decay={2} position={[0, -0.3, 0.4]} />
    </group>)}
    <Sign text={room.title} width={6.2} height={0.36} position={[0, 5.88, -2.44]} color={room.accent} background={room.wall} glow={0.5} />
    {children}
  </group>;
}