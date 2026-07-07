import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SafeVault = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const doorRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (doorRef.current) {
      // Gentle rotation of the locking mechanism
      doorRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (groupRef.current) {
      // Subtle float
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Frame */}
      <mesh position={[0, 0, -0.5]}>
        <boxGeometry args={[3, 3, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* The Massive Circular Door */}
      <group ref={doorRef} position={[0, 0, 0]}>
        {/* Main Door Disk */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.2, 64]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={1} />
        </mesh>

        {/* Locking Bars */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <mesh key={angle} rotation={[0, 0, (angle * Math.PI) / 180]} position={[0, 0, 0.15]}>
            <boxGeometry args={[2.8, 0.1, 0.05]} />
            <meshStandardMaterial color="#e50914" emissive="#e50914" emissiveIntensity={0.5} />
          </mesh>
        ))}

        {/* Central Wheel */}
        <mesh position={[0, 0, 0.2]}>
          <torusGeometry args={[0.4, 0.05, 16, 32]} />
          <meshStandardMaterial color="#ffc107" roughness={0.1} metalness={1} />
        </mesh>
        <mesh position={[0, 0, 0.2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
          <meshStandardMaterial color="#ffc107" />
        </mesh>
        <mesh position={[0, 0, 0.2]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
          <meshStandardMaterial color="#ffc107" />
        </mesh>
      </group>

      {/* Internal Red Glow */}
      <pointLight position={[0, 0, -0.2]} intensity={5} color="#e50914" distance={5} />
    </group>
  );
};

export default SafeVault;
