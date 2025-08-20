"use client";

import { useState, useCallback, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/styles/auth.css";
// import { useTranslation } from "react-i18next";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import {
  auth,
  signInWithEmailAndPassword,
} from "@/firebase/firebase";
import GoogleLoginButton from "./GoogleLoginButton";
// import GoogleLoginButton from "../components/GoogleLoginButton";
import { AppContext } from "./AppContextProvider";
// import TestGoogleRedirect from "../components/TestGoogleRedirect";

export default function Login() {
  // export default function Login({ setLogin, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  // const { t } = useTranslation();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { setLogin, login, loading, setLoading } = useContext(AppContext);

  const label = 'test text';
  // const label = t("login", { defaultValue: "Accedi" });
  const forgotPass = 'test text'
  // const forgotPass = t("forgotPassword", {
  //   defaultValue: "Password dimenticata?",
  // });
  const noAccount = 'test text';
  // const noAccount = t("noAccount", { defaultValue: "Non hai un account?" });
  const singIn = 'test text';
  // const singIn = t("signIn", { defaultValue: "Registrati" });
  const loginSuccess = 'test text';
  // const loginSuccess = t("loggedSuccess", {
  //   defaultValue: "Accesso in corso...",
  // });
  const missCredential = 'test text'
  // const missCredential = t("missingCredentials", {
  //   defaultValue: "Inserisci email e password",
  // });
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
      }, 500);
    } catch (err) {
      //   console.error("error", err);
      setError('test text'
        // t("loginError", {
        //   defaultValue: "Credenziali errate, riprova",
        // })
      );
      setEmail("");
      setPassword("");
    }
  };

  return (
    // <div className="auth-background">
    //   <img
    //     className="auth-bg-auto-size"
    //     src={mobileBg}
    //     srcSet={`${mobileBg} 907w, ${desktopBg} 1280w`}
    //     sizes="(max-width: 640px) 100vw, 1280px"
    //     alt=""
    //     aria-hidden="true"
    //     decoding="auto"
    //   />

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
        <button
          disabled={loading && error === ""}
          className="auth-btn"
          type="submit">
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
        error={error}
        setLoading={setLoading}
        setLogin={setLogin}
      />
    </div>
    // </div>
  );
}
