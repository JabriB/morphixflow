import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const pointsRef = useRef();
  const mouseRef  = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  const count = 1800;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);

    const teal1  = new THREE.Color('#14B8A6');
    const teal2  = new THREE.Color('#2DD4BF');
    const blue   = new THREE.Color('#60A5FA');
    const slate  = new THREE.Color('#94A3B8');

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 4.8 * Math.cbrt(Math.random());

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      let mixed;
      if (t < 0.4)       mixed = teal1.clone().lerp(teal2, t * 2.5);
      else if (t < 0.7)  mixed = teal2.clone().lerp(blue, (t - 0.4) * 3.3);
      else                mixed = blue.clone().lerp(slate, (t - 0.7) * 3.3);

      colors[i * 3]     = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }
    return { positions, colors };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0006;
      pointsRef.current.rotation.x += 0.00015;
    }
    targetRef.current.x += (mouseRef.current.x * 0.25 - targetRef.current.x) * 0.045;
    targetRef.current.y += (mouseRef.current.y * 0.25 - targetRef.current.y) * 0.045;
    camera.position.x = targetRef.current.x;
    camera.position.y = targetRef.current.y;
    camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleCanvas() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
