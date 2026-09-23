import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { stores } from "@/data/stores";

/** Project into the existing HTML tree, rather than mounting additional React roots in WebGL. */
export default function LabelProjection() {
  const markers = useMemo(() => stores.map((store) => ({
    id: `store-marker-${store.id}`,
    world: new Vector3(store.position[0] + store.scale[0] / 2 + 0.08, store.position[1] + store.scale[1] * 0.62, store.position[2] + store.scale[2] / 2),
    projected: new Vector3(),
  })), []);
  useFrame(({ camera, size }) => {
    for (const marker of markers) {
      const element = document.getElementById(marker.id);
      if (!element) continue;
      marker.projected.copy(marker.world).project(camera);
      const x = (marker.projected.x * 0.5 + 0.5) * size.width;
      const y = (-marker.projected.y * 0.5 + 0.5) * size.height;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      element.style.visibility = Math.abs(marker.projected.z) <= 1 ? "visible" : "hidden";
    }
  });
  return null;
}