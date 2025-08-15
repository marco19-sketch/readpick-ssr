'use client'

import { signInWithGoogle } from "@/firebase/firebase";
import { useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton({ setLogin, loading, setLoading }) {
  const router = useRouter();
  const { t } = useTranslation();
 

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      setLogin(true);
      setTimeout(() => {
        router.push("/"); // ✅ replace navigate("/")
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Google sign-in failed: ", error);
    }
  };

  return (
    <>
      <button
        className="google-btn"
        onClick={handleGoogleSignIn}
        // aria-label={t("googleSingIn", { defaultValue: "Accedi con Google" })}
        disabled={loading}>
        {/* <button className='google-btn' onClick={signInWithGoogle}> */}
        <span className='google-span'>{<FcGoogle className='google-icon'/>}</span>{' '}
        {t("googleSingIn", { defaultValue: "Accedi con Google" })}
      </button>
      {/* {login && <p>Login successful, redirecting...</p>} */}
    </>
  );
}
