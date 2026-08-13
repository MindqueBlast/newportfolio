"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  detectReducedMotion,
  detectWebGL,
  resolveGraphicsMode,
  type GraphicsMode,
} from "./graphics-mode";

type GraphicsContextValue = {
  mode: GraphicsMode;
  webgl: boolean;
  reducedMotion: boolean;
  ready: boolean;
};

const GraphicsContext = createContext<GraphicsContextValue>({
  mode: "html-only",
  webgl: false,
  reducedMotion: true,
  ready: false,
});

export function GraphicsProvider({ children }: { children: ReactNode }) {
  const [webgl, setWebgl] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setWebgl(detectWebGL());
      setReducedMotion(mq.matches);
      setReady(true);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const value = useMemo(
    () => ({
      mode: resolveGraphicsMode(webgl, reducedMotion),
      webgl,
      reducedMotion,
      ready,
    }),
    [webgl, reducedMotion, ready],
  );

  return (
    <GraphicsContext.Provider value={value}>{children}</GraphicsContext.Provider>
  );
}

export function useGraphicsMode() {
  return useContext(GraphicsContext);
}
