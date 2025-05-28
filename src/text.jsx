import { Html } from "@react-three/drei";
import useTextStore from "./store/store";
import useKeyboardInput from "./store/useKeyboardInput";
import { useRef, useEffect, useState } from "react";

const Text = () => {
  const { text } = useTextStore();
  const cursorRef = useRef();
  const containerRef = useRef();
  const textRef = useRef();
  const [canAddText, setCanAddText] = useState(true);

  useKeyboardInput(canAddText);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const textHeight = textRef.current.scrollHeight;

      setCanAddText(textHeight <= containerHeight || text.length === 0);
    }
  }, [text]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity =
          cursorRef.current.style.opacity === "0" ? "1" : "0";
      }
    }, 530);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "1";
    }
  }, [text]);

  return (
    <Html
      position={[0, 1.175, -1.65]}
      rotation={[-Math.PI * 0.0, 0, 0]}
      transform={true}
      style={{
        height: "50px",
        width: "62px",
        maxWidth: "62px",
        background: "rgba(0, 0, 0, 0)",
        padding: "2px",
        fontFamily: "VT323, monospace",
        fontSize: "6px",
        color: "#ffffff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        ref={containerRef}
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <pre
          ref={textRef}
          style={{
            margin: 0,
            fontFamily: "inherit",
            fontSize: "inherit",
            color: "inherit",
            lineHeight: "1.2",
            display: "inline",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {text}
        </pre>
        <span
          ref={cursorRef}
          style={{
            color: "#ffffff70",
            fontSize: "inherit",
            fontFamily: "inherit",
          }}
        >
          |
        </span>
      </div>
    </Html>
  );
};

export default Text;
