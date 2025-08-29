"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { auth, confirmPasswordReset } from "@/firebase/firebase";
import "@/styles/auth.css";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { validatePassword } from "../../utils/validatePassword";
import { AppContext } from "./AppContextProvider";

export default function UpdatePasswordClient() {
  const [newPassword, setNewPassword] = useState("");
  const [oobCode, setOobCode] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [message, setMessage] = useState(null);
  const [msgGreen, setMsgGreen] = useState(false);
  const { italian } = useContext(AppContext);

  const handleVisibility = useCallback(() => {
    setPasswordVisibility(prev => !prev);
  }, []);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (code) {
      setOobCode(code);
    } else {
      setMessage(
        italian
          ? "Codice reset non valido o mancante"
          : "Invalid or missing reset code"
      );
    }
  }, [searchParams]);

  const { isValid, errors } = validatePassword(newPassword);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!oobCode) {
      console.error(
        "Impossibile resettare la password. Il codice OOB è mancante."
      );
      return;
    }
    if (!isValid) {
      setMsgGreen(false);
      setMessage(italian ? "Crea password adeguata" : "Input strong password");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMsgGreen(true);
      setMessage(
        italian
          ? "Password aggiornata con successo. Reindirizzamento al log in..."
          : "Password reset successful. Redirecting to log in..."
      );

      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      setMsgGreen(false);
      console.error("Errore nel reset della password:", error);
      setMessage(italian ? 'Errore, riprova' : 'Error, try again');
      
    }
  };

  return (
    <div className="auth-page">
      {oobCode ? (
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-header">
            {italian ? 'Crea nouva password': 'Input new password'}
           
          </h2>
          <div className="auth-input-container">
            <input
              className="auth-input password"
              type={passwordVisibility ? "text" : "password"}
              placeholder={italian ? 'Inserisci nuova password' : 'Input new password'}
              
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              required
            />
            <button
              className="auth-toggle-visibility"
              type="button"
              onClick={handleVisibility}>
              {passwordVisibility ? <IoEye /> : <IoMdEyeOff />}
            </button>
          </div>

          {passwordTouched && !isValid && (
            <ul className="auth-rules">
              {errors.map((err, index) => (
                <li className="auth-msgs" key={index} style={{ color: "red" }}>
                  {err}
                </li>
              ))}
            </ul>
          )}

          <button className="auth-btn" type="submit">
            Update Password
          </button>

          {message && (
            <p className={`auth-${msgGreen ? "success" : "error"}`}>
              {message}
            </p>
          )}
        </form>
      ) : (
        <p>
          {italian ? 'Codice non valido o mancante' : 'Invalid or missing code'}
          
        </p>
      )}
    </div>
  );
}
