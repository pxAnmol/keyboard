import {
  ContactShadows,
  SoftShadows,
  useGLTF,
  Environment,
  PresentationControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import Keyboard from "./keyboard";
import Text from "./text";
import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const App = () => {
  const { scene } = useGLTF("/tv-com.glb");
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 2.1, 2.6);
    const target = new THREE.Vector3(0, 0, -2);
    camera.lookAt(target);
  }, [camera]);

  return (
    <>
      <SoftShadows size={15} samples={16} focus={1} />

      <PresentationControls
        global
        cursor={true}
        snap={true}
        speed={1.2}
        zoom={0.9}
        polar={[-0.3, 0.6]}
        azimuth={[-Math.PI / 2, Math.PI / 2]}
        config={{ mass: 1, tension: 250, friction: 35 }}
        snapConfig={{ mass: 1, tension: 150, friction: 40 }}
      >
        <Keyboard scale={0.075} />
        <Text />

        <primitive
          object={scene}
          scale={5}
          rotation-y={-Math.PI / 2}
          position={[0, 0, -2]}
          castShadow
          receiveShadow
        />
      </PresentationControls>

      <ambientLight intensity={0.4} color="#64748b" />

      <directionalLight
        position={[-3, 4, 2]}
        intensity={1}
        color="#f1f5f9"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      <hemisphereLight intensity={0.2} color="#cbd5e1" groundColor="#334155" />

      <ContactShadows
        position={[0, -0.05, 0]}
        opacity={0.5}
        scale={8}
        blur={1.2}
        far={1.5}
        resolution={256}
        color="#0f172a"
      />

      <Environment
        preset="city"
        environmentIntensity={0.4}
        backgroundBlurriness={0.5}
      />

      {/* <Perf position="top-left" /> */}
    </>
  );
};

export default App;
