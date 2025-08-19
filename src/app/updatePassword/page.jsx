import { Suspense } from "react";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import "@/styles/auth.css";

// Qui puoi definire le immagini, che vengono caricate dal server
const mobileBg = "/assets/images/leaves-640.avif";
const desktopBg = "/assets/images/leaves-1280.avif";

export default function UpdatePasswordPage() {
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
        {/* Usiamo <Suspense> per gestire il caricamento del componente client */}
        <Suspense fallback={<div>Caricamento modulo...</div>}>
          <UpdatePasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
