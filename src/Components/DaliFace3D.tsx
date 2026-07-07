import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture, Float } from '@react-three/drei';
import daliFaceImg from '../assets/dali_face.png';

const TechnicalFace = ({ imagePath }: { imagePath: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imagePath);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 4, 32, 32]} />
      <meshStandardMaterial
        transparent
        map={texture}
        displacementMap={texture}
        displacementScale={0.5}
        color="#ffffff"
        emissive="#e50914"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const DaliFace3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#e50914" />
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <TechnicalFace imagePath={daliFaceImg} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default DaliFace3D;
