"use client";

import { useState, useCallback, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/styles/auth.css";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { auth, signInWithEmailAndPassword } from "@/firebase/firebase";
import GoogleLoginButton from "./GoogleLoginButton";
import { AppContext } from "./AppContextProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { setLogin, login, loading, setLoading, italian } =
    useContext(AppContext);

  const label = italian ? "Accedi" : "Login";
  const forgotPass = italian ? "Password dimenticata?" : "Forgot password?";
  const noAccount = italian
    ? "Non hai un account?"
    : "Don't have an account yet?";
  const signIn = italian ? "Registrati" : "Sign in";
  const loginSuccess = italian ? "Accesso in corso..." : "Logging in...";
  const missCredential = italian
    ? "Inserisci email e password"
    : "Input email and password";

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
      console.error("error", err);
      setError(
        italian ? "Credenziali errate, riprova" : "Wrong credentials, retry"
      );
      setEmail("");
      setPassword("");
    }
  };

  return (
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
          {signIn}
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
  );
}
