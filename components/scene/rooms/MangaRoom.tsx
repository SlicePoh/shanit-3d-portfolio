import { Block } from "../primitives";

export default function MangaRoom() {
  return <group>{[-3.3, 3.3].map((x) => <group key={x} position={[x, 0, -2]}>
    <Block size={[1.1, 2.4, 0.5]} position={[0, 1.2, 0]} color="#44343d" />
    {[0.3, 1, 1.7, 2.4].map((y) => <Block key={y} size={[1.2, 0.07, 0.65]} position={[0, y, 0.05]} color="#a67a66" />)}
  </group>)}</group>;
}