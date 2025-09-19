import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic Canvas import to avoid SSR errors
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

// Drei components compatible with v9
import { OrbitControls, Html } from "@react-three/drei";

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        <Suspense fallback={null}>
          {/* Simple rotating cube */}
          <mesh rotation={[0.4, 0.2, 0]}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>

          {/* Html overlay */}
          <Html position={[0, 1.5, 0]}>
            <div style={{ color: "white", background: "rgba(0,0,0,0.5)", padding: "4px" }}>
              Hello, Switee!
            </div>
          </Html>
        </Suspense>

        {/* Orbit controls for rotation */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
