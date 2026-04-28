import { Component, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function GlassSphere({ position, scale = 0.3, speed = 1, color = '#F472B6' }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t + offset) * 0.6;
    ref.current.position.x = position[0] + Math.cos(t * 0.7 + offset) * 0.3;
    ref.current.rotation.y = t * 0.3;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshPhysicalMaterial
        color={color}
        transmission={0.9}
        thickness={0.5}
        roughness={0.1}
        metalness={0}
        ior={1.45}
        clearcoat={1}
        clearcoatRoughness={0.05}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function MiniHeart({ position, scale = 0.15, speed = 0.8, color = '#DB2777' }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x, y + 0.5);
    shape.bezierCurveTo(x, y + 0.5, x - 0.1, y, x - 0.5, y);
    shape.bezierCurveTo(x - 1, y, x - 1, y + 0.7, x - 1, y + 0.7);
    shape.bezierCurveTo(x - 1, y + 1.1, x - 0.7, y + 1.54, x, y + 1.9);
    shape.bezierCurveTo(x + 0.7, y + 1.54, x + 1, y + 1.1, x + 1, y + 0.7);
    shape.bezierCurveTo(x + 1, y + 0.7, x + 1, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.1, y, x, y + 0.5, x, y + 0.5);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t + offset) * 0.5;
    ref.current.position.x = position[0] + Math.sin(t * 0.5 + offset) * 0.2;
    ref.current.rotation.y = t * 0.4;
    ref.current.rotation.z = Math.sin(t * 0.3 + offset) * 0.15;
  });

  return (
    <mesh ref={ref} geometry={geometry} position={position} scale={scale} rotation={[Math.PI, 0, 0]}>
      <meshPhysicalMaterial
        color={color}
        transmission={0.85}
        thickness={0.8}
        roughness={0.05}
        ior={1.5}
        iridescence={0.6}
        iridescenceIOR={1.3}
        clearcoat={1}
        transparent
        opacity={0.65}
      />
    </mesh>
  );
}

function GlassRing({ position, scale = 0.25, speed = 0.6, color = '#FBBF24' }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t + offset) * 0.4;
    ref.current.rotation.x = t * 0.5;
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.5;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1, 0.3, 16, 32]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.4}
        roughness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.05}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function Diamond({ position, scale = 0.18, speed = 0.7, color = '#FDA4AF' }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t + offset) * 0.5;
    ref.current.rotation.y = t * 0.6;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.3;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color={color}
        transmission={0.88}
        thickness={1}
        roughness={0.02}
        ior={2.4}
        iridescence={1}
        iridescenceIOR={2}
        clearcoat={1}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function FloatingDot({ position, color, size = 0.03 }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + offset) * 0.4;
    ref.current.position.x = position[0] + Math.cos(t * 0.5 + offset) * 0.2;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.5} />
    </mesh>
  );
}

function BackgroundScene() {
  const elements = useMemo(() => {
    const spread = { x: 8, y: 5, z: 4 };
    const rp = () => [
      (Math.random() - 0.5) * spread.x,
      (Math.random() - 0.5) * spread.y,
      -2 - Math.random() * spread.z,
    ];

    const spheres = Array.from({ length: 6 }, () => ({
      position: rp(),
      scale: 0.15 + Math.random() * 0.25,
      speed: 0.4 + Math.random() * 0.6,
      color: ['#F472B6', '#FDA4AF', '#FCD34D', '#DB2777'][Math.floor(Math.random() * 4)],
    }));

    const hearts = Array.from({ length: 5 }, () => ({
      position: rp(),
      scale: 0.08 + Math.random() * 0.12,
      speed: 0.3 + Math.random() * 0.5,
      color: ['#DB2777', '#BE185D', '#F472B6'][Math.floor(Math.random() * 3)],
    }));

    const rings = Array.from({ length: 3 }, () => ({
      position: rp(),
      scale: 0.12 + Math.random() * 0.15,
      speed: 0.3 + Math.random() * 0.4,
      color: ['#FBBF24', '#FCD34D', '#CA8A04'][Math.floor(Math.random() * 3)],
    }));

    const diamonds = Array.from({ length: 3 }, () => ({
      position: rp(),
      scale: 0.1 + Math.random() * 0.12,
      speed: 0.4 + Math.random() * 0.4,
      color: ['#FDA4AF', '#F472B6', '#FCD34D'][Math.floor(Math.random() * 3)],
    }));

    const dots = Array.from({ length: 20 }, () => ({
      position: rp(),
      color: ['#DB2777', '#F472B6', '#FBBF24', '#FDA4AF'][Math.floor(Math.random() * 4)],
      size: 0.015 + Math.random() * 0.03,
    }));

    return { spheres, hearts, rings, diamonds, dots };
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#FFF1F2" />
      <pointLight position={[-4, 3, 0]} intensity={0.4} color="#F472B6" />
      <pointLight position={[4, -3, -2]} intensity={0.3} color="#FBBF24" />

      {elements.spheres.map((props, i) => (
        <GlassSphere key={`s-${i}`} {...props} />
      ))}
      {elements.hearts.map((props, i) => (
        <MiniHeart key={`h-${i}`} {...props} />
      ))}
      {elements.rings.map((props, i) => (
        <GlassRing key={`r-${i}`} {...props} />
      ))}
      {elements.diamonds.map((props, i) => (
        <Diamond key={`d-${i}`} {...props} />
      ))}
      {elements.dots.map((props, i) => (
        <FloatingDot key={`dot-${i}`} {...props} />
      ))}
    </>
  );
}

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function Scene3DBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          fallback={null}
        >
          <BackgroundScene />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
