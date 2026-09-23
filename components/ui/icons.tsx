import { FlaskConical, LibraryBig, Disc3, Soup, Trophy } from "lucide-react";
import type { StoreId } from "@/data/types";

export const storeIcons = { ramen: Soup, football: Trophy, music: Disc3, museum: LibraryBig, manga: FlaskConical } satisfies Record<StoreId, typeof Soup>;