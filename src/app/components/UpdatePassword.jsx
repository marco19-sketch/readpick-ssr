"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { auth, confirmPasswordReset } from "@/firebase/firebase";
import "@/styles/auth.css";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { validatePassword } from "../../utils/validatePassword";
import { useTranslation } from "react-i18next";

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [oobCode, setOobCode] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleVisibility = useCallback(() => {
    setPasswordVisibility(prev => !prev);
  }, [passwordVisibility]);



  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (code) {
      setOobCode(code);
      console.log("Questa è la pagina updatePassword");
      console.log("Codice OOB trovato.");
    } else {
      console.error("Errore: Codice OOB non trovato nell'URL.");
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
      setMessage(
        t("fixPassword", { defaultValue: "Crea una password adeguata" })
      );
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      console.log("Successo: Password resettata con successo.");
      setTimeout(() => router.push("/login"), 3000);
      // Qui puoi aggiungere la logica di reindirizzamento
    } catch (error) {
      console.error("Errore nel reset della password:", error);
    }
  };

  return (
    <div>
      {oobCode ? (
        <form onSubmit={handleSubmit}>
          <h2 className="auth-header">
            {t("setNewPass", { defaultValue: "Crea nuova password" })}
          </h2>
          <input
            className="auth-input password"
            type={passwordVisibility ? "text" : "password"}
            placeholder={t("enterNewPass", {
              defaultValue: "Inserisci nuova password...",
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
          <button type="submit">Aggiorna Password</button>
        </form>
      ) : (
        <p>Codice non valido o mancante.</p>
      )}
    </div>
  );
}
