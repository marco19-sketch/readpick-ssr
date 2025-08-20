
import "@/styles/auth.css";
import { Suspense, lazy } from "react";
import Image from "next/image";

// Importa il Client Component in modo dinamico
const ResetPasswordClient = lazy(() => import("../components/ResetPasswordClient"));

export default function ResetPasswordPage() {
  // const mobileBg = "/assets/images/susan-700x394.avif";
  const desktopBg = "/assets/images/susan-1920.avif";

  return (
    <div className="auth-background">
      <Image
        className="auth-bg-auto-size"
        src={desktopBg}
        // srcSet={`${mobileBg} 700w, ${desktopBg} 1280w`}
        sizes="(max-width: 640px) 100vw, 1920px"
        width='1920'
        height='1081'
        alt=""
        aria-hidden="true"
        decoding="async"
      />
      <Suspense>
        <ResetPasswordClient />
      </Suspense>
    </div>
  );
}
