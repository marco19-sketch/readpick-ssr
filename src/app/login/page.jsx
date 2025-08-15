"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/styles/auth.css";
import { useTranslation } from "react-i18next";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { auth, signInWithEmailAndPassword } from "@/firebase/firebase";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function Login({ setLogin, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { t } = useTranslation();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const mobileBg = '/assets/images/girl-907x700.avif';
  const desktopBg = "/assets/images/girl-1280-cropped.avif";

  const handleVisibility = useCallback(() => {
    setPasswordVisibility(!passwordVisibility);
  }, [passwordVisibility]);

  const handleLogin = async e => {
    e.preventDefault();

    if (!email || !password) {
      setError(
        t("missingCredentials", { defaultValue: "Inserisci email e password" })
      );
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
      console.error("error", err);
      setError(
        t("loginError", {
          error: err.message,
          defaultValue: "Credenziali errate",
        })
      );
    }
  };

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
          <h2 className="auth-header">{t("login")}</h2>
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
            {t("login", { defaultValue: "Accedi" })}
          </button>
          {login && (
            <p className="auth-success">
              {t("loggedSuccess", { defaultValue: "Accesso in corso..." })}
            </p>
          )}
          {error && (
            <p className="auth-error" style={{ color: "red" }}>
              {error}
            </p>
          )}
        </form>

        <Link className="auth-link" href="/resetPassword">
          {t("forgotPassword", { defaultValue: "Password dimenticata?" })}
        </Link>

        <p className="auth-p-link">
          {t("noAccount") || "Non hai un account?"}{" "}
          <Link className="auth-nav-link" href="/register">
            {t("signIn", { defaultValue: "Registrati" })}
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
