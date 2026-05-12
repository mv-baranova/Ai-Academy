import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars, Torus, Environment, Sparkles, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface CentralHubProps {
  activeSubject?: string | null;
}

const SubjectEnvironment = ({ activeSubject, isMobile }: { activeSubject: string, isMobile: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  const particleCount = isMobile ? 150 : 1000;
  const objectCount = isMobile ? 10 : 30;

  switch (activeSubject) {
    case 'math':
      return (
        <group ref={groupRef}>
          {[...Array(isMobile ? 5 : 12)].map((_, i) => (
            <group key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                <Torus args={[6 + i * 2, 0.003, 16, 200]}>
                    <meshStandardMaterial color="#ff2e63" emissive="#ff2e63" emissiveIntensity={15} transparent opacity={0.1} />
                </Torus>
                {i % 3 === 0 && (
                    <Sphere position={[6 + i * 2, 0, 0]} args={[0.1, 16, 16]}>
                        <meshStandardMaterial color="#ff2e63" emissive="#ff2e63" emissiveIntensity={20} />
                    </Sphere>
                )}
            </group>
          ))}
          <gridHelper args={[80, 40, 0xff2e63, 0x111111]} position={[0, -15, 0]} rotation={[Math.PI / 2, 0, 0]} />
        </group>
      );
    case 'russian':
        return (
            <group ref={groupRef}>
                <Sparkles count={particleCount} scale={40} size={2} color="#00d2ff" />
                {[...Array(objectCount)].map((_, i) => (
                    <Float key={i} speed={3} rotationIntensity={5}>
                        <Cylinder position={[(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40]} args={[0.01, 0.01, 2, 8]}>
                            <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={10} transparent opacity={0.3} />
                        </Cylinder>
                    </Float>
                ))}
            </group>
        );
    case 'history':
      return (
          <group ref={groupRef}>
            <Sparkles count={particleCount} scale={50} size={4} speed={0.2} opacity={0.4} color="#ffb800" />
            {[...Array(objectCount)].map((_, i) => (
               <Float key={i} speed={1} rotationIntensity={2} position={[(Math.random() - 0.5) * 45, (Math.random() - 0.5) * 45, (Math.random() - 0.5) * 45]}>
                  <Box args={[0.5, 0.8, 0.01]} rotation={[Math.random(), Math.random(), Math.random()]}>
                    <meshStandardMaterial color="#ffb800" emissive="#ffb800" emissiveIntensity={5} transparent opacity={0.15} />
                  </Box>
               </Float>
            ))}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -20, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#111111" transparent opacity={0.5} />
            </mesh>
          </group>
      );
    case 'english':
        return (
            <group ref={groupRef}>
                {[...Array(20)].map((_, i) => (
                    <Torus key={i} args={[12 + i * 1.5, 0.005, 8, 4]} rotation={[Math.PI / 2, 0, i * 0.15]}>
                        <meshStandardMaterial color="#00ff9f" emissive="#00ff9f" emissiveIntensity={12} transparent opacity={0.08} />
                    </Torus>
                ))}
                <Sparkles count={particleCount} scale={60} size={1.5} speed={1.5} color="#00ff9f" />
                <pointLight position={[0, 0, 0]} intensity={10} color="#00ff9f" />
            </group>
        );
    case 'literature':
        return (
            <group ref={groupRef}>
                <Stars radius={150} depth={100} count={15000} factor={10} saturation={0} fade speed={1.2} />
                <Float speed={4} rotationIntensity={3} floatIntensity={10}>
                    <Sphere args={[20, 64, 64]}>
                        <meshStandardMaterial color="#bd00ff" wireframe transparent opacity={0.05} emissive="#bd00ff" emissiveIntensity={4} />
                    </Sphere>
                </Float>
                <Sparkles count={particleCount} scale={40} size={5} speed={0.4} color="#bd00ff" opacity={0.5} />
            </group>
        );
    default:
      return null;
  }
};

export const CentralHub = ({ activeSubject }: CentralHubProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const subjectConfig = useMemo(() => {
    switch (activeSubject) {
      case 'math': return { color: '#ff2e63', emissive: '#ff2e63', speed: 10, distort: 0.8, zoom: 5.5 };
      case 'russian': return { color: '#00d2ff', emissive: '#00d2ff', speed: 5, distort: 0.4, zoom: 6.5 };
      case 'history': return { color: '#ffb800', emissive: '#ffb800', speed: 2.5, distort: 0.3, zoom: 4.5 };
      case 'english': return { color: '#00ff9f', emissive: '#00ff9f', speed: 6, distort: 0.6, zoom: 6 };
      case 'literature': return { color: '#bd00ff', emissive: '#bd00ff', speed: 4, distort: 0.9, zoom: 7.5 };
      default: return { color: '#00f2ff', emissive: '#00f2ff', speed: 4, distort: 0.5, zoom: 12 };
    }
  }, [activeSubject]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // AAA Cinematic Camera Lerp
    const targetZ = activeSubject ? subjectConfig.zoom : 14;
    const targetY = activeSubject ? 1.8 : 0;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.035);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.035);
    state.camera.lookAt(0, 0, 0);

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.03;
      groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.05;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.15;
      ring1Ref.current.rotation.x = Math.sin(time * 0.4) * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.08;
      ring2Ref.current.rotation.y = Math.cos(time * 0.3) * 0.35;
    }
  });

  const ambientParticleCount = isMobile ? 60 : 200;

  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 1, 40]} />

      <group ref={groupRef}>
        {/* AAA Master Core */}
        <Float speed={5} rotationIntensity={1.5} floatIntensity={3}>
          <Sphere ref={coreRef} args={[1.5, isMobile ? 256 : 1024, isMobile ? 256 : 1024]}>
            <MeshDistortMaterial
              color={subjectConfig.color}
              speed={subjectConfig.speed}
              distort={subjectConfig.distort}
              radius={1}
              emissive={subjectConfig.emissive}
              emissiveIntensity={25}
              roughness={0}
              metalness={1}
              transparent
              opacity={0.98}
              clearcoat={1}
              clearcoatRoughness={0}
            />
          </Sphere>
        </Float>

        {/* Volumetric Holographic Shells */}
        <Sphere args={[2, 128, 128]}>
           <meshStandardMaterial
            color={subjectConfig.color}
            wireframe
            transparent
            opacity={0.03}
            emissive={subjectConfig.color}
            emissiveIntensity={8}
           />
        </Sphere>

        <Torus ref={ring1Ref} args={[4.5, 0.002, 16, isMobile ? 150 : 400]}>
          <meshStandardMaterial
            color={subjectConfig.color}
            emissive={subjectConfig.color}
            emissiveIntensity={40}
            transparent
            opacity={0.9}
          />
        </Torus>

        {/* Dynamically Injected Subject Atmosphere */}
        {activeSubject && <SubjectEnvironment activeSubject={activeSubject} isMobile={isMobile} />}

        {/* Global Cinematic Dust */}
        {useMemo(() => [...Array(ambientParticleCount)].map((_, i) => (
          <Float key={i} speed={Math.random() * 8} floatIntensity={20}>
            <mesh position={[
              (Math.random() - 0.5) * 50,
              (Math.random() - 0.5) * 50,
              (Math.random() - 0.5) * 50
            ]}>
              <sphereGeometry args={[0.005, 8, 8]} />
              <meshStandardMaterial
                color={i % 6 === 0 ? subjectConfig.color : "#ffffff"}
                emissive={i % 6 === 0 ? subjectConfig.color : "#ffffff"}
                emissiveIntensity={30}
                transparent
                opacity={1}
              />
            </mesh>
          </Float>
        )), [subjectConfig.color, ambientParticleCount])}
      </group>

      {/* Cinematic Studio Lighting */}
      <ambientLight intensity={0.005} />
      <pointLight position={[30, 30, 30]} intensity={25} color={subjectConfig.color} />
      <pointLight position={[-30, -30, -30]} intensity={15} color="#7000ff" />

      {!isMobile && (
        <spotLight
          position={[0, 60, 20]}
          angle={0.08}
          penumbra={1}
          intensity={50}
          color={subjectConfig.color}
          castShadow
        />
      )}

      <Environment preset="night" />
    </>
  );
};
