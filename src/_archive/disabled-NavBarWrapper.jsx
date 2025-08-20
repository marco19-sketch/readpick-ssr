// src/app/components/NavBarWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function NavBarWrapper() {
  const pathname = usePathname();
  const hideNavBar = ["/resetPassword", "/updatePassword"].includes(pathname);

  return !hideNavBar ? <NavBar /> : null;
}
