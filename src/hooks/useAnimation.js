// src/hooks/useAnimation.js
import { useContext } from "react";
import { AnimationContext } from "../components/AnimationContext";

/**
 * Hook personnalisé pour accéder au contexte d'animation
 * @returns {Object} - Contient animationsEnabled et setAnimationsEnabled
 */
export default function useAnimation() {
  return useContext(AnimationContext);
}
