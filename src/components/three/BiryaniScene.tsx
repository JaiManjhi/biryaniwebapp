'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════
   BiryaniScene — 3D Biryani Bowl with React Three Fiber
   
   Procedural geometry: bowl + rice mound + toppings
   PBR materials, HDR lighting, steam particles,
   floating spices, and mouse-driven subtle rotation.
   ═══════════════════════════════════════════════════════ */

function BiryaniRice() {
  const riceRef = useRef<THREE.Group>(null);

  /* Generate random rice grain positions on the bowl surface */
  const grains = useMemo(() => {
    const items: Array<{ pos: [number, number, number]; rot: [number, number, number]; scale: number }> = [];
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.7;
      const height = 0.3 + Math.random() * 0.15 - radius * 0.08;
      items.push({
        pos: [Math.cos(angle) * radius, height, Math.sin(angle) * radius],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.8 + Math.random() * 0.4,
      });
    }
    return items;
  }, []);

  return (
    <group ref={riceRef}>
      {grains.map((grain, i) => (
        <mesh key={i} position={grain.pos} rotation={grain.rot} scale={grain.scale * 0.03}>
          <capsuleGeometry args={[0.3, 1.2, 4, 8]} />
          <meshStandardMaterial
            color={i % 5 === 0 ? '#e8a817' : i % 3 === 0 ? '#f5deb3' : '#fff8dc'}
            roughness={0.6}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

function SteamParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 40;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 1] = 0.4 + Math.random() * 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      spd[i] = 0.2 + Math.random() * 0.3;
    }
    return [pos, spd];
  }, []);

  useFrame((_, delta) => {
    if (!particlesRef.current) return;
    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += speeds[i] * delta;
      if (posArray[i * 3 + 1] > 1.5) {
        posArray[i * 3 + 1] = 0.4;
        posArray[i * 3] = (Math.random() - 0.5) * 0.8;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingSpices() {
  const spicesRef = useRef<THREE.Group>(null);

  const spices = useMemo(() => {
    const items: Array<{
      pos: [number, number, number];
      color: string;
      scale: number;
      speed: number;
      offset: number;
    }> = [];
    const colors = ['#8b0000', '#ff6347', '#228b22', '#daa520', '#8b4513'];
    for (let i = 0; i < 15; i++) {
      items.push({
        pos: [
          (Math.random() - 0.5) * 2.5,
          0.5 + Math.random() * 1,
          (Math.random() - 0.5) * 2.5,
        ],
        color: colors[i % colors.length],
        scale: 0.02 + Math.random() * 0.03,
        speed: 0.3 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, []);

  useFrame(({ clock }) => {
    if (!spicesRef.current) return;
    spicesRef.current.children.forEach((child, i) => {
      const t = clock.getElapsedTime() * spices[i].speed + spices[i].offset;
      child.position.y = spices[i].pos[1] + Math.sin(t) * 0.15;
      child.rotation.x = t * 0.5;
      child.rotation.z = t * 0.3;
    });
  });

  return (
    <group ref={spicesRef}>
      {spices.map((spice, i) => (
        <mesh key={i} position={spice.pos} scale={spice.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={spice.color}
            roughness={0.7}
            metalness={0.1}
            emissive={spice.color}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function Bowl() {
  const bowlRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (!bowlRef.current) return;
    bowlRef.current.rotation.y = THREE.MathUtils.lerp(
      bowlRef.current.rotation.y,
      pointer.x * 0.3,
      0.05
    );
    bowlRef.current.rotation.x = THREE.MathUtils.lerp(
      bowlRef.current.rotation.x,
      pointer.y * 0.1 - 0.1,
      0.05
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={bowlRef} position={[0, -0.2, 0]}>
        {/* Bowl exterior */}
        <mesh rotation={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial
            color="#2a1810"
            roughness={0.3}
            metalness={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Bowl rim - golden accent */}
        <mesh position={[0, 0.17, 0]}>
          <torusGeometry args={[0.83, 0.03, 16, 64]} />
          <meshStandardMaterial
            color="#d4a855"
            roughness={0.2}
            metalness={0.8}
            emissive="#d4a855"
            emissiveIntensity={0.15}
          />
        </mesh>
        {/* Bowl interior */}
        <mesh position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.9, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial
            color="#1a0e08"
            roughness={0.5}
            metalness={0.3}
            side={THREE.BackSide}
          />
        </mesh>
        {/* Rice mound base */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.75, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          <meshStandardMaterial
            color="#f5deb3"
            roughness={0.8}
            metalness={0}
          />
        </mesh>
        {/* Rice grains */}
        <BiryaniRice />
        {/* Steam */}
        <SteamParticles />
      </group>
    </Float>
  );
}

export default function BiryaniScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 2.8], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 3]}
        intensity={1.2}
        color="#ffecd2"
        castShadow
      />
      <pointLight position={[-3, 2, -2]} intensity={0.4} color="#d4a855" />
      <pointLight position={[2, 0, 3]} intensity={0.3} color="#ff6b35" />

      <Bowl />
      <FloatingSpices />

      <ContactShadows
        position={[0, -0.7, 0]}
        opacity={0.4}
        scale={3}
        blur={2.5}
        far={1.5}
      />
      <Environment preset="studio" />
    </Canvas>
  );
}
