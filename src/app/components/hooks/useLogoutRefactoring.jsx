// src/hooks/useLogout.js
import { signOut } from "firebase/auth";
import { loadMinimalAuth } from "@/firebase/firebase";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { auth } = await loadMinimalAuth();
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return logout;
}
