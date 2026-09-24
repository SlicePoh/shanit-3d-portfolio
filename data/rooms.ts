import type { StoreId, Vector3Tuple } from "./types";

export interface RoomDisplay {
  id: string;
  position: Vector3Tuple;
  width: number;
  height: number;
  title: string;
  itemIds?: string[];
  style: "menu" | "skills" | "exhibit" | "award" | "certificates" | "placeholder";
}

export interface StoreRoom {
  id: StoreId;
  title: string;
  wall: string;
  floor: string;
  accent: string;
  roomCameraPosition: Vector3Tuple;
  roomCameraTarget: Vector3Tuple;
}

export const rooms: Record<StoreId, StoreRoom> = {
  ramen: { id: "ramen", title: "PROJECT MENU", wall: "#684735", floor: "#483629", accent: "#efb66e", roomCameraPosition: [0.45, 4.3, 12], roomCameraTarget: [0, 2.6, -1] },
  music: { id: "music", title: "TECHNICAL SKILLS", wall: "#304b46", floor: "#3e3a30", accent: "#b8d6bd", roomCameraPosition: [0.3, 4.4, 12], roomCameraTarget: [0, 2.7, -1] },
  museum: { id: "museum", title: "PROFESSIONAL EXPERIENCE", wall: "#3e4249", floor: "#4b4d50", accent: "#d7be86", roomCameraPosition: [0.3, 4.6, 12], roomCameraTarget: [0, 2.7, -1] },
  football: { id: "football", title: "ACHIEVEMENTS & CERTIFICATIONS", wall: "#283b55", floor: "#433c32", accent: "#e5bf6f", roomCameraPosition: [0.35, 4.5, 12], roomCameraTarget: [0, 2.7, -1] },
  manga: { id: "manga", title: "THE NEXT CHAPTER", wall: "#514354", floor: "#403435", accent: "#c5a7d1", roomCameraPosition: [0.5, 4.4, 12], roomCameraTarget: [0, 2.7, -1] },
};

/** The same physical surfaces drive meshes, projected HTML and keyboard interaction. */
export function roomDisplays(id: StoreId, compact: boolean): RoomDisplay[] {
  switch (id) {
    case "ramen": return [{ id: "project-menu", title: rooms[id].title, position: [0, 3.25, -2.15], width: 4.3, height: 4.1, style: "menu" }];
    case "music": return [{ id: "skills-wall", title: rooms[id].title, position: [0, 3.1, -2.15], width: compact ? 4.6 : 7, height: compact ? 5.35 : 4.3, style: "skills" }];
    case "museum": return ["siemens-sde", "siemens-intern", "abhyaz-intern"].map((itemId, index) => ({
      id: itemId, title: "CAREER COLLECTION", position: compact ? [0, 4.95 - index * 1.67, -1.9] : [-2.55 + index * 2.55, 3.3, -1.9], width: compact ? 4.5 : 2.35, height: compact ? 1.48 : 3.25, style: "exhibit", itemIds: [itemId],
    }));
    case "football": return [
      { id: "award", title: "TROPHY CABINET", position: compact ? [-1.17, 4.8, -1.9] : [-2.5, 4.25, -1.9], width: compact ? 2.2 : 2.6, height: 1.8, style: "award", itemIds: ["rising-star"] },
      { id: "writing", title: "THE MATCHDAY PROGRAMME", position: compact ? [1.17, 4.8, -1.9] : [-2.5, 2.3, -1.9], width: compact ? 2.2 : 2.6, height: 1.8, style: "award", itemIds: ["technical-writing"] },
      { id: "certificates", title: "CERTIFICATIONS", position: compact ? [0, 1.95, -2.15] : [1.25, 3.05, -2.15], width: compact ? 4.6 : 4.35, height: compact ? 3.65 : 4.1, style: "certificates", itemIds: ["core-java", "java-full-stack", "blockchain-fundamentals", "rust-for-java", "rust-essential-training", "level-up-rust"] },
    ];
    case "manga": return [{ id: "placeholder", title: rooms[id].title, position: [0, 3, -2.15], width: 4.3, height: 2.5, style: "placeholder" }];
  }
}