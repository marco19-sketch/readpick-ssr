import { useCallback } from "react";
import { loadFullAuthFunctions } from "../firebaseFullLoader";
import { loadMinimalAuth } from "@/firebase/firebase";

export default function useLazyFirebaseAuth() {
  const loadAuthFunction = useCallback(async funcName => {
    const fullAuth = await loadFullAuthFunctions();
    const func = fullAuth[funcName];
    if (typeof func !== "function") {
      throw new Error(`Firebase auth function "${funcName}" not found`);
    }
    // Ensure minimal auth instance is available (singleton)
    const { auth } = await loadMinimalAuth();
    return { auth, func };
  }, []);

  return loadAuthFunction;
}
