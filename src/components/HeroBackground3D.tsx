import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 800;
const CONNECTION_DISTANCE = 2.2;

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const particles = useMemo(() => {
    const positions: number[] = [];
    const velocities: number[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions.push(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      );
      velocities.push(
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.005
      );
    }
    return { positions, velocities };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const posArray = useRef(new Float32Array(particles.positions));
  const velArray = useRef(new Float32Array(particles.velocities));

  // Line geometry for connections
  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const maxLines = PARTICLE_COUNT * 6;
    const positions = new Float32Array(maxLines * 6);
    const colors = new Float32Array(maxLines * 6);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  useFrame(({ pointer }) => {
    if (!meshRef.current) return;
    mouse.current.x = pointer.x * viewport.width * 0.5;
    mouse.current.y = pointer.y * viewport.height * 0.5;

    const pos = posArray.current;
    const vel = velArray.current;

    // Update particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Mouse repulsion
      const dx = pos[i3] - mouse.current.x;
      const dy = pos[i3 + 1] - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (3 - dist) * 0.01;
        vel[i3] += dx * force * 0.1;
        vel[i3 + 1] += dy * force * 0.1;
      }

      // Damping
      vel[i3] *= 0.995;
      vel[i3 + 1] *= 0.995;
      vel[i3 + 2] *= 0.995;

      pos[i3] += vel[i3];
      pos[i3 + 1] += vel[i3 + 1];
      pos[i3 + 2] += vel[i3 + 2];

      // Boundaries
      if (Math.abs(pos[i3]) > 7) vel[i3] *= -1;
      if (Math.abs(pos[i3 + 1]) > 5) vel[i3 + 1] *= -1;
      if (Math.abs(pos[i3 + 2]) > 4) vel[i3 + 2] *= -1;

      dummy.position.set(pos[i3], pos[i3 + 1], pos[i3 + 2]);
      
      // Scale based on z-depth for depth effect
      const scale = 0.02 + (pos[i3 + 2] + 4) * 0.004;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update connections
    if (!linesRef.current) return;
    const linePositions = lineGeo.attributes.position.array as Float32Array;
    const lineColors = lineGeo.attributes.color.array as Float32Array;
    let lineIndex = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const j3 = j * 3;
        const dx = pos[i3] - pos[j3];
        const dy = pos[i3 + 1] - pos[j3 + 1];
        const dz = pos[i3 + 2] - pos[j3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < CONNECTION_DISTANCE) {
          const alpha = 1 - d / CONNECTION_DISTANCE;
          const li = lineIndex * 6;

          linePositions[li] = pos[i3];
          linePositions[li + 1] = pos[i3 + 1];
          linePositions[li + 2] = pos[i3 + 2];
          linePositions[li + 3] = pos[j3];
          linePositions[li + 4] = pos[j3 + 1];
          linePositions[li + 5] = pos[j3 + 2];

          // Lime green color matching --primary
          const g = 0.85 * alpha;
          const r = 0.45 * alpha;
          const b = 0.1 * alpha;
          lineColors[li] = r; lineColors[li + 1] = g; lineColors[li + 2] = b;
          lineColors[li + 3] = r; lineColors[li + 4] = g; lineColors[li + 5] = b;

          lineIndex++;
          if (lineIndex >= PARTICLE_COUNT * 6) break;
        }
      }
      if (lineIndex >= PARTICLE_COUNT * 6) break;
    }

    lineGeo.setDrawRange(0, lineIndex * 2);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#b4ff39" transparent opacity={0.7} />
      </instancedMesh>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial vertexColors transparent opacity={0.3} />
      </lineSegments>
    </>
  );
}

const HeroBackground3D = () => {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles />
      </Canvas>
    </div>
  );
};

export default HeroBackground3D;
