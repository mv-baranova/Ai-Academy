import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const CentralHub = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#00f2ff"
            speed={3}
            distort={0.4}
            radius={1}
            emissive="#004d4d"
          />
        </Sphere>
      </Float>

      {/* Orbiting Elements */}
      {[...Array(5)].map((_, i) => (
        <group key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <mesh position={[2.5, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#7000ff" emissive="#350080" />
          </mesh>
        </group>
      ))}

      {/* Grid Floor */}
      <gridHelper args={[20, 20, '#111', '#050505']} position={[0, -2, 0]} />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7000ff" />
    </group>
  );
};
