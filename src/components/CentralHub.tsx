import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars, Torus, Environment } from '@react-three/drei';
import * as THREE from 'three';

export const CentralHub = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.2;
      ring1Ref.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.15;
      ring2Ref.current.rotation.y = Math.cos(time * 0.4) * 0.3;
    }
  });

  return (
    <>
      <color attach="background" args={['#020205']} />
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />

      <group ref={groupRef}>
        {/* Core Mystery Sphere */}
        <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
          <Sphere ref={coreRef} args={[1.5, 64, 64]}>
            <MeshDistortMaterial
              color="#00f2ff"
              speed={3}
              distort={0.4}
              radius={1}
              emissive="#004d4d"
              emissiveIntensity={2}
              roughness={0}
              metalness={1}
            />
          </Sphere>
        </Float>

        {/* Cinematic Rings */}
        <Torus ref={ring1Ref} args={[3.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={10} transparent opacity={0.5} />
        </Torus>

        <Torus ref={ring2Ref} args={[4.2, 0.01, 16, 100]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={10} transparent opacity={0.3} />
        </Torus>

        {/* Ambient Particles */}
        {[...Array(40)].map((_, i) => (
          <Float key={i} speed={Math.random() * 2} floatIntensity={5}>
            <mesh position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15
            ]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#00f2ff" : "#7000ff"}
                emissive={i % 2 === 0 ? "#00f2ff" : "#7000ff"}
                emissiveIntensity={10}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
      <spotLight position={[0, 20, 0]} angle={0.15} penumbra={1} intensity={2} color="#00f2ff" />

      <Environment preset="city" />
    </>
  );
};
