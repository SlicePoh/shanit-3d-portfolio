"use client";

import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { ACESFilmicToneMapping, PCFSoftShadowMap } from "three";
import type { StoreId } from "@/data/types";
import type { NavigationState } from "@/lib/navigation";
import Building from "./Building";
import Street from "./Street";
import CameraRig from "./CameraRig";
import LabelProjection from "./LabelProjection";
import RoomScene from "./rooms/RoomScene";

export interface SceneProps {
  selected: StoreId | null;
  view: NavigationState["view"];
  revision: number;
  reducedMotion: boolean;
  onVisit: (id: StoreId) => void;
  onItem: (storeId: StoreId, itemId: string) => void;
  onHover: (id: StoreId | null) => void;
  onReady: () => void;
  onUnavailable: () => void;
}

function SceneLifecycle({ onReady, onUnavailable }: Pick<SceneProps, "onReady" | "onUnavailable">) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const onLoss = (event: Event) => { event.preventDefault(); onUnavailable(); };
    canvas.addEventListener("webglcontextlost", onLoss);
    onReady();
    return () => canvas.removeEventListener("webglcontextlost", onLoss);
  }, [gl, onReady, onUnavailable]);
  return null;
}

export default function PortfolioScene(props: SceneProps) {
  const inRoom = (props.view === "interior" || props.view === "leaving") && props.selected !== null;
  return <Canvas orthographic camera={{ position: [17, 17.1, 23], zoom: 48, near: 0.1, far: 100 }} shadows dpr={[1, 1.5]} frameloop="demand" gl={{ antialias: true, alpha: true, powerPreference: "low-power", toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.15 }} onCreated={({ gl }) => { gl.shadowMap.type = PCFSoftShadowMap; }} fallback={<span>Use the directory to explore this portfolio without WebGL.</span>}>
    <fog attach="fog" args={["#10171c", 35, 80]} />
    <ambientLight intensity={0.55} color="#b3c6de" />
    <hemisphereLight args={["#adc7dc", "#3c3025", 1.25]} />
    <directionalLight position={[-8, 17, 12]} color="#ffdfb1" intensity={2.3} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={15} shadow-camera-bottom={-10} shadow-camera-near={0.5} shadow-camera-far={50} shadow-bias={-0.0005} shadow-normalBias={0.04} />
    <directionalLight position={[8, 12, -8]} color="#96b8d1" intensity={1.7} />
    <Suspense fallback={null}>
      {inRoom ? <RoomScene key={props.selected} id={props.selected!} onItem={(itemId) => props.onItem(props.selected!, itemId)} /> : <>
        <Building selected={props.selected} onVisit={props.onVisit} onHover={props.onHover} />
        <Street />
        <ContactShadows position={[0, -0.42, 0]} opacity={0.65} scale={22} blur={2.8} far={18} resolution={256} frames={1} color="#000509" />
        <LabelProjection />
      </>}
      <CameraRig selected={props.selected} view={props.view} revision={props.revision} reducedMotion={props.reducedMotion} />
      <SceneLifecycle onReady={props.onReady} onUnavailable={props.onUnavailable} />
    </Suspense>
  </Canvas>;
}