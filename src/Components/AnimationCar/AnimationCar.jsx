"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";

function CarModel(props) {
  const { scene } = useGLTF("/scene.gltf");
  return <primitive object={scene} scale={2} {...props} />;
}

function GlassBase() {
  return (
    <mesh position={[0, -1.1, 0]}>
      {" "}
      {/* Flat under the car */}
      <cylinderGeometry args={[2.5, 2.5, 0.2, 64]} />
      <meshPhysicalMaterial
        color="#ffffff"
        transparent
        opacity={0.4}
        roughness={0.1}
        metalness={0.3}
        clearcoat={1}
        transmission={0.9}
        ior={1.4}
      />
    </mesh>
  );
}

const AnimationCar = () => {
  const props = useSpring({
    to: { position: [0, -0.9, 0] }, // car slightly above base
    from: { position: [0, -1.2, 0] },
    config: { duration: 3000 },
    loop: { reverse: true }, // gentle up-down float
  });

  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [5, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />

        <Suspense fallback={null}>
          {/* Flat Glass Base */}
          <GlassBase />

          {/* Floating Car */}
          <a.group {...props}>
            <CarModel />
          </a.group>
        </Suspense>

        {/* OrbitControls → only horizontal rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default AnimationCar;
