"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ScrollUniverseValue = {
  progress: number;
  setProgress: (n: number) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
};

const ScrollUniverseContext = createContext<ScrollUniverseValue | null>(null);

export function ScrollUniverseProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const value = useMemo(
    () => ({
      progress,
      setProgress,
      selectedProjectId,
      setSelectedProjectId,
    }),
    [progress, selectedProjectId],
  );

  return (
    <ScrollUniverseContext.Provider value={value}>
      {children}
    </ScrollUniverseContext.Provider>
  );
}

export function useScrollUniverse() {
  const ctx = useContext(ScrollUniverseContext);
  if (!ctx) {
    throw new Error("useScrollUniverse must be used within provider");
  }
  return ctx;
}

/** Tracks document scroll → 0..1 progress for the universe camera. */
export function ScrollProgressBinder() {
  const { setProgress } = useScrollUniverse();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [setProgress]);

  return null;
}
