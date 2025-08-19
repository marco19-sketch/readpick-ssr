import "@/styles/auth.css";
import { Suspense } from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPasswordPage() {
  const mobileBg = "/assets/images/susan-700x394.avif";
  const desktopBg = "/assets/images/susan-1920.avif";

  return (
    <>
      <img
        className="auth-bg-auto-size"
        src={mobileBg}
        srcSet={`${mobileBg} 700w, ${desktopBg} 1280w`}
        sizes="(max-width: 640px) 100vw, 1280px"
        alt=""
        aria-hidden="true"
        decoding="auto"
      />
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}
