import { useEffect, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import useTextStore from "./store";
import {
  keyToCharMap,
  shiftKeyMap,
  letterKeys,
  ignoredKeys,
} from "../constants/keyMappings";

const INITIAL_DELAY = 500;
const REPEAT_INTERVAL = 50;
const BACKSPACE_REPEAT_INTERVAL = 30;

const useKeyboardInput = (canAddText = true) => {
  const keyboardState = useKeyboardControls((state) => state);
  const { addCharacter, removeCharacter, clearText } = useTextStore();
  const previousState = useRef({});
  const keyTimers = useRef({});
  const keyRepeating = useRef({});

  const getCharacterForKey = (key, isShiftPressed) => {
    let character = keyToCharMap[key];

    if (isShiftPressed) {
      if (letterKeys.includes(key)) {
        character = character.toUpperCase();
      } else if (shiftKeyMap[key]) {
        character = shiftKeyMap[key];
      }
    }

    return character;
  };

  const handleKeyAction = (key, isShiftPressed) => {
    if (key === "key_backspace") {
      removeCharacter();
    } else if (key === "key_esc") {
      clearText();
    } else if (keyToCharMap[key]) {
      if (canAddText) {
        const character = getCharacterForKey(key, isShiftPressed);
        addCharacter(character);
      }
    }
  };

  const startKeyRepeat = (key, isShiftPressed) => {
    if (keyTimers.current[key]) {
      clearTimeout(keyTimers.current[key]);
      clearInterval(keyTimers.current[key]);
    }

    keyTimers.current[key] = setTimeout(() => {
      keyRepeating.current[key] = true;

      const repeatInterval =
        key === "key_backspace" ? BACKSPACE_REPEAT_INTERVAL : REPEAT_INTERVAL;

      keyTimers.current[key] = setInterval(() => {
        if (keyboardState[key]) {
          handleKeyAction(key, isShiftPressed);
        } else {
          clearInterval(keyTimers.current[key]);
          keyRepeating.current[key] = false;
        }
      }, repeatInterval);
    }, INITIAL_DELAY);
  };

  const stopKeyRepeat = (key) => {
    if (keyTimers.current[key]) {
      clearTimeout(keyTimers.current[key]);
      clearInterval(keyTimers.current[key]);
      delete keyTimers.current[key];
    }
    keyRepeating.current[key] = false;
  };

  useEffect(() => {
    const isShiftPressed =
      keyboardState.key_shift_left || keyboardState.key_shift_right;

    Object.entries(keyboardState).forEach(([key, isPressed]) => {
      const wasPressed = previousState.current[key];

      if (!ignoredKeys.includes(key)) {
        if (isPressed && !wasPressed) {
          handleKeyAction(key, isShiftPressed);

          if (key === "key_backspace" || keyToCharMap[key]) {
            startKeyRepeat(key, isShiftPressed);
          }
        } else if (!isPressed && wasPressed) {
          stopKeyRepeat(key);
        }
      }

      previousState.current[key] = isPressed;
    });
  }, [keyboardState, addCharacter, removeCharacter, clearText, canAddText]);

  useEffect(() => {
    return () => {
      Object.values(keyTimers.current).forEach((timer) => {
        clearTimeout(timer);
        clearInterval(timer);
      });
    };
  }, []);
};

export default useKeyboardInput;
