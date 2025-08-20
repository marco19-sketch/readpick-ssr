import "@/styles/auth.css";
import { Suspense, lazy } from "react";
import Image from "next/image";

// Importa il Client Component in modo dinamico
const RegisterForm = lazy(() => import("../components/RegisterForm"));

export default function RegisterPage() {
  // const mobileBg = "/assets/images/book-813x711.avif";
  const desktopBg = "/assets/images/book-1920.avif";

  return (
    <div className="auth-background">
      <Image
        className="auth-bg-auto-size"
        src={desktopBg}
        // srcSet={`${mobileBg} 813w, ${desktopBg} 1280w`}
        sizes="(max-width: 640px) 100vw, 1280px"
        width="1920"
        height="1282"
        alt=""
        aria-hidden="true"
        decoding="async"
      />
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
