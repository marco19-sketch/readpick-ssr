"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import "@/styles/FavoriteButton.css";

export default function FavoriteButton({ isFavorite, onToggle }) {
  const clickSoundRef = useRef(null);
  const removeSoundRef = useRef(null);
  const remove2SoundRef = useRef(null);
  const [soundsReady, setSoundsReady] = useState(false);

  const pathname = usePathname();
  const isFavoritesPage = pathname === "/favorites";

  // Preload audio when button is hovered
  const preloadSounds = () => {
    if (!soundsReady) {
      clickSoundRef.current = new Audio("/assets/add-to-favorite.mp3");
      removeSoundRef.current = new Audio("/assets/whoosh_zapsplat.mp3");
      remove2SoundRef.current = new Audio("/assets/zapsplat_soft_click.mp3");
      setSoundsReady(true);
    }
  };

  const handleToggle = () => {
    if (!soundsReady) return;

    const addSound = clickSoundRef.current;
    const removeSound = removeSoundRef.current;
    const remove2Sound = remove2SoundRef.current;

    if (!isFavorite && addSound) {
      addSound.currentTime = 0;
      addSound.play().catch(console.warn);
    } else if (isFavorite && isFavoritesPage && removeSound) {
      removeSound.currentTime = 0;
      removeSound.play().catch(console.warn);
    } else if (remove2Sound) {
      remove2Sound.currentTime = 0;
      remove2Sound.play().catch(console.warn);
    }

    onToggle?.();
  };

  return (
    <button
      className="favorite-btn"
      onClick={handleToggle}
      onMouseEnter={preloadSounds} // preload on hover
      onFocus={preloadSounds} // preload on keyboard focus
      aria-label={
        isFavorite ? ("Rimuovi dai favoriti") : ("Aggiungi ai favoriti")
        // ? t("removeFromFavorites", { defaultValue: "Rimuovi dai favoriti" })
        // : t("addToFavorites", { defaultValue: "Aggiungi ai favoriti" })
      }>
      <FaHeart className={`heart-icon ${isFavorite ? "active" : ""}`} />
    </button>
  );
}
