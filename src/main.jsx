import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";

const keyboardMap = [
  { name: "key_a", keys: ["KeyA", "a"] },
  { name: "key_b", keys: ["KeyB", "b"] },
  { name: "key_c", keys: ["KeyC", "c"] },
  { name: "key_d", keys: ["KeyD", "d"] },
  { name: "key_e", keys: ["KeyE", "e"] },
  { name: "key_f", keys: ["KeyF", "f"] },
  { name: "key_g", keys: ["KeyG", "g"] },
  { name: "key_h", keys: ["KeyH", "h"] },
  { name: "key_i", keys: ["KeyI", "i"] },
  { name: "key_j", keys: ["KeyJ", "j"] },
  { name: "key_k", keys: ["KeyK", "k"] },
  { name: "key_l", keys: ["KeyL", "l"] },
  { name: "key_m", keys: ["KeyM", "m"] },
  { name: "key_n", keys: ["KeyN", "n"] },
  { name: "key_o", keys: ["KeyO", "o"] },
  { name: "key_p", keys: ["KeyP", "p"] },
  { name: "key_q", keys: ["KeyQ", "q"] },
  { name: "key_r", keys: ["KeyR", "r"] },
  { name: "key_s", keys: ["KeyS", "s"] },
  { name: "key_t", keys: ["KeyT", "t"] },
  { name: "key_u", keys: ["KeyU", "u"] },
  { name: "key_v", keys: ["KeyV", "v"] },
  { name: "key_w", keys: ["KeyW", "w"] },
  { name: "key_x", keys: ["KeyX", "x"] },
  { name: "key_y", keys: ["KeyY", "y"] },
  { name: "key_z", keys: ["KeyZ", "z"] },
  { name: "key_0", keys: ["Digit0", "0"] },
  { name: "key_1", keys: ["Digit1", "1"] },
  { name: "key_2", keys: ["Digit2", "2"] },
  { name: "key_3", keys: ["Digit3", "3"] },
  { name: "key_4", keys: ["Digit4", "4"] },
  { name: "key_5", keys: ["Digit5", "5"] },
  { name: "key_6", keys: ["Digit6", "6"] },
  { name: "key_7", keys: ["Digit7", "7"] },
  { name: "key_8", keys: ["Digit8", "8"] },
  { name: "key_9", keys: ["Digit9", "9"] },
  { name: "key_space", keys: ["Space", " "] },
  { name: "key_shift_left", keys: ["ShiftLeft"] },
  { name: "key_shift_right", keys: ["ShiftRight"] },
  { name: "key_ctrl_left", keys: ["ControlLeft"] },
  { name: "key_ctrl_right", keys: ["ControlRight"] },
  { name: "key_alt_left", keys: ["AltLeft"] },
  { name: "key_alt_right", keys: ["AltRight"] },
  { name: "key_enter", keys: ["Enter"] },
  { name: "key_backspace", keys: ["Backspace"] },
  { name: "key_tab", keys: ["Tab"] },
  { name: "key_capslock", keys: ["CapsLock"] },
  { name: "key_esc", keys: ["Escape"] },
  { name: "key_win_left", keys: ["MetaLeft"] },
  { name: "key_win_right", keys: ["MetaRight"] },
  { name: "key_menu", keys: ["ContextMenu"] },
  { name: "key_dash", keys: ["Minus", "-"] },
  { name: "key_equals", keys: ["Equal", "="] },
  { name: "key_open_bracket", keys: ["BracketLeft", "["] },
  { name: "key_close_bracket", keys: ["BracketRight", "]"] },
  { name: "key_backslash", keys: ["Backslash", "\\"] },
  { name: "key_colon", keys: ["Semicolon", ";"] },
  { name: "key_quote", keys: ["Quote", "'"] },
  { name: "key_comma", keys: ["Comma", ","] },
  { name: "key_dot", keys: ["Period", "."] },
  { name: "key_question", keys: ["Slash", "/"] },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <KeyboardControls map={keyboardMap}>
      <Canvas
        camera={{fov: 50 }}
        gl={{ powerPreference: "high-performance", antialias: true }}
        shadows
      >
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </Canvas>
    </KeyboardControls>
  </StrictMode>
);
