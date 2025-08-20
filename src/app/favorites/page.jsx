import "@/styles/Favorites.css";
import { Suspense, lazy } from "react";
import Image from "next/image";
import FavoritesClient from '../components/FavoritesClient'

// Importa il Client Component in modo dinamico
// const Favorites = lazy(() => import("../components/Favorites"));

export default function FavoritesPage() {
  // const mobileBgFav = "/assets/images/vitaly-girl-566x700.avif";
  const desktopBgFav = "/assets/images/vitaly-girl-1920.avif";

  return (
    <div className="favorites-page">
      <Image
        src={desktopBgFav}
        // srcSet={`${mobileBgFav} 566w, ${desktopBgFav} 1920w`}
        sizes="(max-width: 640px) 100vw, 1920px"
        width='1920'
        height='1280'
        className="favorites-bg"
        alt=""
        aria-hidden="true"
        decoding='async'
      />
      <Suspense>
        <FavoritesClient />
      </Suspense>
    </div>
  );
}
