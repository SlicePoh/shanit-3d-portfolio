import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Euler, MathUtils, OrthographicCamera, Vector3 } from "three";
import { storeById } from "@/data/stores";
import { rooms } from "@/data/rooms";
import type { NavigationState } from "@/lib/navigation";
import type { StoreId } from "@/data/types";

export default function CameraRig({ selected, view, revision, reducedMotion }: Readonly<{ selected: StoreId | null; view: NavigationState["view"]; revision: number; reducedMotion: boolean }>) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { size, invalidate } = useThree();
  const animating = useRef(true);
  const previousRoom = useRef(false);
  const inRoom = (view === "interior" || view === "leaving") && selected !== null;
  const destination = useMemo(() => {
    if (inRoom && selected) {
      const room = rooms[selected];
      const compact = size.width <= 600;
      const target = new Vector3(...room.roomCameraTarget);
      if (compact) target.y = 3.1;
      const zoom = Math.min(size.width / (compact ? 5.35 : 10.8), size.height / 7.1);
      return { target, position: new Vector3(...room.roomCameraPosition), zoom: zoom * (view === "leaving" ? 0.8 : 1) };
    }
    const desktop = size.width >= 900;
    const baseZoom = Math.min(size.width / (desktop ? 22 : 12.8), size.height / 18.6);
    const store = selected ? storeById[selected] : null;
    const target = store ? new Vector3(store.position[0], store.position[1] + store.scale[1] * 0.6, store.position[2]) : new Vector3(0, 5.9, 0);
    const zoom = store ? Math.min(size.width / 6.5, size.height / 5) : baseZoom;
    const direction = store ? new Vector3(0.5, 3, 12).applyEuler(new Euler(...store.rotation)) : new Vector3(17, 11.2, 23);
    return { target, position: target.clone().add(direction), zoom };
  }, [selected, inRoom, view, size.width, size.height]);

  useEffect(() => { animating.current = true; invalidate(); }, [destination, revision, invalidate]);
  useFrame(({ camera }, delta) => {
    if (!animating.current || !controls.current) return;
    const ortho = camera as OrthographicCamera;
    // Swap camera frames behind the portal fade, not through unrelated world coordinates.
    const switched = previousRoom.current !== inRoom;
    previousRoom.current = inRoom;
    const alpha = reducedMotion || switched ? 1 : 1 - Math.exp(-delta * 6.5);
    camera.position.lerp(destination.position, alpha);
    controls.current.target.lerp(destination.target, alpha);
    ortho.zoom = MathUtils.lerp(ortho.zoom, destination.zoom, alpha);
    ortho.updateProjectionMatrix();
    controls.current.update();
    if (camera.position.distanceTo(destination.position) < 0.015 && Math.abs(ortho.zoom - destination.zoom) < 0.015) {
      camera.position.copy(destination.position);
      controls.current.target.copy(destination.target);
      ortho.zoom = destination.zoom;
      ortho.updateProjectionMatrix();
      animating.current = false;
    } else invalidate();
  });

  const transitioning = view === "entering" || view === "leaving";
  return <OrbitControls ref={controls} makeDefault enabled={!transitioning} enablePan={false} enableDamping={!reducedMotion} dampingFactor={0.09} minAzimuthAngle={inRoom ? -0.42 : -Infinity} maxAzimuthAngle={inRoom ? 0.42 : Infinity} minPolarAngle={inRoom ? 1.22 : 0.83} maxPolarAngle={inRoom ? 1.58 : 1.36} minZoom={destination.zoom * 0.8} maxZoom={destination.zoom * 1.55} rotateSpeed={0.5} zoomSpeed={0.65} onStart={() => { animating.current = false; }} />;
}