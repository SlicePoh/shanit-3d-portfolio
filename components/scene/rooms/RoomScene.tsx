import { rooms } from "@/data/rooms";
import type { StoreId } from "@/data/types";
import RoomShell from "./RoomShell";
import RoomSurfaces from "./RoomSurfaces";
import RamenRoom from "./RamenRoom";
import MusicRoom from "./MusicRoom";
import MuseumRoom from "./MuseumRoom";
import FootballRoom from "./FootballRoom";
import MangaRoom from "./MangaRoom";

export default function RoomScene({ id, onItem }: { id: StoreId; onItem: (itemId: string) => void }) {
  return <RoomShell room={rooms[id]}>
    <RoomSurfaces id={id} onItem={onItem} />
    {id === "ramen" && <RamenRoom />}
    {id === "music" && <MusicRoom />}
    {id === "museum" && <MuseumRoom />}
    {id === "football" && <FootballRoom onItem={onItem} />}
    {id === "manga" && <MangaRoom />}
  </RoomShell>;
}