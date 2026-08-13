"use client";

import { neuroAgentBudget, type QualityTier } from "@/lib/quality";
import { useGraphicsMode } from "@/lib/use-graphics-mode";
import { useEffect, useRef, useState } from "react";

type Brain = { w: number[] };

type Agent = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fitness: number;
  brain: Brain;
};

function randBrain(): Brain {
  return { w: Array.from({ length: 8 }, () => Math.random() * 2 - 1) };
}

function mutate(b: Brain): Brain {
  return {
    w: b.w.map((v) =>
      Math.random() < 0.2 ? v + (Math.random() * 0.6 - 0.3) : v,
    ),
  };
}

function think(b: Brain, inputs: number[]): { ax: number; ay: number } {
  const [dx, dy, sx, sy] = inputs;
  const ax =
    Math.tanh(b.w[0] * dx + b.w[1] * dy + b.w[2] * sx + b.w[3] * sy) * 0.12;
  const ay =
    Math.tanh(b.w[4] * dx + b.w[5] * dy + b.w[6] * sx + b.w[7] * sy) * 0.12;
  return { ax, ay };
}

export function NeuroevolutionSim({ tier }: { tier: QualityTier }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion } = useGraphicsMode();
  const [paused, setPaused] = useState(false);
  const [slow, setSlow] = useState(false);
  const [generation, setGeneration] = useState(1);
  const [bestFitness, setBestFitness] = useState(0);
  const [showBrain, setShowBrain] = useState(true);

  const state = useRef({
    agents: [] as Agent[],
    shark: { x: 0, y: 0, vx: 0, vy: 0 },
    genTimer: 0,
    best: null as Agent | null,
  });

  useEffect(() => {
    const n = neuroAgentBudget(tier);
    state.current.agents = Array.from({ length: n }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: 0,
      vy: 0,
      fitness: 0,
      brain: randBrain(),
    }));
    state.current.shark = {
      x: 0.5,
      y: 0.5,
      vx: 0.002,
      vy: -0.0015,
    };
  }, [tier]);

  useEffect(() => {
    if (reducedMotion) {
      setPaused(true);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const step = () => {
      if (!running) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const s = state.current;
      const speed = paused ? 0 : slow ? 0.35 : 1;

      ctx.fillStyle = "#0a1830";
      ctx.fillRect(0, 0, w, h);

      // water gradient
      const g = ctx.createRadialGradient(
        w * 0.5,
        h * 0.4,
        20,
        w * 0.5,
        h * 0.5,
        w * 0.7,
      );
      g.addColorStop(0, "rgba(62, 207, 255, 0.12)");
      g.addColorStop(1, "rgba(11, 18, 36, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      if (speed > 0) {
        s.shark.x += s.shark.vx * speed;
        s.shark.y += s.shark.vy * speed;
        if (s.shark.x < 0.05 || s.shark.x > 0.95) s.shark.vx *= -1;
        if (s.shark.y < 0.05 || s.shark.y > 0.95) s.shark.vy *= -1;

        for (const a of s.agents) {
          const dx = a.x - s.shark.x;
          const dy = a.y - s.shark.y;
          const { ax, ay } = think(a.brain, [dx, dy, s.shark.vx, s.shark.vy]);
          a.vx = (a.vx + ax) * 0.96;
          a.vy = (a.vy + ay) * 0.96;
          a.x += a.vx * speed;
          a.y += a.vy * speed;
          a.x = Math.max(0.02, Math.min(0.98, a.x));
          a.y = Math.max(0.02, Math.min(0.98, a.y));
          const dist = Math.hypot(dx, dy);
          a.fitness += dist * 0.02 * speed;
          if (dist < 0.045) a.fitness *= 0.5;
        }

        s.genTimer += speed;
        if (s.genTimer > 280) {
          s.genTimer = 0;
          s.agents.sort((a, b) => b.fitness - a.fitness);
          const elite = s.agents.slice(0, Math.max(2, s.agents.length / 4));
          setBestFitness(elite[0]?.fitness ?? 0);
          s.best = elite[0] ?? null;
          s.agents = s.agents.map((_, i) => {
            const parent = elite[i % elite.length];
            return {
              x: Math.random(),
              y: Math.random(),
              vx: 0,
              vy: 0,
              fitness: 0,
              brain: mutate(parent.brain),
            };
          });
          setGeneration((g) => g + 1);
        }
      }

      // shark
      ctx.fillStyle = "#ff6b8a";
      ctx.beginPath();
      ctx.ellipse(
        s.shark.x * w,
        s.shark.y * h,
        14,
        8,
        Math.atan2(s.shark.vy, s.shark.vx),
        0,
        Math.PI * 2,
      );
      ctx.fill();

      for (const a of s.agents) {
        ctx.fillStyle = "#7dffb3";
        ctx.beginPath();
        ctx.arc(a.x * w, a.y * h, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (showBrain && s.best) {
        const bx = w - 110;
        const by = 24;
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillRect(bx - 10, by - 10, 100, 70);
        ctx.strokeStyle = "#9b7bff";
        ctx.strokeRect(bx - 10, by - 10, 100, 70);
        s.best.brain.w.forEach((v, i) => {
          const x0 = bx + (i % 4) * 22;
          const y0 = by + Math.floor(i / 4) * 28;
          ctx.fillStyle = v > 0 ? "#3ecfff" : "#c44b9a";
          ctx.fillRect(x0, y0, 8, 8 + Math.abs(v) * 10);
        });
        ctx.fillStyle = "#dce7ff";
        ctx.font = "10px monospace";
        ctx.fillText("NN weights", bx, by + 58);
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [paused, slow, showBrain, reducedMotion, tier]);

  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-2xl border border-[color:var(--line)] md:min-h-[480px]">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute left-3 top-3 space-y-1 rounded-md bg-black/40 px-3 py-2 text-[11px] text-white/85 backdrop-blur">
        <div>Generation {generation}</div>
        <div>Best fitness {bestFitness.toFixed(1)}</div>
        {reducedMotion ? (
          <div className="text-[color:var(--stellar)]">Reduced motion — paused</div>
        ) : null}
      </div>
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-white"
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? "Play" : "Pause"}
        </button>
        <button
          type="button"
          className="rounded bg-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-white"
          onClick={() => setSlow((s) => !s)}
        >
          {slow ? "Normal" : "Slow-mo"}
        </button>
        <button
          type="button"
          className="rounded bg-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-white"
          onClick={() => setShowBrain((b) => !b)}
        >
          NN peek
        </button>
      </div>
    </div>
  );
}
