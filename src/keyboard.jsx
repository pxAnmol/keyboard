import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import gsap from "gsap";
import { keyToMeshMap } from "./constants/keyMappings";

export default function Keyboard(props) {
  const { nodes, materials } = useGLTF("/keyboard-com.glb");
  const groupRef = useRef();
  const originalPositions = useRef({});
  const pressedKeys = useRef({});
  const keyboardState = useKeyboardControls((state) => state);

  const KEY_PRESS_DEPTH = 0.25;
  const KEY_PRESS_DURATION = 0.015;
  const KEY_RELEASE_DURATION = 0.025;

  useEffect(() => {
    if (!groupRef.current) return;

    Object.values(keyToMeshMap).forEach((meshName) => {
      const keyMesh = groupRef.current.getObjectByName(meshName);
      if (keyMesh) {
        originalPositions.current[meshName] = {
          position: keyMesh.position.clone(),
          rotation: keyMesh.rotation.clone(),
        };
      }
    });
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    Object.entries(keyboardState).forEach(([controlName, isPressed]) => {
      if (isPressed !== pressedKeys.current[controlName]) {
        const meshName = keyToMeshMap[controlName];
        if (!meshName) return;

        const keyMesh = groupRef.current.getObjectByName(meshName);
        if (!keyMesh || !originalPositions.current[meshName]) return;

        pressedKeys.current[controlName] = isPressed;
        const originalTransform = originalPositions.current[meshName];

        if (isPressed) {
          gsap.to(keyMesh.position, {
            y: originalTransform.position.y - KEY_PRESS_DEPTH,
            duration: KEY_PRESS_DURATION,
            ease: "power1.out",
          });
        } else {
          gsap.to(keyMesh.position, {
            y: originalTransform.position.y,
            duration: KEY_RELEASE_DURATION,
            ease: "power1.in",
          });
        }
      }
    });
  });

  return (
    <>
      <group {...props} ref={groupRef} dispose={null}>
        <group
          name="base"
          position={[0, 1.054, 0.002]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[4.508, 4.503, 4.359]}
        >
          <mesh
            name="defaultMaterial"
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial.geometry}
            material={materials.Keyboard}
          />
          <mesh
            name="defaultMaterial_1"
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.Wood_00}
          />
        </group>
        <mesh
          name="ctrl_left"
          castShadow
          receiveShadow
          geometry={nodes.ctrl_left.geometry}
          material={materials.Keyboard}
          position={[-18.935, 2.459, 5.977]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="win_left"
          castShadow
          receiveShadow
          geometry={nodes.win_left.geometry}
          material={materials.Keyboard}
          position={[-15.479, 2.459, 5.977]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="alt_left"
          castShadow
          receiveShadow
          geometry={nodes.alt_left.geometry}
          material={materials.Keyboard}
          position={[-12.022, 2.459, 5.977]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="space"
          castShadow
          receiveShadow
          geometry={nodes.space.geometry}
          material={materials.Keyboard}
          position={[-1.659, 2.566, 5.986]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="alt_right"
          castShadow
          receiveShadow
          geometry={nodes.alt_right.geometry}
          material={materials.Keyboard}
          position={[8.718, 2.459, 5.977]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="win_right"
          castShadow
          receiveShadow
          geometry={nodes.win_right.geometry}
          material={materials.Keyboard}
          position={[12.175, 2.459, 5.977]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="menu"
          castShadow
          receiveShadow
          geometry={nodes.menu.geometry}
          material={materials.Keyboard}
          position={[15.632, 2.459, 5.977]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="ctrl_right"
          castShadow
          receiveShadow
          geometry={nodes.ctrl_right.geometry}
          material={materials.Keyboard}
          position={[19.088, 2.459, 5.977]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="1"
          castShadow
          receiveShadow
          geometry={nodes["1"].geometry}
          material={materials.Keyboard}
          position={[-16.583, 3.607, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="2"
          castShadow
          receiveShadow
          geometry={nodes["2"].geometry}
          material={materials.Keyboard}
          position={[-13.802, 3.607, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="3"
          castShadow
          receiveShadow
          geometry={nodes["3"].geometry}
          material={materials.Keyboard}
          position={[-11.01, 3.607, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="4"
          castShadow
          receiveShadow
          geometry={nodes["4"].geometry}
          material={materials.Keyboard}
          position={[-8.229, 3.607, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="5"
          castShadow
          receiveShadow
          geometry={nodes["5"].geometry}
          material={materials.Keyboard}
          position={[-5.437, 3.607, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="6"
          castShadow
          receiveShadow
          geometry={nodes["6"].geometry}
          material={materials.Keyboard}
          position={[-2.656, 3.607, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="7"
          castShadow
          receiveShadow
          geometry={nodes["7"].geometry}
          material={materials.Keyboard}
          position={[0.094, 3.607, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="8"
          castShadow
          receiveShadow
          geometry={nodes["8"].geometry}
          material={materials.Keyboard}
          position={[2.819, 3.607, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="9"
          castShadow
          receiveShadow
          geometry={nodes["9"].geometry}
          material={materials.Keyboard}
          position={[5.58, 3.607, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="0"
          castShadow
          receiveShadow
          geometry={nodes["0"].geometry}
          material={materials.Keyboard}
          position={[8.328, 3.607, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="dash"
          castShadow
          receiveShadow
          geometry={nodes.dash.geometry}
          material={materials.Keyboard}
          position={[11.113, 3.607, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="equals"
          castShadow
          receiveShadow
          geometry={nodes.equals.geometry}
          material={materials.Keyboard}
          position={[13.851, 3.607, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="backspace"
          castShadow
          receiveShadow
          geometry={nodes.backspace.geometry}
          material={materials.Keyboard}
          position={[18.014, 3.686, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="esc"
          castShadow
          receiveShadow
          geometry={nodes.esc.geometry}
          material={materials.Keyboard}
          position={[-19.312, 3.607, -5.073]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="q"
          castShadow
          receiveShadow
          geometry={nodes.q.geometry}
          material={materials.Keyboard}
          position={[-15.218, 3.204, -2.384]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="w"
          castShadow
          receiveShadow
          geometry={nodes.w.geometry}
          material={materials.Keyboard}
          position={[-12.401, 3.204, -2.384]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="e"
          castShadow
          receiveShadow
          geometry={nodes.e.geometry}
          material={materials.Keyboard}
          position={[-9.589, 3.204, -2.384]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="r"
          castShadow
          receiveShadow
          geometry={nodes.r.geometry}
          material={materials.Keyboard}
          position={[-6.772, 3.204, -2.384]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="t"
          castShadow
          receiveShadow
          geometry={nodes.t.geometry}
          material={materials.Keyboard}
          position={[-3.96, 3.204, -2.384]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="y"
          castShadow
          receiveShadow
          geometry={nodes.y.geometry}
          material={materials.Keyboard}
          position={[-1.143, 3.204, -2.384]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="u"
          castShadow
          receiveShadow
          geometry={nodes.u.geometry}
          material={materials.Keyboard}
          position={[1.669, 3.204, -2.384]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="i"
          castShadow
          receiveShadow
          geometry={nodes.i.geometry}
          material={materials.Keyboard}
          position={[4.486, 3.204, -2.384]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="o"
          castShadow
          receiveShadow
          geometry={nodes.o.geometry}
          material={materials.Keyboard}
          position={[7.298, 3.204, -2.384]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="p"
          castShadow
          receiveShadow
          geometry={nodes.p.geometry}
          material={materials.Keyboard}
          position={[10.115, 3.204, -2.384]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="open_bracket"
          castShadow
          receiveShadow
          geometry={nodes.open_bracket.geometry}
          material={materials.Keyboard}
          position={[12.927, 3.204, -2.384]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="close_bracket"
          castShadow
          receiveShadow
          geometry={nodes.close_bracket.geometry}
          material={materials.Keyboard}
          position={[15.704, 3.204, -2.384]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="backslash"
          castShadow
          receiveShadow
          geometry={nodes.backslash.geometry}
          material={materials.Keyboard}
          position={[18.913, 3.236, -2.386]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="tab"
          castShadow
          receiveShadow
          geometry={nodes.tab.geometry}
          material={materials.Keyboard}
          position={[-18.644, 3.245, -2.387]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="a"
          castShadow
          receiveShadow
          geometry={nodes.a.geometry}
          material={materials.Keyboard}
          position={[-14.524, 2.886, 0.413]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="s"
          castShadow
          receiveShadow
          geometry={nodes.s.geometry}
          material={materials.Keyboard}
          position={[-11.712, 2.886, 0.413]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="d"
          castShadow
          receiveShadow
          geometry={nodes.d.geometry}
          material={materials.Keyboard}
          position={[-8.908, 2.886, 0.413]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="f"
          castShadow
          receiveShadow
          geometry={nodes.f.geometry}
          material={materials.Keyboard}
          position={[-6.096, 2.886, 0.413]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="g"
          castShadow
          receiveShadow
          geometry={nodes.g.geometry}
          material={materials.Keyboard}
          position={[-3.292, 2.886, 0.413]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="h"
          castShadow
          receiveShadow
          geometry={nodes.h.geometry}
          material={materials.Keyboard}
          position={[-0.48, 2.886, 0.413]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="j"
          castShadow
          receiveShadow
          geometry={nodes.j.geometry}
          material={materials.Keyboard}
          position={[2.325, 2.886, 0.413]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="k"
          castShadow
          receiveShadow
          geometry={nodes.k.geometry}
          material={materials.Keyboard}
          position={[5.136, 2.886, 0.413]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="l"
          castShadow
          receiveShadow
          geometry={nodes.l.geometry}
          material={materials.Keyboard}
          position={[7.941, 2.886, 0.413]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="colon"
          castShadow
          receiveShadow
          geometry={nodes.colon.geometry}
          material={materials.Keyboard}
          position={[10.753, 2.886, 0.413]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="quote"
          castShadow
          receiveShadow
          geometry={nodes.quote.geometry}
          material={materials.Keyboard}
          position={[13.557, 2.886, 0.413]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="enter"
          castShadow
          receiveShadow
          geometry={nodes.enter.geometry}
          material={materials.Keyboard}
          position={[17.875, 2.957, 0.415]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="capslock"
          castShadow
          receiveShadow
          geometry={nodes.capslock.geometry}
          material={materials.Keyboard}
          position={[-18.29, 2.941, 0.415]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="shift_left"
          castShadow
          receiveShadow
          geometry={nodes.shift_left.geometry}
          material={materials.Keyboard}
          position={[-17.604, 2.794, 3.244]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="z"
          castShadow
          receiveShadow
          geometry={nodes.z.geometry}
          material={materials.Keyboard}
          position={[-13.132, 2.724, 3.234]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="x"
          castShadow
          receiveShadow
          geometry={nodes.x.geometry}
          material={materials.Keyboard}
          position={[-10.351, 2.724, 3.234]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="c"
          castShadow
          receiveShadow
          geometry={nodes.c.geometry}
          material={materials.Keyboard}
          position={[-7.57, 2.724, 3.234]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="v"
          castShadow
          receiveShadow
          geometry={nodes.v.geometry}
          material={materials.Keyboard}
          position={[-4.789, 2.724, 3.234]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="b"
          castShadow
          receiveShadow
          geometry={nodes.b.geometry}
          material={materials.Keyboard}
          position={[-2.008, 2.724, 3.234]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="n"
          castShadow
          receiveShadow
          geometry={nodes.n.geometry}
          material={materials.Keyboard}
          position={[0.773, 2.724, 3.234]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="m"
          castShadow
          receiveShadow
          geometry={nodes.m.geometry}
          material={materials.Keyboard}
          position={[3.554, 2.724, 3.234]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="comma"
          castShadow
          receiveShadow
          geometry={nodes.comma.geometry}
          material={materials.Keyboard}
          position={[6.335, 2.724, 3.234]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="dot"
          castShadow
          receiveShadow
          geometry={nodes.dot.geometry}
          material={materials.Keyboard}
          position={[9.116, 2.724, 3.234]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="question"
          castShadow
          receiveShadow
          geometry={nodes.question.geometry}
          material={materials.Keyboard}
          position={[11.897, 2.724, 3.234]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
        <mesh
          name="shift_right"
          castShadow
          receiveShadow
          geometry={nodes.shift_right.geometry}
          material={materials.Keyboard}
          position={[17.054, 2.807, 3.246]}
          rotation={[-1.476, 0, 0]}
          scale={0.258}
        />
      </group>
    </>
  );
}

useGLTF.preload("/keyboard-com.glb");
