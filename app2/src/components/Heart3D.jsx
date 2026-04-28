import { Component, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { HeartIcon } from './Icons';

function HeartMesh({ scale = 1, color = '#DB2777', speed = 1, floatIntensity = 1 }) {
  const meshRef = useRef();

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x, y + 0.5);
    shape.bezierCurveTo(x, y + 0.5, x - 0.1, y, x - 0.5, y);
    shape.bezierCurveTo(x - 1, y, x - 1, y + 0.7, x - 1, y + 0.7);
    shape.bezierCurveTo(x - 1, y + 1.1, x - 0.7, y + 1.54, x, y + 1.9);
    shape.bezierCurveTo(x + 0.7, y + 1.54, x + 1, y + 1.1, x + 1, y + 0.7);
    shape.bezierCurveTo(x + 1, y + 0.7, x + 1, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.1, y, x, y + 0.5, x, y + 0.5);
    return shape;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.15,
      bevelThickness: 0.15,
    });
    geo.center();
    return geo;
  }, [heartShape]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.3;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.2 * speed) * 0.04;
      meshRef.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.3} floatIntensity={floatIntensity}>
      <mesh ref={meshRef} geometry={geometry} rotation={[Math.PI, 0, 0]}>
        <meshPhysicalMaterial
          color={color}
          transmission={0.92}
          thickness={1.2}
          roughness={0.05}
          metalness={0}
          ior={1.5}
          iridescence={0.8}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 400]}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1}
          transparent
        />
      </mesh>
    </Float>
  );
}

function FloatingParticle({ position, color, size = 0.04 }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
      ref.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.7 + position[2]) * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.6} />
    </mesh>
  );
}

function Scene({ heartScale = 1.2, heartColor = '#DB2777' }) {
  const particles = useMemo(() => {
    const items = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3 - 1,
        ],
        color: ['#DB2777', '#F472B6', '#FBBF24', '#FDA4AF'][Math.floor(Math.random() * 4)],
        size: 0.02 + Math.random() * 0.04,
      });
    }
    return items;
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#FFF1F2" />
      <directionalLight position={[-3, -2, 4]} intensity={0.4} color="#F472B6" />
      <pointLight position={[-3, 2, 3]} intensity={0.6} color="#F472B6" />
      <pointLight position={[3, -2, 3]} intensity={0.4} color="#FBBF24" />

      <HeartMesh scale={heartScale} color={heartColor} />

      {particles.map((p, i) => (
        <FloatingParticle key={i} position={p.position} color={p.color} size={p.size} />
      ))}
    </>
  );
}

function HeartFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <HeartIcon className="w-24 h-24 text-rose-500 animate-pulse" />
    </div>
  );
}

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <HeartFallback />;
    return this.props.children;
  }
}

export default function Heart3D({
  className = '',
  heartScale = 1.2,
  heartColor = '#DB2777',
}) {
  return (
    <div className={className} style={{ touchAction: 'none' }}>
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          fallback={<HeartFallback />}
        >
          <Scene heartScale={heartScale} heartColor={heartColor} />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
