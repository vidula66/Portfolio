import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Environment, Center } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import ErrorBoundary from '../ErrorBoundary';

interface ModelViewerProps {
  modelUrl: string;
  autoRotate?: boolean;
  className?: string;
}

function Model({ url, onLoad }: { url: string; onLoad: () => void }) {
  const { scene } = useGLTF(url);
  useEffect(() => {
    if (scene) onLoad();
  }, [scene, onLoad]);
  return <primitive object={scene} />;
}

const ModelViewer = ({ 
  modelUrl, 
  autoRotate = true,
  className = '' 
}: ModelViewerProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`model-viewer-container ${className} relative`} style={{ height: '500px', width: '100%' }}>
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-transparent">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono text-heist-red animate-pulse uppercase tracking-[0.3em] whitespace-nowrap bg-black/50 px-4 py-2 rounded border border-heist-red/20">Synchronizing_Dossier...</span>
          </div>
        </div>
      )}
      
      <ErrorBoundary fallback={<div className="w-full h-full flex items-center justify-center text-gray-600 font-mono text-xs">3D Preview Unavailable</div>}>
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <Center>
                <Model url={modelUrl} onLoad={() => setLoading(false)} />
              </Center>
            </Stage>
            
            <pointLight position={[5, 5, 5]} intensity={2} color="#ffc107" />
            <pointLight position={[-5, 5, 5]} intensity={4} color="#e50914" />
            
            <OrbitControls 
              autoRotate={autoRotate} 
              autoRotateSpeed={0.8}
              enableZoom={false} 
              minPolarAngle={Math.PI / 2.5} 
              maxPolarAngle={Math.PI / 1.5}
            />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default ModelViewer;
