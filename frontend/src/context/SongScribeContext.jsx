import { createContext, useContext } from "react";
import useSongScribe from "../hooks/useSongScribe";

const SongScribeContext = createContext(null);

export function SongScribeProvider({ children }) {
  const songScribe = useSongScribe();

  return <SongScribeContext.Provider value={songScribe}>{children}</SongScribeContext.Provider>;
}

export function useSongScribeContext() {
  const context = useContext(SongScribeContext);

  if (!context) {
    throw new Error("useSongScribeContext must be used inside SongScribeProvider.");
  }

  return context;
}
