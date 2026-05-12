import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars, Torus, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface CentralHubProps {
  activeSubject?: string | null;
}

export const CentralHub = ({ activeSubject }: CentralHubProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const subjectConfig = useMemo(() => {
    switch (activeSubject) {
      case 'math': return { color: '#ff2e63', emissive: '#660022', speed: 6, distort: 0.6 };
      case 'russian': return { color: '#00d2ff', emissive: '#004466', speed: 4, distort: 0.4 };
      case 'history': return { color: '#ffb800', emissive: '#664400', speed: 3, distort: 0.3 };
      case 'english': return { color: '#00ff9f', emissive: '#006633', speed: 5, distort: 0.5 };
      case 'literature': return { color: '#bd00ff', emissive: '#440066', speed: 4, distort: 0.7 };
      default: return { color: '#00f2ff', emissive: '#006666', speed: 3, distort: 0.4 };
    }
  }, [activeSubject]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.position.y = Math.sin(time * 0.2) * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.15;
      ring1Ref.current.rotation.x = Math.sin(time * 0.4) * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.12;
      ring2Ref.current.rotation.y = Math.cos(time * 0.3) * 0.4;
    }
    if (ring3Ref.current) {
        ring3Ref.current.rotation.x = time * 0.08;
        ring3Ref.current.rotation.z = Math.sin(time * 0.2) * 0.6;
    }
  });

  return (
    <>
      <color attach="background" args={['#010103']} />
      <Stars radius={120} depth={80} count={12000} factor={7} saturation={0} fade speed={1} />

      <Sparkles count={200} scale={20} size={1} speed={0.4} opacity={0.1} color={subjectConfig.color} />

      <group ref={groupRef}>
        {/* Core Neural Sphere */}
        <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5}>
          <Sphere ref={coreRef} args={[1.5, 128, 128]}>
            <MeshDistortMaterial
              color={subjectConfig.color}
              speed={subjectConfig.speed}
              distort={subjectConfig.distort}
              radius={1}
              emissive={subjectConfig.emissive}
              emissiveIntensity={4}
              roughness={0}
              metalness={1}
              clearcoat={1}
            />
          </Sphere>
        </Float>

        {/* Cinematic Data Rings */}
        <Torus ref={ring1Ref} args={[4, 0.015, 16, 120]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={subjectConfig.color} emissive={subjectConfig.color} emissiveIntensity={20} transparent opacity={0.5} />
        </Torus>

        <Torus ref={ring2Ref} args={[4.8, 0.008, 16, 120]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={15} transparent opacity={0.3} />
        </Torus>

        <Torus ref={ring3Ref} args={[5.6, 0.005, 16, 120]} rotation={[-Math.PI / 3, 0, Math.PI / 6]}>
          <meshStandardMaterial color={activeSubject ? subjectConfig.color : "#ffb800"} emissive={activeSubject ? subjectConfig.color : "#ffb800"} emissiveIntensity={10} transparent opacity={0.2} />
        </Torus>

        {/* Ambient Logic Particles */}
        {useMemo(() => [...Array(80)].map((_, i) => (
          <Float key={i} speed={Math.random() * 4} floatIntensity={10}>
            <mesh position={[
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 25
            ]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? subjectConfig.color : i % 3 === 1 ? "#7000ff" : "#ffffff"}
                emissive={i % 3 === 0 ? subjectConfig.color : i % 3 === 1 ? "#7000ff" : "#ffffff"}
                emissiveIntensity={15}
                transparent
                opacity={0.6}
              />
            </mesh>
          </Float>
        )), [subjectConfig.color])}
      </group>

      <ambientLight intensity={0.02} />
      <pointLight position={[20, 20, 20]} intensity={2} color={subjectConfig.color} />
      <pointLight position={[-20, -20, -20]} intensity={1.5} color="#7000ff" />
      <spotLight position={[0, 40, 0]} angle={0.2} penumbra={1} intensity={5} color={subjectConfig.color} />

      {/* Volumetric Light Effect */}
      <mesh position={[0, 0, -5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.8} />
      </mesh>

      <Environment preset="night" />
    </>
  );
};
