// app/updatePassword/page.js

// Questo è un Server Component di default
import { Suspense } from "react";

// Importa il tuo componente client-side che usa useSearchParams
import UpdatePassword from "../components/UpdatePassword";

// Il "fallback" è quello che viene mostrato mentre il componente client si sta caricando
// Puoi usare un semplice testo, un loader, o un componente di fallback più complesso
export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={<div>Caricamento...</div>}>
      <UpdatePassword />
    </Suspense>
  );
}
