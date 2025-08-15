"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validatePassword } from "../../utils/validatePassword";
import "@/styles/auth.css";
import mobileBg from "../../assets/images/book-813x711.avif";
import desktopBg from "../../assets/images/book-1280.avif";
import { useTranslation } from "react-i18next";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { auth, createUserWithEmailAndPassword } from "@/firebase/firebase";

export default function Register({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { rules, isValid } = validatePassword(password);

  const handleVisibility = useCallback(() => {
    setPasswordVisibility(!passwordVisibility);
  }, [passwordVisibility]);

  const handleRegister = async e => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);

      setSuccess(true);
      setLogin(true);
      router.push("/"); // navigate to homepage after registration
      // Firebase automatically logs in after registration
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-background">
      <img
        className="auth-bg-auto-size"
        src={mobileBg}
        srcSet={`${mobileBg} 813w, ${desktopBg} 1280w`}
        sizes="(max-width: 640px) 100vw, 1280px"
        alt=""
        aria-hidden="true"
        decoding="auto"
      />
      <div className="auth-page">
        <form onSubmit={handleRegister} className="auth-form">
          <h2 className="auth-header">
            {t("register", { defaultValue: "Registrati" })}
          </h2>
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <div className="auth-input-container">
            <input
              className="auth-input password"
              type={passwordVisibility ? "text" : "password"}
              placeholder={t("passRegister", {
                defaultValue: "Inserisci una password forte...",
              })}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
            />
            <button
              className="auth-toggle-visibility"
              type="button"
              onClick={handleVisibility}>
              {passwordVisibility ? <IoEye /> : <IoMdEyeOff />}
            </button>
          </div>
          {passwordTouched && (
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ color: rules.length ? "green" : "red" }}>
                {rules.length ? "✅" : "❌"}{" "}
                {t("8chars", { defaultValue: "Almeno 8 caratteri" })}
              </li>
            </ul>
          )}
          <br />
          <button className="auth-btn" type="submit" disabled={!isValid}>
            {t("createAccount", { defaultValue: "Crea account" })}
          </button>
          {error && (
            <p className="auth-error" style={{ color: "red" }}>
              {error}
            </p>
          )}
          {success && (
            <p className="auth-success">
              {t("regSuccess", {
                defaultValue:
                  "Registrazione avvenuta con successo! Sei connesso. ",
              })}
            </p>
          )}
          <p className="auth-p-link">
            {t("alreadyAccount", { defaultValue: "Hai già un account?" })}{" "}
            <Link className="auth-nav-link" href="/login">
              {t("login")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
