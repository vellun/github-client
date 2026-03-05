import { createContext, useContext } from "react";

export interface BackgroundContextType {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

export const BackgroundContext = createContext<BackgroundContextType>({
  backgroundColor: "normal",
  setBackgroundColor: () => {},
});

export const useBackground = () => useContext(BackgroundContext);
