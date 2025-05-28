import {
  OrbitControls,
  ContactShadows,
  SoftShadows,
  BakeShadows,
  useGLTF,
  Environment,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import Keyboard from "./components/keyboard";
import Text from "./text";
import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const App = () => {
  const { scene } = useGLTF("/tv-com.glb");
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 2, 2.75);

    const target = new THREE.Vector3(0, 0, -2);
    camera.lookAt(target);
  });

  return (
    <>
      <SoftShadows size={20} samples={16} autoUpdate={true} focus={0.5} />

      <Keyboard scale={0.09} />

      <Text />

      <primitive
        object={scene}
        scale={5}
        rotation-y={-Math.PI / 2}
        position={[0, 0, -2]}
      />

      <ambientLight intensity={1.25} color="#e8e8ed" />

      <directionalLight
        position={[-3, 3, -2]}
        intensity={0.7}
        color="#e0e6ff"
      />

      <hemisphereLight intensity={0.5} color="#eef0ff" groundColor="#303040" />

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.7}
        scale={10}
        blur={2.5}
        far={1}
        resolution={256}
        color="#000000"
      />

      {/* <BakeShadows /> */}

      {/* <OrbitControls /> */}

      <Environment
        preset="sunset"
        environmentIntensity={0.5}
        backgroundRotation={Math.PI}
      />
      <Perf position="top-left" />
    </>
  );
};

export default App;
