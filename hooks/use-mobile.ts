"use client";

import { useWindowSize } from "./use-window-size";

export function useMobile() {
  const { width } = useWindowSize();
  return width !== undefined && width < 640;
}
