import { Suspense, lazy } from "react";
import "@/styles/auth.css";
import Image from "next/image";

// Importa il Client Component in modo dinamico
const UpdatePasswordClient = lazy(() => import("../components/UpdatePasswordClient"));

// Qui puoi definire le immagini, che vengono caricate dal server

const desktopBg = "/assets/images/leaves-1280.avif";

export default function UpdatePasswordPage() {
  return (
    <div className="auth-background">
      <Image
        className="auth-bg-auto-size"
        src={desktopBg}
        // srcSet={`${mobileBg} 907w, ${desktopBg} 1280w`}
        sizes="(max-width: 640px) 100vw, 1280px"
        alt=""
        width='1280'
        height='854'
        aria-hidden="true"
        decoding="async"
      />
      <div className="auth-page">
        {/* Usiamo <Suspense> per gestire il caricamento del componente client */}
        <Suspense fallback={<div>Caricamento modulo...</div>}>
          <UpdatePasswordClient />
        </Suspense>
      </div>
    </div>
  );
}
