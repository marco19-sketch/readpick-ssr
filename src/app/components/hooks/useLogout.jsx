// src/hooks/useLogout.js
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase"; // import auth directly
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return logout;
}
