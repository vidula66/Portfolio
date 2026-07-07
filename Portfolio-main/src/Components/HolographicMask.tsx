import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture, Float, Points, PointMaterial, Text, Sparkles } from '@react-three/drei';
import HolographicTechIcons from './HolographicTechIcons';
import daliFaceImg from '../assets/dali_face.png';
import touristImg from '../assets/tourist.png';

const TechTag = ({ text, position, color = "#e50914" }: { text: string, position: [number, number, number], color?: string }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={ref} position={position}>
        <Text
          fontSize={0.25}
          color={color}
          font="https://fonts.gstatic.com/s/robotomono/v12/L0tkDFI8S3S8o949-V76_t77.woff"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[text.length * 0.2 + 0.4, 0.4]} />
          <meshBasicMaterial color={color} transparent opacity={0.05} />
        </mesh>
        <mesh position={[0, 0, -0.06]}>
           <planeGeometry args={[text.length * 0.2 + 0.5, 0.5]} />
           <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const DataPipeline = () => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 50; i++) {
      pts.push(new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5));
    }
    return pts;
  }, []);

  return (
    <group>
      {points.map((_, i) => (
        <Sparkles key={i} count={5} scale={1} size={1} speed={0.5} color="#e50914" />
      ))}
    </group>
  );
};

const TechnicalPoints = ({ imagePath, armyPath }: { imagePath: string, armyPath: string }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const texture = useTexture(imagePath);
  const armyTexture = useTexture(armyPath);
  
  const { positions, colors } = useMemo(() => {
    const count = 35000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const step = Math.sqrt(count);
    const size = 6.5;
    
    for (let i = 0; i < count; i++) {
      const x = (i % step) / step - 0.5;
      const y = Math.floor(i / step) / step - 0.5;
      
      pos[i * 3] = x * size;
      pos[i * 3 + 1] = y * size;
      
      const dist = Math.sqrt(x * x + y * y);
      const depth = Math.cos(dist * Math.PI) * 1.8;
      pos[i * 3 + 2] = depth + (Math.random() - 0.5) * 0.15;
      
      col[i * 3] = 0.898; 
      col[i * 3 + 1] = 0.035 + (dist * 0.15);
      col[i * 3 + 2] = 0.078 + (dist * 0.4);
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.12;
    }
  });

  return (
    <group>
      <mesh position={[0, 0, -6]} scale={[18, 10, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={armyTexture} transparent opacity={0.12} color="#330000" />
      </mesh>

      <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={0.022}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          alphaMap={texture}
          alphaTest={0.01}
        />
      </Points>
      
      {/* 3D Arsenal of Technology */}
      <TechTag text="REACT" position={[-4, 2.5, 0.5]} />
      <TechTag text="JAVA" position={[4, -2.5, 0.5]} />
      <TechTag text="SPRING_BOOT" position={[-5, -1, 1]} />
      <TechTag text="MYSQL" position={[5, 1.5, -1]} />
      <TechTag text="TAILWIND" position={[0, 4, -0.5]} />
      <TechTag text="THREE_JS" position={[3, 3, 1]} color="#00ffff" />
      <TechTag text="TYPESCRIPT" position={[-3, -3.5, 2]} color="#ffffff" />

      <DataPipeline />

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[25, 25, 25, 25]} />
        <meshBasicMaterial color="#e50914" wireframe transparent opacity={0.03} />
      </mesh>
    </group>
  );
};

const HolographicMask = () => {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px]">
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#e50914" />
        
        <Suspense fallback={null}>
          <HolographicTechIcons />
          <TechnicalPoints 
            imagePath={daliFaceImg} 
            armyPath={touristImg} 
          />
          
          <group rotation={[Math.PI / 2, 0, 0]}>
             <mesh rotation={[0, 0, 0]}>
               <torusGeometry args={[6, 0.005, 16, 100]} />
               <meshBasicMaterial color="#e50914" transparent opacity={0.15} />
             </mesh>
             <mesh rotation={[Math.PI / 6, 0, 0]}>
               <torusGeometry args={[6.3, 0.002, 16, 100]} />
               <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
             </mesh>
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HolographicMask;
