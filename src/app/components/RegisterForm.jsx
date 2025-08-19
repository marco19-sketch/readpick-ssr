"use client";

import { useState, useCallback, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validatePassword } from "../../utils/validatePassword";
import "@/styles/auth.css";
import { useTranslation } from "react-i18next";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { auth, createUserWithEmailAndPassword } from "@/firebase/firebase";
import { AppContext } from "@/app/RootClientWrapper";

export default function RegisterForm() {
  // export default function Register({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { rules, isValid } = validatePassword(password);
  // const mobileBg = "/assets/images/book-813x711.avif";
  // const desktopBg = "/assets/images/book-1280.avif";
//   const { mounted, setLogin } = useContext(AppContext);

  const register = t("register", { defaultValue: "Registrati" });
  const placeholder =
     t("passRegister", {
        defaultValue: "Inserisci una password forte...",
      })
    ;
  const createAccount =  t("createAccount", { defaultValue: "Crea account" })
    ;
  const chars8 =  t("8chars", { defaultValue: "Almeno 8 caratteri" })
    ;
  const registerSuccess = 
     t("regSuccess", {
        defaultValue: "Registrazione avvenuta con successo! Sei connesso. ",
      })
    ;
  const accountAlready =
    t("alreadyAccount", { defaultValue: "Hai già un account?" })
    ;
  const loginNow =  t("login", { defaultValue: "Accedi" });

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
      {/* <img
        className="auth-bg-auto-size"
        src={mobileBg}
        srcSet={`${mobileBg} 813w, ${desktopBg} 1280w`}
        sizes="(max-width: 640px) 100vw, 1280px"
        alt=""
        aria-hidden="true"
        decoding="auto"
      /> */}
      <div className="auth-page">
        <form onSubmit={handleRegister} className="auth-form">
          <h2 className="auth-header">{register}</h2>
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
              placeholder={placeholder}
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
                {rules.length ? "✅" : "❌"} {chars8}
              </li>

              {/* <li style={{ color: rules.uppercase ? "green" : "red" }}>
                {rules.uppercase ? "✅" : "❌"}{" "}
                {t("upperCase", {
                  defaultValue: "Almeno una lettera maiuscola",
                })}
              </li>
              <li style={{ color: rules.number ? "green" : "red" }}>
                {rules.number ? "✅" : "❌"}{" "}
                {t("number", { defaultValue: "Almeno un numero" })}
              </li>
              <li style={{ color: rules.symbol ? "green" : "red" }}>
                {rules.symbol ? "✅" : "❌"}{" "}
                {t("specialChar", {
                  defaultValue: "Almeno un carattere speciale (e.g. !, @, #)",
                })}
                (e.g. !, @, #)
              </li> */}
            </ul>
          )}
          <br />
          <button className="auth-btn" type="submit" disabled={!isValid}>
            {createAccount}
          </button>
          {error && (
            <p className="auth-error" style={{ color: "red" }}>
              {error}
            </p>
          )}
          {success && <p className="auth-success">{registerSuccess}</p>}
          <p className="auth-p-link">
            {accountAlready}{" "}
            <Link className="auth-nav-link" href="/login">
              {loginNow}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
