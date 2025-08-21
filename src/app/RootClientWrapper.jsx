"use client";

import { Suspense } from "react";
import AppContextProvider from "./components/AppContextProvider";
import { usePathname } from "next/navigation";

//testing
import LanguageSwitcher from "./components/LanguageSwitcher";
import NavBar from "./components/NavBar";
import BackToTop from "./components/BackToTop";
import FooterLoader from "./components/FooterLoader";
import SkipLink from "./components/SkipLink";

export default function RootClientWrapper({ children }) {
  
  const route = usePathname();
  const hideNavBarOnRoutes = ["/reset-password", "/update-password"];
  const showNavBar = !hideNavBarOnRoutes.includes(route);

  return (
    
      <AppContextProvider route={route}>
        {" "}
        <div className="layout-container">
          <SkipLink />
          {showNavBar && <NavBar />}
          <LanguageSwitcher />{" "}
          <main id="main-content" className="layout-main-content">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>{" "}
          </main>
          <BackToTop scrollContainerSelector="body" />
          <FooterLoader />{" "}
        </div>{" "}
      </AppContextProvider>
   
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
