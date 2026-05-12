import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars, Torus, Environment } from '@react-three/drei';
import * as THREE from 'three';

export const CentralHub = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.2;
      ring1Ref.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }
    if (ring2.current) {
      ring2.current.rotation.z = -time * 0.15;
      ring2.current.rotation.y = Math.cos(time * 0.4) * 0.3;
    }
    if (ring3Ref.current) {
        ring3Ref.current.rotation.x = time * 0.1;
        ring3Ref.current.rotation.z = Math.sin(time * 0.3) * 0.5;
    }
  });

  const ring2 = useRef<THREE.Mesh>(null);

  return (
    <>
      <color attach="background" args={['#010103']} />
      <Stars radius={100} depth={60} count={10000} factor={6} saturation={0} fade speed={1.5} />

      <group ref={groupRef}>
        {/* Core Mystery Sphere */}
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Sphere ref={coreRef} args={[1.5, 128, 128]}>
            <MeshDistortMaterial
              color="#00f2ff"
              speed={4}
              distort={0.5}
              radius={1}
              emissive="#006666"
              emissiveIntensity={3}
              roughness={0}
              metalness={1}
            />
          </Sphere>
        </Float>

        {/* Cinematic Rings */}
        <Torus ref={ring1Ref} args={[3.8, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={15} transparent opacity={0.4} />
        </Torus>

        <Torus ref={ring2} args={[4.5, 0.005, 16, 100]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={15} transparent opacity={0.3} />
        </Torus>

        <Torus ref={ring3Ref} args={[5.2, 0.005, 16, 100]} rotation={[-Math.PI / 3, 0, Math.PI / 6]}>
          <meshStandardMaterial color="#ffb800" emissive="#ffb800" emissiveIntensity={10} transparent opacity={0.2} />
        </Torus>

        {/* Ambient Data Particles */}
        {useMemo(() => [...Array(60)].map((_, i) => (
          <Float key={i} speed={Math.random() * 3} floatIntensity={8}>
            <mesh position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20
            ]}>
              <sphereGeometry args={[0.012, 8, 8]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? "#00f2ff" : i % 3 === 1 ? "#7000ff" : "#ffb800"}
                emissive={i % 3 === 0 ? "#00f2ff" : i % 3 === 1 ? "#7000ff" : "#ffb800"}
                emissiveIntensity={15}
              />
            </mesh>
          </Float>
        )), [])}
      </group>

      <ambientLight intensity={0.05} />
      <pointLight position={[15, 15, 15]} intensity={1.5} color="#00f2ff" />
      <pointLight position={[-15, -15, -15]} intensity={1.5} color="#7000ff" />
      <spotLight position={[0, 25, 0]} angle={0.2} penumbra={1} intensity={3} color="#00f2ff" />

      <Environment preset="night" />
    </>
  );
};
