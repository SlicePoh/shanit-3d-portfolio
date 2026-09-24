import { storeById } from "@/data/stores";
import type { StoreId } from "@/data/types";

export type InformationPage = "about" | "education";
export interface NavigationState {
  view: "exterior" | "entering" | "interior" | "leaving";
  transitionRevision: number;
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
  | { type: "transition-complete"; revision: number }
  | { type: "overview" }
  | { type: "directory"; open: boolean }
  | { type: "information"; page: InformationPage };

export const initialNavigation: NavigationState = {
  view: "exterior", transitionRevision: 0,
  storeId: null, itemId: null, information: null, directoryOpen: false, overviewRevision: 0,
};

export function navigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
  switch (action.type) {
    case "visit":
      return { ...state, storeId: action.storeId, view: "entering", transitionRevision: state.transitionRevision + 1, itemId: null, information: null, directoryOpen: false };
    case "item":
      if (!storeById[action.storeId].items.some((item) => item.id === action.itemId)) return state;
      if (state.storeId !== action.storeId || state.view !== "interior") return state;
      return { ...state, itemId: action.itemId, information: null, directoryOpen: false };
    case "close-item": return { ...state, itemId: null };
    case "overview": return { ...initialNavigation, storeId: state.view === "interior" ? state.storeId : null, view: state.view === "interior" ? "leaving" : "exterior", transitionRevision: state.transitionRevision + 1, overviewRevision: state.overviewRevision + 1 };
    case "transition-complete":
      if (action.revision !== state.transitionRevision) return state;
      if (state.view === "entering") return { ...state, view: "interior" };
      if (state.view === "leaving") return { ...state, view: "exterior", storeId: null };
      return state;
    case "directory": return { ...state, directoryOpen: action.open };
    case "information":
      return { ...initialNavigation, information: action.page, transitionRevision: state.transitionRevision + 1, overviewRevision: state.overviewRevision + 1 };
  }
}