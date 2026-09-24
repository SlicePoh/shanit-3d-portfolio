import { Suspense } from "react";
import { Image as ArtworkPlane } from "@react-three/drei";
import resume from "@/data/resume.json";
import type { Vector3Tuple } from "@/data/types";
import { Block } from "../primitives";

export default function SuppliedArtwork({ name, position, width, height, rotation = [0, 0, 0] }: { name: string; position: Vector3Tuple; width: number; height: number; rotation?: Vector3Tuple }) {
  const url = (resume.artwork as Record<string, string>)[name];
  if (!url) return null;
  return <group position={position} rotation={rotation}>
    <Block size={[width + 0.12, height + 0.12, 0.06]} color="#6e583e" />
    <Suspense fallback={null}><ArtworkPlane url={url} position={[0, 0, 0.04]} scale={[width, height]} transparent toneMapped /></Suspense>
  </group>;
}