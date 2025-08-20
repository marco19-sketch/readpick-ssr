"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import "@/styles/auth.css";
import { auth, sendPasswordResetEmail } from "@/firebase/firebase";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [msgGreen, setMsgGreen] = useState(false);
  const { t } = useTranslation();
  const mobileBg = "/assets/images/susan-700x394.avif";
  const desktopBg = "/assets/images/susan-1920.avif";

  const resetPassword = async email => {
    const actionCodeSettings = {
      url: `${window.location.origin}/update-password`, // dynamic link to the app
      handleCodeInApp: true
    };
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || error.toString() };
    }
  };
 

  const handleSubmit = async e => {
    e.preventDefault();
    const { success, error } = await resetPassword(email);
    if (success) {
      setMsgGreen(true);
      setMessage(
        t("passwordSent", {
          defaultValue: `Email inviata, controlla la posta in arrivo`,
        })
      );
    } else {
      setMsgGreen(false);
      setMessage(
        t("invalidEmail", { error, defaultValue: `Email non valida. ${error}` })
      );
    }
  };

  return (
    <div className="auth-background">
      <img
        className="auth-bg-auto-size"
        src={mobileBg}
        srcSet={`${mobileBg} 700w, ${desktopBg} 1280w`}
        sizes="(max-width: 640px) 100vw, 1280px"
        alt=""
        aria-hidden="true"
        decoding="auto"
      />
      <div className="auth-page">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-header">
            {t("resetPassword") || "Reimposta password"}
          </h2>
          <input
            className="auth-input"
            type="email"
            required
            placeholder={t("enterEmail", {
              defaultValue: "Inserisci email...",
            })}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="auth-btn" type="submit">
            {t("sendEmail", { defaultValue: "Invia email " })}
          </button>
        </form>

        {message && (
          <p className={`auth-${msgGreen ? "success" : "error"}`}>{message}</p>
        )}
      </div>
    </div>
  );
}
