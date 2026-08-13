"use client";

import { useGraphicsMode } from "@/lib/use-graphics-mode";
import { getDprCap, getQualityTier } from "@/lib/quality";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { sampleCamera } from "./camera-path";
import { useScrollUniverse } from "./scroll-store";

const UniverseWorld = dynamic(
  () => import("./UniverseWorld").then((m) => m.UniverseWorld),
  { ssr: false },
);

function ScrollCamera({ animate }: { animate: boolean }) {
  const { progress } = useScrollUniverse();
  const look = useRef(new THREE.Vector3());
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  useFrame(({ camera }, dt) => {
    const sample = sampleCamera(progress);
    targetPos.current.set(...sample.position);
    targetLook.current.set(...sample.lookAt);
    const alpha = animate ? 1 - Math.exp(-dt * 3.5) : 1;
    camera.position.lerp(targetPos.current, alpha);
    look.current.lerp(targetLook.current, alpha);
    camera.lookAt(look.current);
  });

  return null;
}

function UniverseCanvasInner() {
  const { mode } = useGraphicsMode();
  const [tier, setTier] = useState(getQualityTier());
  useEffect(() => setTier(getQualityTier()), []);
  const animate = mode === "full";
  const dpr = useMemo(() => getDprCap(tier), [tier]);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 1.2, 8.5], fov: 42, near: 0.1, far: 200 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <ScrollCamera animate={animate} />
      <UniverseWorld dense={tier !== "low"} />
      {tier !== "low" ? (
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.32}
            luminanceSmoothing={0.7}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={0.5} />
        </EffectComposer>
      ) : null}
    </Canvas>
  );
}

export function UniverseCanvas() {
  const { mode, ready, webgl } = useGraphicsMode();
  const show = ready && webgl && mode !== "html-only";

  if (!show) {
    return (
      <div
        className="pointer-events-none fixed inset-0 -z-10 arrival-fallback"
        aria-hidden
      />
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <UniverseCanvasInner />
    </div>
  );
}
