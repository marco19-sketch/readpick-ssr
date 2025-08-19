import "@/styles/auth.css";
import { Suspense } from "react";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  const mobileBg = "/assets/images/book-813x711.avif";
  const desktopBg = "/assets/images/book-1280.avif";

  return (
    <>
      <img
        className="auth-bg-auto-size"
        src={mobileBg}
        srcSet={`${mobileBg} 813w, ${desktopBg} 1280w`}
        sizes="(max-width: 640px) 100vw, 1280px"
        alt=""
        aria-hidden="true"
        decoding="auto"
      />
      <Suspense>
        <RegisterForm />
      </Suspense>
    </>
  );
}
