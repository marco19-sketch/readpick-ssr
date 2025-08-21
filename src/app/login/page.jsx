import "@/styles/auth.css";
import { Suspense, lazy } from "react";
import Image from "next/image";
const desktopBg = "/assets/images/girl-1280-cropped.avif";

// Importa il Client Component in modo dinamico
const LoginClient = lazy(() => import("../components/LoginClient"));

export default function LoginPage() {
  // const mobileBg = "/assets/images/girl-907x700.avif";
  // const desktopBg = "/assets/images/girl-1280-cropped.avif";

  return (
    <div className="auth-background">
      <Image
        className="auth-bg-auto-size"
        src={desktopBg}
        // src={mobileBg}
        // srcSet={`${mobileBg} 907w, ${desktopBg} 1280w`}
        sizes="(max-width: 640px) 100vw, 1279px"
        alt=""
        // fill
        width='1279'
        height='827'
        aria-hidden='true'
        decoding="async"
      />

      <Suspense>
        <LoginClient />
      </Suspense>
    </div>
  );
}

