"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { auth, confirmPasswordReset } from "@/firebase/firebase";
import "@/styles/auth.css";

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [oobCode, setOobCode] = useState(null);

 
  const searchParams = useSearchParams();
  const router = useRouter();

   useEffect(() => {
    const code = searchParams.get("oobCode");
    if (code) {
      setOobCode(code);
      console.log("Codice OOB trovato.");
    } else {
      console.error("Errore: Codice OOB non trovato nell'URL.");
    }
  }, [searchParams]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!oobCode) {
      console.error(
        "Impossibile resettare la password. Il codice OOB è mancante."
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
      <h1>Minimal Password Reset Form</h1>
      {oobCode ? (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Inserisci nuova password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Aggiorna Password</button>
        </form>
      ) : (
        <p>Codice non valido o mancante.</p>
      )}
    </div>
  );
}
