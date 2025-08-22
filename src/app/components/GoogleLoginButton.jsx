"use client";

import { signInWithGoogle } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AppContext } from "./AppContextProvider";
// import { onAuthStateChanged } from "firebase/auth";

export default function GoogleLoginButton({ error }) {
  const router = useRouter();
  const { setLogin, loading, setLoading } = useContext(AppContext);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle(); // redirect flow
      setLogin(true);
      setTimeout(() => {
        router.push("/");
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Google sign-in failed: ", error);
      setLoading(false);
    }
  };

  return (
    <button
      className="google-btn"
      onClick={handleGoogleSignIn}
      disabled={loading && error === ""}>
      <span className="google-span">
        <FcGoogle className="google-icon" />
      </span>{" "}
      test text
      {/* {t("googleSingIn", { defaultValue: "Accedi con Google" })} */}
    </button>
  );
}
