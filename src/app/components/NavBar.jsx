"use client";

import { useContext } from "react";
import { AppContext } from "./AppContextProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { useLogout } from "./hooks/useLogout";
import useIsMobile from "./hooks/useIsMobile";
import "@/styles/NavBar.css";

export default function NavBar() {
  const { login, setLogin, favorites, italian, setItalian } =
    useContext(AppContext);
  const logout = useLogout();
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  const loginBtnText = italian ? "Accedi" : "Login";
  // const loginBtnText = "Accedi";
  // const loginBtnText = t("login", { defaultValue: "Accedi" });

  return (
    <nav>
      <Link
        href="/"
        className={pathname === "/" ? "home-active-link" : "home"}
        aria-label={
          italian ? "Collegamento alla home page" : "link to home page"
        }>
        {isMobile ? <FaHome /> : "Home"}
      </Link>

      <Link
        href="/favorites"
        className={
          pathname === "/favorites" ? "favorites-active-link" : "favorites"
        }
        aria-label={
          italian
            ? "Collegamento alla pagina dei favoriti"
            : "link to favorites page"
        }>
        {isMobile ? (
          <MdFavorite />
        ) : (
          `${italian ? "Favoriti" : "Favorites"} ${(favorites || []).length}`
        )}
      </Link>

      {login ? (
        <button
          className="logout"
          aria-label={italian ? "Esci" : "Logout"}
          // aria-label={t("logout", { defaultValue: "Esci" })}
          onClick={() => {
            logout();
            setLogin(false);
          }}>
          {isMobile ? <IoLogOut /> : "Esci"}
          {/* {isMobile ? <IoLogOut /> : t("logout", { defaultValue: "Esci" })} */}
        </button>
      ) : isLoginPage ? null : (
        <Link href="/login" className="login" aria-label={loginBtnText}>
          {isMobile ? <IoLogIn /> : loginBtnText}
        </Link>
      )}
    </nav>
  );
}
