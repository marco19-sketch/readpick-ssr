// src/app/components/NavBar.jsx
"use client";
import { useContext } from "react";
import { AppContext } from "../RootClientWrapper";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { useLogout } from "./hooks/useLogout";
import useIsMobile from "./hooks/useIsMobile";
import "@/styles/NavBar.css";

export default function NavBar() {
  const { login, setLogin, favorites } = useContext(AppContext);
  const logout = useLogout();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { t } = useTranslation();

  const isLoginPage = pathname === "/login";

  return (
    <nav>
      <Link
        href="/"
        className={pathname === "/" ? "home-active-link" : "home"}
        aria-label="link to home page">
        {isMobile ? <FaHome /> : "Home"}
      </Link>

      <Link
        href="/favorites"
        className={
          pathname === "/favorites" ? "favorites-active-link" : "favorites"
        }
        aria-label="link to favorites page">
        {isMobile ? (
          <MdFavorite />
        ) : (
          `${t("favorites")} (${(favorites || []).length})`
        )}
      </Link>

      {login ? (
        <button
          className="logout"
          aria-label={t("logout")}
          onClick={() => {
            logout();
            setLogin(false);
          }}>
          {isMobile ? <IoLogOut /> : t("logout") || "Esci"}
        </button>
      ) : isLoginPage ? null : (
        <Link href="/login" className="login" aria-label={t("login")}>
          {isMobile ? <IoLogIn /> : t("login", { defaultValue: "Accedi" })}
        </Link>
      )}
    </nav>
  );
}
