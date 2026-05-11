import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, MeshWobbleMaterial, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export const CentralHub = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.2;
      groupRef.current.rotation.x = Math.cos(time * 0.1) * 0.1;
    }
  });

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <group ref={groupRef}>
        {/* Main Central Sphere */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere ref={coreRef} args={[1.2, 64, 64]}>
            <MeshDistortMaterial
              color="#00f2ff"
              speed={2}
              distort={0.3}
              radius={1}
              emissive="#004d4d"
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </Float>

        {/* Orbiting Rings */}
        {[...Array(3)].map((_, i) => (
          <mesh key={i} rotation={[Math.PI / (i + 1.5), i * 1.2, 0]}>
            <torusGeometry args={[2.5 + i * 0.4, 0.01, 16, 100]} />
            <meshStandardMaterial color="#7000ff" emissive="#350080" emissiveIntensity={2} transparent opacity={0.3} />
          </mesh>
        ))}

        {/* Glow Particles */}
        {[...Array(20)].map((_, i) => (
          <Float key={i} speed={Math.random() * 5} floatIntensity={2}>
            <mesh position={[
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8
            ]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={5} />
            </mesh>
          </Float>
        ))}
      </group>

      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00f2ff" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#7000ff" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />
    </>
  );
};
