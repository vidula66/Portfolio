import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const TechIcon = ({ text, position, color = "#e50914" }: { text: string, position: [number, number, number], color?: string }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.005;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        <Text
          fontSize={0.2}
          color={color}
          font="https://fonts.gstatic.com/s/robotomono/v12/L0tkDFI8S3S8o949-V76_t77.woff"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[text.length * 0.15 + 0.2, 0.3]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
        <mesh position={[0, 0, -0.06]}>
           <planeGeometry args={[text.length * 0.15 + 0.3, 0.4]} />
           <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const HolographicTechIcons = () => {
  const icons = useMemo(() => [
    { text: "REACT", pos: [-4, 2, -2] },
    { text: "JAVA", pos: [4, -2, -2] },
    { text: "SPRING", pos: [-5, -3, -3] },
    { text: "MYSQL", pos: [5, 3, -3] },
    { text: "TAILWIND", pos: [0, 4, -4] },
    { text: "TYPESCRIPT", pos: [-6, 0, -5] },
    { text: "DOCKER", pos: [6, -1, -5] },
  ], []);

  return (
    <group>
      {icons.map((icon, i) => (
        <TechIcon key={i} text={icon.text} position={icon.pos as any} />
      ))}
    </group>
  );
};

export default HolographicTechIcons;
