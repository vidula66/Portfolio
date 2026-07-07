import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const HolographicMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#e50914'),
    uOpacity: 0.8,
    uScanlineIntensity: 0.5,
    uFlickerSpeed: 1.0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -modelViewPosition.xyz;
      gl_Position = projectionMatrix * modelViewPosition;
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uScanlineIntensity;
    uniform float uFlickerSpeed;

    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      // Fresnel effect
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 - dot(vNormal, viewDir), 2.5);
      
      // Scanlines
      float scanline = sin(vPosition.y * 50.0 - uTime * 10.0) * 0.5 + 0.5;
      scanline = pow(scanline, 2.0) * uScanlineIntensity;

      // Flickering
      float flicker = 0.95 + 0.05 * sin(uTime * 20.0 * uFlickerSpeed);
      
      // Horizontal noise/glitch
      float glitch = step(0.98, sin(vPosition.y * 100.0 + uTime * 5.0)) * 0.1;

      vec3 finalColor = uColor + (fresnel * 0.5);
      float alpha = (uOpacity * (0.3 + scanline + fresnel)) * flicker;
      
      // Add a bit of wireframe look by accentuating edges or UVs if desired
      // For now, simple holographic glow
      
      gl_FragColor = vec4(finalColor + glitch, alpha);
    }
  `
);

extend({ HolographicMaterialImpl });

const HolographicMaterial = (props: any) => {
  const ref = useRef<any>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    // @ts-ignore
    <holographicMaterialImpl
      ref={ref}
      transparent
      depthWrite={false}
      blending={THREE.AdditiveBlending}
      {...props}
    />
  );
};

export default HolographicMaterial;


