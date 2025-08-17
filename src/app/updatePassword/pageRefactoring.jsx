"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { validatePassword } from "../../utils/validatePassword";
import { useTranslation } from "react-i18next";
import "@/styles/auth.css";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { auth, confirmPasswordReset } from "@/firebase/firebase";



export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [message, setMessage] = useState(null);
  const [oobCode, setOobCode] = useState(null);
  const [msgGreen, setMsgGreen] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const mobileBg = "/assets/images/leaves-640.avif";
  const desktopBg = "/assets/images/leaves-1280.avif";

  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  const handleVisibility = useCallback(() => {
    setPasswordVisibility(prev => !prev);
  }, [passwordVisibility]);

  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (code) {
      setOobCode(code);
    } else {
      setMessage(
        t("invalidCode", { defaultValue: "Codice reset non valido o mancante" })
      );
    }
  }, [searchParams]);
  // }, [searchParams, t]);

  const { isValid, errors } = validatePassword(newPassword);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isValid) {
      setMsgGreen(false);
      setMessage(
        t("fixPassword", { defaultValue: "Crea una password adeguata" })
      );
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMsgGreen(true);
      setMessage(
        t("updateSuccess", {
          defaultValue:
            "Password aggiornata con successo. Reindirizzamento al login...",
        })
      );
      setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      setMsgGreen(false);
      setMessage(
        t("errorUpdating", { defaultValue: 'Errore riprova' })
        // t("errorUpdating", { defaultValue: `Errore: ${error.message}` })
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
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-header">
            {t("setNewPass", { defaultValue: "Crea nuova password" })}
          </h2>
          <div className="auth-input-container">
            <input
              className="auth-input password"
              type={passwordVisibility ? "text" : "password"}
              placeholder={t("enterNewPass", {
                defaultValue: "Inserisci nuova password..."
              })}
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
      </div>
    </div>
  );
}
