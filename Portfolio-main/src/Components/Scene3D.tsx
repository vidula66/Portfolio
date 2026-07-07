import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingTorus({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
  });
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <MeshDistortMaterial color={color} transparent opacity={0.35} distort={0.3} speed={2} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
  });
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial color={color} transparent opacity={0.3} distort={0.4} speed={3} roughness={0.3} metalness={0.9} />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.25;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });
  return (
    <Float speed={1.8} rotationIntensity={1} floatIntensity={2.5}>
      <mesh ref={ref} position={position}>
        <octahedronGeometry args={[0.8, 0]} />
        <MeshWobbleMaterial color={color} transparent opacity={0.25} factor={0.4} speed={2} roughness={0.1} metalness={1} />
      </mesh>
    </Float>
  );
}

function Particles({ count = 200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#e50914" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#e50914" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#ffc107" />

        <FloatingTorus position={[4, 2, -2]} color="#e50914" speed={0.8} />
        <FloatingIcosahedron position={[-3.5, -1.5, -1]} color="#b20710" scale={1.2} />
        <FloatingOctahedron position={[2, -2.5, -3]} color="#ffc107" />
        <FloatingIcosahedron position={[-4, 3, -4]} color="#8c060d" scale={0.7} />
        <FloatingTorus position={[-1, 3.5, -5]} color="#e50914" speed={0.5} />

        <Particles count={300} />
      </Canvas>
    </div>
  );
}
