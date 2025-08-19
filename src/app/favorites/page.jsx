import "@/styles/Favorites.css";
import { Suspense } from "react";
import Favorites from "../components/Favorites";

export default function FavoritesPage() {
  // const mobileBgFav = "/assets/images/vitaly-girl-566x700.avif";
  const desktopBgFav = "/assets/images/vitaly-girl-1920.avif";

  return (
    <div className="favorites-page">
      <img
        src={desktopBgFav}
        // srcSet={`${mobileBgFav} 566w, ${desktopBgFav} 1920w`}
        sizes="(max-width: 640px) 100vw, 1920px"
        width='1920'
        height='1280'
        className="favorites-bg"
        alt=""
        aria-hidden="true"
      />
      <Suspense>
        <Favorites />
      </Suspense>
    </div>
  );
}
