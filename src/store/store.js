import { create } from "zustand";

const useTextStore = create((set) => ({
  text: "",
  addCharacter: (char) => set((state) => ({ text: state.text + char })),
  removeCharacter: () => set((state) => ({ text: state.text.slice(0, -1) })),
  clearText: () => set({ text: "" }),
  setText: (newText) => set({ text: newText }),
}));

export default useTextStore;
