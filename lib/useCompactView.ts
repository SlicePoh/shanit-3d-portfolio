import { useSyncExternalStore } from "react";

const query = "(max-width: 600px)";
const subscribe = (listener: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
};
export function useCompactView() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}