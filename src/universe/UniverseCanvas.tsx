"use client";

import { useGraphicsMode } from "@/lib/use-graphics-mode";
import { getDprCap, getQualityTier } from "@/lib/quality";
import { sampleCameraRig } from "@/universe/director/camera-rig";
import { getChapterBeat } from "@/universe/director/chapter-beats";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CAMERA_PATH } from "./camera-path";
import { useScrollUniverse } from "./scroll-store";

const UniverseWorld = dynamic(
  () => import("./UniverseWorld").then((m) => m.UniverseWorld),
  { ssr: false },
);

function ScrollCamera({ animate }: { animate: boolean }) {
  const { progress, activeChapter } = useScrollUniverse();
  const look = useRef(new THREE.Vector3());
  const { camera } = useThree();

  useFrame(({ pointer }, dt) => {
    if (!animate) {
      const wp =
        CAMERA_PATH.find((w) => w.id === activeChapter) ?? CAMERA_PATH[0];
      camera.position.set(...wp.position);
      if ("fov" in camera) (camera as THREE.PerspectiveCamera).fov = 40;
      look.current.set(...wp.lookAt);
      camera.lookAt(look.current);
      camera.updateProjectionMatrix?.();
      return;
    }

    const rig = sampleCameraRig(progress, activeChapter, pointer, animate);
    const alpha = 1 - Math.exp(-dt * 3.2);
    camera.position.lerp(
      new THREE.Vector3(...rig.position),
      alpha,
    );
    look.current.lerp(new THREE.Vector3(...rig.lookAt), alpha);
    camera.lookAt(look.current);
    if ("fov" in camera) {
      const cam = camera as THREE.PerspectiveCamera;
      cam.fov += (rig.fov - cam.fov) * alpha;
      cam.updateProjectionMatrix();
    }
  });

  return null;
}

function PostStack({ bloom }: { bloom: number }) {
  return (
    <EffectComposer>
      <Bloom
        intensity={bloom}
        luminanceThreshold={0.28}
        luminanceSmoothing={0.65}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.18} darkness={0.55} />
    </EffectComposer>
  );
}

function UniverseCanvasInner() {
  const { mode } = useGraphicsMode();
  const { canvasInteractive, activeChapter } = useScrollUniverse();
  const [tier, setTier] = useState(getQualityTier());
  useEffect(() => setTier(getQualityTier()), []);
  const animate = mode === "full";
  const dpr = useMemo(() => getDprCap(tier), [tier]);
  const beat = getChapterBeat(activeChapter);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 1.5, 9.5], fov: 42, near: 0.1, far: 220 }}
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
      <UniverseWorld dense={tier !== "low"} beat={beat} />
      {tier !== "low" ? <PostStack bloom={beat.bloomIntensity} /> : null}
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
