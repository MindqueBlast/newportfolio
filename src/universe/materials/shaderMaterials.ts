"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend, type ThreeElement } from "@react-three/fiber";
import * as THREE from "three";

export const FresnelGlowMaterial = shaderMaterial(
  {
    uColor: new THREE.Color("#5eead4"),
    uFresnelPower: 2.2,
    uIntensity: 1.2,
    uTime: 0,
  },
  /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 world = modelMatrix * vec4(position, 1.0);
      vWorldPos = world.xyz;
      gl_Position = projectionMatrix * viewMatrix * world;
    }
  `,
  /* glsl */ `
    uniform vec3 uColor;
    uniform float uFresnelPower;
    uniform float uIntensity;
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorldPos);
      float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), uFresnelPower);
      float pulse = 0.85 + 0.15 * sin(uTime * 1.5);
      vec3 col = uColor * fresnel * uIntensity * pulse;
      gl_FragColor = vec4(col, fresnel * 0.95);
    }
  `,
);

export const NebulaMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorA: new THREE.Color("#a78bfa"),
    uColorB: new THREE.Color("#fb7185"),
    uColorC: new THREE.Color("#5eead4"),
    uOpacity: 0.35,
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform float uOpacity;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p *= 2.05;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      float t = uTime * 0.08;
      float n = fbm(uv * 2.2 + t);
      float n2 = fbm(uv * 3.5 - t * 0.7);
      float mask = smoothstep(1.15, 0.15, length(uv));
      vec3 col = mix(uColorA, uColorB, n);
      col = mix(col, uColorC, n2 * 0.55);
      float alpha = mask * (0.25 + n * 0.75) * uOpacity;
      gl_FragColor = vec4(col, alpha);
    }
  `,
);

export const EnergyRibbonMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#67e8f9"),
    uColorB: new THREE.Color("#e879f9"),
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uColorB;
    varying vec2 vUv;
    void main() {
      float band = sin(vUv.x * 28.0 - uTime * 3.0) * 0.5 + 0.5;
      vec3 col = mix(uColor, uColorB, band);
      float alpha = 0.45 + 0.4 * band;
      gl_FragColor = vec4(col, alpha);
    }
  `,
);

extend({ FresnelGlowMaterial, NebulaMaterial, EnergyRibbonMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    fresnelGlowMaterial: ThreeElement<typeof FresnelGlowMaterial>;
    nebulaMaterial: ThreeElement<typeof NebulaMaterial>;
    energyRibbonMaterial: ThreeElement<typeof EnergyRibbonMaterial>;
  }
}
