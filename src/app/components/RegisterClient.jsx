"use client";

import { useState, useCallback, useContext } from "react";
import { AppContext } from './AppContextProvider';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validatePassword } from "../../utils/validatePassword";
import "@/styles/auth.css";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { auth, createUserWithEmailAndPassword } from "@/firebase/firebase";
import translation from '@/locales/translation';

export default function RegisterClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const router = useRouter();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { rules, isValid } = validatePassword(password);
  const { setLogin, italian } = useContext(AppContext);

  // const register = italian ? 'Registrati' : 'Sign in';
  // const placeholder = italian ? 'Inserisci una password forte' : 'Input a strong password';
  // const createAccount = italian ? 'Crea account' : 'Create account';
  // const chars8 = italian ? 'Usa password di min. 8 caratteri' : 'Use 8 characters min. password';
  // const registerSuccess = italian ? 'Registrazione andata a buon fine e accesso eseguito.' : 'Sign in successful you are logged in.';
  // const accountAlready = italian ? 'Hai già un account?' : 'Have already an account?';
  // const loginNow = italian ? 'Accedi' : 'Log in';
  
  const lang = italian ? translation.it : translation.en;

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
    <div className="auth-page">
      <form onSubmit={handleRegister} className="auth-form">
        <h2 className="auth-header">{lang.register}</h2>
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
            placeholder={lang.placeholder}
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
              {rules.length ? "✅" : "❌"} {lang.chars8}
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
          {lang.createAccount}
        </button>
        {error && (
          <p className="auth-error" style={{ color: "red" }}>
            {lang.error}
          </p>
        )}
        {success && <p className="auth-success">{registerSuccess}</p>}
        <p className="auth-p-link">
          {lang.accountAlready}{" "}
          <Link className="auth-nav-link" href="/login">
            {lang.loginNow}
          </Link>
        </p>
      </form>
    </div>
  );
}
