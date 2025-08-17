"use client";

import { useState, useCallback, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/styles/auth.css";
import { useTranslation } from "react-i18next";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import {
  auth,
  signInWithEmailAndPassword,
  //   getGoogleRedirectResult,
} from "@/firebase/firebase";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { AppContext } from "@/app/RootClientWrapper";
// import TestGoogleRedirect from "../components/TestGoogleRedirect";

export default function Login() {
  // export default function Login({ setLogin, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { t } = useTranslation();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  //   const [loading, setLoading] = useState(false);
  const mobileBg = "/assets/images/girl-907x700.avif";
  const desktopBg = "/assets/images/girl-1280-cropped.avif";
  const { mounted, setLogin, login, loading, setLoading } =
    useContext(AppContext);

  const label = mounted ? t("login", { defaultValue: "Accedi" }) : "";
  const forgotPass = mounted
    ? t("forgotPassword", { defaultValue: "Password dimenticata?" })
    : "";
  const noAccount = mounted
    ? t("noAccount", { defaultValue: "Non hai un account?" })
    : "";
  const singIn = mounted ? t("signIn", { defaultValue: "Registrati" }) : "";
  const loginSuccess = mounted
    ? t("loggedSuccess", { defaultValue: "Accesso in corso..." })
    : "";
  const missCredential = mounted
    ? t("missingCredentials", { defaultValue: "Inserisci email e password" })
    : "";

  const handleVisibility = useCallback(() => {
    setPasswordVisibility(!passwordVisibility);
  }, [passwordVisibility]);

  const handleLogin = async e => {
    e.preventDefault();

    if (!email || !password) {
      setError(missCredential);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);

      setLogin(true);
      setTimeout(() => {
        router.push("/"); // navigate to homepage
        setLoading(false);
      }, 2000);
    } catch (err) {
    //   console.error("error", err);
      setError(
        mounted
          ? t("loginError", {
              error: err.message,
              defaultValue: "Credenziali errate",
            })
          : "Credenziali errate"
      );
    }
  };

  //   useEffect(() => {
  //     async function handleRedirectResult() {
  //       const user = await getGoogleRedirectResult();
  //       console.log("getGoogle", getGoogleRedirectResult);
  //       if (user) {
  //         setLogin(true);
  //         router.push("/"); // ✅ redirect dopo login
  //       }
  //     }
  //     handleRedirectResult();
  //   }, [router, setLogin]);

  return (
    <div className="auth-background">
      <img
        className="auth-bg-auto-size"
        src={mobileBg}
        srcSet={`${mobileBg} 907w, ${desktopBg} 1280w`}
        sizes="(max-width: 640px) 100vw, 1280px"
        alt=""
        aria-hidden="true"
        decoding="auto"
      />

      <div className="auth-page">
        <form onSubmit={handleLogin} className="auth-form">
          <h2 className="auth-header">{label}</h2>

          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <br />
          <div className="auth-input-container">
            <input
              className="auth-input password"
              type={passwordVisibility ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              className="auth-toggle-visibility"
              type="button"
              onClick={handleVisibility}>
              {passwordVisibility ? <IoEye /> : <IoMdEyeOff />}
            </button>
          </div>
          <br />
          <button disabled={loading} className="auth-btn" type="submit">
            {label}
          </button>
          {login && <p className="auth-success">{loginSuccess}</p>}
          {error && (
            <p className="auth-error" style={{ color: "red" }}>
              {error}
            </p>
          )}
        </form>

        <Link className="auth-link" href="/resetPassword">
          {forgotPass}
        </Link>

        <p className="auth-p-link">
          {noAccount}{" "}
          <Link className="auth-nav-link" href="/register">
            {singIn}
          </Link>
        </p>
        <p className="oppure">oppure</p>
        <GoogleLoginButton
          loading={loading}
          setLoading={setLoading}
          setLogin={setLogin}
        />
       
      </div>
    </div>
  );
}
