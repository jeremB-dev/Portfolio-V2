// src/hooks/useTheme.js
import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";

/**
 * Hook personnalisé pour accéder au contexte de thème
 * @returns {Object} - Contient darkMode et setDarkMode
 */
export default function useTheme() {
  return useContext(ThemeContext);
}
