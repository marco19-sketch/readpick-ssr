"use client";

import { Suspense } from "react";
import AppContextProvider from "./components/AppContextProvider";

//testing
// import { useTranslation, I18nextProvider } from "react-i18next";
// import i18n from "../i18n-client";
// import NavBar from "./components/NavBar";
import { usePathname } from "next/navigation";



export default function RootClientWrapper({ children }) {
  // const { t } = useTranslation();
  const route = usePathname();
  const hideNavBarOnRoutes = ["/reset-password", "/update-password"];
  const showNavBar = !hideNavBarOnRoutes.includes(route);

  return (
    // <I18nextProvider i18n={i18n}>
      <AppContextProvider route={route}>
        {/* {showNavBar && <NavBar t={t} />} */}
        <main>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
      </AppContextProvider>
    // </I18nextProvider>
  );
}

// "use client";

// import { Suspense } from "react";
// import { useTranslation, I18nextProvider } from "react-i18next";
// import i18n from "../i18n";
// import NavBar from "./components/NavBar";
// import LanguageSwitcher from "./components/LanguageSwitcher";
// import BackToTop from "./components/BackToTop";
// import FooterLoader from "./components/FooterLoader";

// import SkipLink from "./components/SkipLink";
// import AppContextProvider from "./components/AppContextProvider";

// export default function RootClientWrapper({ children, route }) {

//   const { t } = useTranslation();
//   const hideNavBarOnRoutes = ["/reset-password", "/update-password"];
//   const showNavBar = !hideNavBarOnRoutes.includes(route);

//   return (
//     <I18nextProvider i18n={i18n}>
//       <AppContextProvider route={route}>
//         <div className="layout-container">
//           <SkipLink />
//           {showNavBar && <NavBar t={t} />}
//           <LanguageSwitcher />
//           <main id="main-content" className="layout-main-content">
//             <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
//           </main>
//           <BackToTop scrollContainerSelector="body" />
//           <FooterLoader />
//         </div>
//       </AppContextProvider>
//     </I18nextProvider>
//   );
// }
