import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { MathUtils, OrthographicCamera, Vector3 } from "three";
import { storeById } from "@/data/stores";
import type { StoreId } from "@/data/types";

export default function CameraRig({ selected, revision, reducedMotion }: Readonly<{ selected: StoreId | null; revision: number; reducedMotion: boolean }>) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { size, invalidate } = useThree();
  const animating = useRef(true);
  const destination = useMemo(() => {
    const desktop = size.width >= 900;
    const baseZoom = Math.min(size.width / (desktop ? 20 : 11.8), size.height / 18.6);
    const store = selected ? storeById[selected] : null;
    const target = store ? new Vector3(store.position[0], store.position[1] + store.scale[1] * 0.6, store.position[2]) : new Vector3(0, 5.9, 0);
    if (store && desktop) target.add(new Vector3(1.4, 0, -0.95));
    if (store && !desktop) target.y -= 1.05;
    const focusMultiplier = desktop ? 1.75 : 1.4;
    const zoom = store ? Math.min(baseZoom * focusMultiplier, 118) : baseZoom;
    return { target, position: target.clone().add(new Vector3(17, 11.2, 23)), zoom };
  }, [selected, size.width, size.height]);

  useEffect(() => { animating.current = true; invalidate(); }, [destination, revision, invalidate]);
  useFrame(({ camera }, delta) => {
    if (!animating.current || !controls.current) return;
    const ortho = camera as OrthographicCamera;
    const alpha = reducedMotion ? 1 : 1 - Math.exp(-delta * 5.2);
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

  return <OrbitControls ref={controls} makeDefault enablePan={false} enableDamping={!reducedMotion} dampingFactor={0.09} minAzimuthAngle={-0.25} maxAzimuthAngle={1.05} minPolarAngle={0.83} maxPolarAngle={1.36} minZoom={destination.zoom * 0.72} maxZoom={destination.zoom * 1.6} rotateSpeed={0.5} zoomSpeed={0.65} onStart={() => { animating.current = false; }} />;
}