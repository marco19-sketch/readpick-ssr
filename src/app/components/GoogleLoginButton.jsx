"use client";

import {
  signInWithGoogle
} from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { useContext, useEffect } from "react";
import { AppContext } from "@/app/RootClientWrapper";
// import { onAuthStateChanged } from "firebase/auth";

export default function GoogleLoginButton() {
  const router = useRouter();
  const { t } = useTranslation();
  const { setLogin, mounted, loading, setLoading } = useContext(AppContext);

  const logGoogle = mounted
    ? t("googleSingIn", { defaultValue: "Accedi con Google" })
    : "";

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle(); // redirect flow
      setLogin(true)
      setTimeout(() => {
        router.push('/');
        setLoading(false);
      }, 2000)
    } catch (error) {
      console.error("Google sign-in failed: ", error);
      setLoading(false);
    }
  };

  return (
    <button
      className="google-btn"
      onClick={handleGoogleSignIn}
      disabled={loading}>
      <span className="google-span">
        <FcGoogle className="google-icon" />
      </span>{" "}
      {logGoogle}
    </button>
  );
}
