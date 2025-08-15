"use client";

import { AuthProvider } from "@/context/AuthProvider";
import "@/i18n"; // initialize i18n here

export default function ClientWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
