import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { roomDisplays } from "@/data/rooms";
import type { StoreId } from "@/data/types";
import { Block } from "../primitives";

export const SURFACE_RESOLUTION = 100;

/** Orthographic projection is affine: three corners exactly anchor DOM typography to a 3D plane. */
export default function RoomSurfaces({ id, onItem }: { id: StoreId; onItem: (itemId: string) => void }) {
  const compact = useThree((state) => state.size.width <= 600);
  const displays = useMemo(() => roomDisplays(id, compact), [id, compact]);
  const scratch = useRef([new Vector3(), new Vector3(), new Vector3()]);
  useFrame(({ camera, size }) => {
    const points = scratch.current;
    for (const display of displays) {
      const element = document.getElementById(`room-surface-${display.id}`);
      if (!element) continue;
      const [x, y, z] = display.position;
      points[0].set(x - display.width / 2, y + display.height / 2, z + 0.081);
      points[1].set(x + display.width / 2, y + display.height / 2, z + 0.081);
      points[2].set(x - display.width / 2, y - display.height / 2, z + 0.081);
      for (const p of points) {
        p.project(camera);
        p.x = (p.x + 1) * size.width / 2;
        p.y = (1 - p.y) * size.height / 2;
      }
      const [a, b, c] = points;
      const w = display.width * SURFACE_RESOLUTION;
      const h = display.height * SURFACE_RESOLUTION;
      element.style.transform = `matrix(${(b.x - a.x) / w},${(b.y - a.y) / w},${(c.x - a.x) / h},${(c.y - a.y) / h},${a.x},${a.y})`;
      element.style.visibility = Math.abs(a.z) < 1 ? "visible" : "hidden";
    }
  });
  return <group>{displays.map((display) => <group key={display.id} position={display.position}>
    <Block size={[display.width + 0.16, display.height + 0.16, 0.15]} color={id === "museum" ? "#a18b63" : "#916440"} />
    <Block size={[display.width, display.height, 0.05]} position={[0, 0, 0.065]} color={id === "ramen" ? "#ead9b4" : "#1d302d"} onClick={display.itemIds?.length === 1 ? (event) => { event.stopPropagation(); onItem(display.itemIds![0]); } : undefined} />
  </group>)}</group>;
}