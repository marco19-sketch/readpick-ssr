"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { auth, confirmPasswordReset } from "@/firebase/firebase";
import "@/styles/auth.css";
// import { IoMdEyeOff } from "react-icons/io";
// import { IoEye } from "react-icons/io5";
import { validatePassword } from "../../utils/validatePassword";
import { useTranslation } from "react-i18next";
import Image from "next/image";
const desktopBg = "/assets/images/leaves-1280.avif";

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [oobCode, setOobCode] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [message, setMessage] = useState(null);
  const [msgGreen, setMsgGreen] = useState(false);

  const handleVisibility = useCallback(() => {
    setPasswordVisibility(prev => !prev);
  }, []);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (code) {
      setOobCode(code);
      console.log("Codice OOB trovato.");
    } else {
      setMessage(
        t("invalidCode", { defaultValue: "Codice reset non valido o mancante" })
      );
    }
  }, [searchParams, t]);

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
      console.log("Successo: Password resettata con successo.");
      setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      setMsgGreen(false);
      console.error("Errore nel reset della password:", error);
      setMessage(t("errorUpdating", { defaultValue: "Errore riprova" }));
    }
  };

  return (
    <div className="auth-background">
      <Image
        className="auth-bg-auto-size"
        src={desktopBg}
        // srcSet={`${mobileBg} 907w, ${desktopBg} 1280w`}
        sizes="(max-width: 640px) 100vw, 1280px"
        alt=""
        width="1280"
        height="854"
        aria-hidden="true"
        decoding="async"
      />
      <div className="auth-page">
        {oobCode ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="auth-header">
              {t("setNewPass", { defaultValue: "Crea nuova password" })}
            </h2>
            <div className="auth-input-container">
              <input
                className="auth-input password"
                type= "password"
                // type={passwordVisibility ? "text" : "password"}
                placeholder={t("enterNewPass", {
                  defaultValue: "Inserisci nuova password...",
                })}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                required
              />
              {/* <button
                className="auth-toggle-visibility"
                type="button"
                onClick={handleVisibility}>
                {passwordVisibility ? <IoEye /> : <IoMdEyeOff />}
              </button> */}
            </div>

            {passwordTouched && !isValid && (
              <ul className="auth-rules">
                {errors.map((err, index) => (
                  <li
                    className="auth-msgs"
                    key={index}
                    style={{ color: "red" }}>
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
            {t("invalidCode", {
              defaultValue: "Codice non valido o mancante.",
            })}
          </p>
        )}
      </div>
    </div>
  );
}
