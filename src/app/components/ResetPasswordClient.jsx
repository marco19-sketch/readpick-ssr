"use client";

import { useState, useContext } from "react";
import "@/styles/auth.css";
import { auth, sendPasswordResetEmail } from "@/firebase/firebase";
import { AppContext } from "./AppContextProvider";

export default function ResetPasswordClient() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [msgGreen, setMsgGreen] = useState(false);
  const { italian } = useContext(AppContext);

  const resetPassword = async email => {
    const actionCodeSettings = {
      url: `${window.location.origin}/update-password`, // dynamic link to the app
      handleCodeInApp: true,
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
        italian
          ? "Email inviata, controlla la posta in arrivo"
          : "Email sent, check you inbox"
      );
    } else {
      setMsgGreen(false);
      setMessage(
        `${italian ? "Email non valida" : "Invalid email"} ${error.message}`
      );
    }
  };

  return (
    // <div className="auth-background">

    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-header">
          {italian ? "Reimposta password" : "Reset password"}
        </h2>
        <input
          className="auth-input"
          type="email"
          required
          placeholder={italian ? "Inserisci email..." : "Enter email..."}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="auth-btn" type="submit">
          {italian ? "Invia email" : "Send email"}
        </button>
      </form>

      {message && (
        <p className={`auth-${msgGreen ? "success" : "error"}`}>{message}</p>
      )}
    </div>
  );
}
