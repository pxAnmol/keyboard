import { useEffect, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import useTextStore from "../store/store";
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
  const {
    addCharacter,
    removeCharacter,
    clearText,
    isCapsLockOn,
    toggleCapsLock,
  } = useTextStore();
  const previousState = useRef({});
  const keyTimers = useRef({});
  const keyRepeating = useRef({});
  const audioPool = useRef([]);
  const poolIndex = useRef(0);
  const keySoundPlaying = useRef({});

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      const audio = new Audio("/click.ogg");
      audio.volume = 0.3;
      audioPool.current.push(audio);
    }
  }, []);

  const playKeySound = (key) => {
    if (keySoundPlaying.current[key]) {
      return;
    }

    const audio = audioPool.current[poolIndex.current];
    if (audio) {
      keySoundPlaying.current[key] = true;

      audio.currentTime = 0;
      audio.play().catch(() => {});

      const handleSoundEnd = () => {
        keySoundPlaying.current[key] = false;
        audio.removeEventListener("ended", handleSoundEnd);
      };

      audio.addEventListener("ended", handleSoundEnd);
      setTimeout(() => {
        keySoundPlaying.current[key] = false;
      }, 200);

      poolIndex.current = (poolIndex.current + 1) % audioPool.current.length;
    }
  };

  const getCharacterForKey = (key, isShiftPressed) => {
    let character = keyToCharMap[key];

    if (letterKeys.includes(key)) {
      const shouldCapitalize = isShiftPressed !== isCapsLockOn;
      character = shouldCapitalize ? character.toUpperCase() : character;
    } else if (isShiftPressed && shiftKeyMap[key]) {
      character = shiftKeyMap[key];
    }

    return character;
  };

  const handleKeyAction = (key, isShiftPressed, playSound = false) => {
    if (playSound) {
      playKeySound(key);
    }

    if (key === "key_backspace") {
      removeCharacter();
    } else if (key === "key_esc") {
      clearText();
    } else if (key === "key_capslock") {
      toggleCapsLock();
      return;
    } else if (keyToCharMap[key]) {
      if ((key === "key_enter" || key === "key_tab") && !canAddText) {
        return;
      }

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
          handleKeyAction(key, isShiftPressed, false);
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
          handleKeyAction(key, isShiftPressed, true);
          if (
            key === "key_backspace" ||
            (keyToCharMap[key] && key !== "key_capslock")
          ) {
            startKeyRepeat(key, isShiftPressed);
          }
        } else if (!isPressed && wasPressed) {
          stopKeyRepeat(key);
          keySoundPlaying.current[key] = false;
        }
      }

      previousState.current[key] = isPressed;
    });
  }, [
    keyboardState,
    addCharacter,
    removeCharacter,
    clearText,
    canAddText,
    isCapsLockOn,
    toggleCapsLock,
  ]);

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
