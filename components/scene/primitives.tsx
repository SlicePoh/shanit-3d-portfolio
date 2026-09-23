"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";
import type { Vector3Tuple } from "@/data/types";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const materials = new Map<string, THREE.MeshStandardMaterial>();

function material(color: string, glow = 0) {
  const key = `${color}:${glow}`;
  if (!materials.has(key)) {
    materials.set(key, new THREE.MeshStandardMaterial({ color, roughness: 0.82, metalness: 0.08, emissive: color, emissiveIntensity: glow }));
  }
  return materials.get(key)!;
}

type BlockProps = Omit<ThreeElements["mesh"], "scale" | "color"> & {
  size: Vector3Tuple; color?: string; glow?: number;
};

export function Block({ size, color = "#55565a", glow = 0, ...props }: BlockProps) {
  return <mesh geometry={boxGeometry} material={material(color, glow)} scale={size} castShadow receiveShadow {...props} />;
}

export function Slab({ size, color, position }: { size: Vector3Tuple; color: string; position: Vector3Tuple }) {
  return <RoundedBox args={size} radius={0.045} smoothness={1} position={position} material={material(color)} castShadow receiveShadow />;
}

export function Cylinder({ color = "#303737", radius = 0.1, height = 1, ...props }: Omit<ThreeElements["mesh"], "color"> & { color?: string; radius?: number; height?: number }) {
  return <mesh material={material(color)} castShadow receiveShadow {...props}><cylinderGeometry args={[radius, radius, height, 8]} /></mesh>;
}

export interface InstanceBlock { position: Vector3Tuple; scale: Vector3Tuple; color: string; rotation?: Vector3Tuple }

/** One draw call for all bricks, books, or pavers in a batch. */
export function BlockInstances({ blocks }: { blocks: InstanceBlock[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    blocks.forEach((block, i) => {
      dummy.position.set(...block.position);
      dummy.scale.set(...block.scale);
      dummy.rotation.set(...(block.rotation ?? [0, 0, 0]));
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
      ref.current!.setColorAt(i, color.set(block.color));
    });
    ref.current!.instanceMatrix.needsUpdate = true;
    if (ref.current!.instanceColor) ref.current!.instanceColor.needsUpdate = true;
    ref.current!.computeBoundingSphere();
  }, [blocks]);
  return <instancedMesh ref={ref} args={[boxGeometry, undefined, blocks.length]} castShadow receiveShadow><meshStandardMaterial roughness={0.9} /></instancedMesh>;
}

/** Local canvas typography; no remote fonts, images, logos, or models. */
export function Sign({ text, subtext, width = 2, height = 0.42, color = "#f0d3a1", background = "#252825", glow = 0.3, ...props }: Omit<ThreeElements["mesh"], "color"> & {
  text: string; subtext?: string; width?: number; height?: number; color?: string; background?: string; glow?: number;
}) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = Math.max(128, Math.round(1024 * height / width));
    const context = canvas.getContext("2d")!;
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = color;
    context.globalAlpha = 0.32;
    context.lineWidth = 3;
    context.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
    context.globalAlpha = 1;
    context.textAlign = "center";
    context.textBaseline = "middle";
    let fontSize = canvas.height * (subtext ? 0.42 : 0.52);
    context.font = `600 ${fontSize}px monospace`;
    const measured = context.measureText(text).width;
    fontSize *= Math.min(1, (canvas.width - 90) / measured);
    context.font = `600 ${fontSize}px monospace`;
    context.fillStyle = color;
    context.fillText(text, 512, canvas.height * (subtext ? 0.4 : 0.52));
    if (subtext) {
      context.font = `500 ${canvas.height * 0.18}px monospace`;
      context.globalAlpha = 0.75;
      context.fillText(subtext, 512, canvas.height * 0.77);
    }
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 4;
    return map;
  }, [text, subtext, width, height, color, background]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <mesh {...props}><planeGeometry args={[width, height]} /><meshStandardMaterial map={texture} emissiveMap={texture} emissive="white" emissiveIntensity={glow} roughness={0.65} /></mesh>;
}

export function Plant({ position, scale = 1 }: { position: Vector3Tuple; scale?: number }) {
  return <group position={position} scale={scale}>
    <Cylinder radius={0.18} height={0.28} color="#75554a" position={[0, 0.14, 0]} />
    <mesh position={[0, 0.47, 0]} castShadow><icosahedronGeometry args={[0.3, 0]} /><meshStandardMaterial color="#547467" roughness={1} /></mesh>
    <mesh position={[0.12, 0.64, 0.04]} castShadow><icosahedronGeometry args={[0.19, 0]} /><meshStandardMaterial color="#6d8066" roughness={1} /></mesh>
  </group>;
}