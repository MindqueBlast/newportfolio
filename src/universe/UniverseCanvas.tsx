"use client";

import { useGraphicsMode } from "@/lib/use-graphics-mode";
import { getDprCap, getQualityTier } from "@/lib/quality";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CAMERA_PATH, sampleCamera } from "./camera-path";
import { useScrollUniverse } from "./scroll-store";

const UniverseWorld = dynamic(
  () => import("./UniverseWorld").then((m) => m.UniverseWorld),
  { ssr: false },
);

function ScrollCamera({ animate }: { animate: boolean }) {
  const { progress, activeChapter } = useScrollUniverse();
  const look = useRef(new THREE.Vector3());
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  useFrame(({ camera, pointer }, dt) => {
    if (!animate) {
      const wp =
        CAMERA_PATH.find((w) => w.id === activeChapter) ?? CAMERA_PATH[0];
      camera.position.set(...wp.position);
      look.current.set(...wp.lookAt);
      camera.lookAt(look.current);
      return;
    }

    const sample = sampleCamera(progress);
    const parallax = 0.32;
    targetPos.current.set(
      sample.position[0] + pointer.x * parallax,
      sample.position[1] + pointer.y * parallax * 0.5,
      sample.position[2],
    );
    targetLook.current.set(...sample.lookAt);
    const alpha = 1 - Math.exp(-dt * 3.4);
    camera.position.lerp(targetPos.current, alpha);
    look.current.lerp(targetLook.current, alpha);
    camera.lookAt(look.current);
  });

  return null;
}

function UniverseCanvasInner() {
  const { mode } = useGraphicsMode();
  const { canvasInteractive } = useScrollUniverse();
  const [tier, setTier] = useState(getQualityTier());
  useEffect(() => setTier(getQualityTier()), []);
  const animate = mode === "full";
  const dpr = useMemo(() => getDprCap(tier), [tier]);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 1.4, 9.2], fov: 40, near: 0.1, far: 220 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: canvasInteractive ? "auto" : "none",
      }}
      onPointerMissed={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <ScrollCamera animate={animate} />
      <UniverseWorld dense={tier !== "low"} />
      {tier !== "low" ? (
        <EffectComposer>
          <Bloom
            intensity={0.65}
            luminanceThreshold={0.28}
            luminanceSmoothing={0.65}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.18} darkness={0.55} />
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
