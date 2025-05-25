import {
  OrbitControls,
  ContactShadows,
  SoftShadows,
  BakeShadows,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import Keyboard from "./keyboard";

const App = () => {
  return (
    <>
      <SoftShadows size={20} samples={16} focus={0.5} />

      <Keyboard scale={0.125} />

      <ambientLight intensity={1} color="#e8e8ed" />

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

      <OrbitControls />

      <Perf position="top-left" />
    </>
  );
};

export default App;
