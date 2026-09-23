import { storeById } from "@/data/stores";
import type { StoreId } from "@/data/types";

export type InformationPage = "about" | "education";
export interface NavigationState {
  storeId: StoreId | null;
  itemId: string | null;
  information: InformationPage | null;
  directoryOpen: boolean;
  overviewRevision: number;
}
export type NavigationAction =
  | { type: "visit"; storeId: StoreId }
  | { type: "item"; storeId: StoreId; itemId: string }
  | { type: "close-item" }
  | { type: "overview" }
  | { type: "directory"; open: boolean }
  | { type: "information"; page: InformationPage };

export const initialNavigation: NavigationState = {
  storeId: null, itemId: null, information: null, directoryOpen: false, overviewRevision: 0,
};

export function navigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
  switch (action.type) {
    case "visit":
      return { ...state, storeId: action.storeId, itemId: null, information: null, directoryOpen: false };
    case "item":
      if (!storeById[action.storeId].items.some((item) => item.id === action.itemId)) return state;
      return { ...state, storeId: action.storeId, itemId: action.itemId, information: null, directoryOpen: false };
    case "close-item": return { ...state, itemId: null };
    case "overview": return { ...initialNavigation, overviewRevision: state.overviewRevision + 1 };
    case "directory": return { ...state, directoryOpen: action.open };
    case "information":
      return { ...initialNavigation, information: action.page, overviewRevision: state.overviewRevision + 1 };
  }
}