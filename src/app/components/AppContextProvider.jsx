"use client";

import { useState, useEffect, createContext, useMemo } from "react";
import { useMinimalAuth } from "@/firebase/firebase";
import useGoogleAnalytics from "./hooks/useGoogleAnalytics";

export const AppContext = createContext();
export const AuthContext = createContext();

export default function AppContextProvider({ children, route }) {
  const { user, loadingAuth, isAuthInitialized } = useMinimalAuth();
  const [mounted, setMounted] = useState(false);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [italian, setItalian] = useState(true);

  useGoogleAnalytics();

  useEffect(() => {
    setMounted(true);
    setLogin(!!user);

    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    const savedBooks = localStorage.getItem("cachedBooks");
    if (savedBooks) {
      setFetchedBooks(JSON.parse(savedBooks));
    }
  }, [user]);

  useEffect(() => {
    if (mounted && favorites !== null) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, mounted]);

  useEffect(() => {
    if (mounted && fetchedBooks !== null) {
      localStorage.setItem("cachedBooks", JSON.stringify(fetchedBooks));
    }
  }, [fetchedBooks, mounted]);

  const authContextValue = useMemo(
    () => ({ user, loadingAuth, isAuthInitialized }),
    [user, loadingAuth, isAuthInitialized]
  );


 const toggleFavorite = book => {
   const isAlreadyFavorite = favorites.some(fav => fav.id === book.id);

   if (!isAlreadyFavorite) {
     // Aggiungi il libro se non è già tra i preferiti
     setFavorites(prev => [...prev, book]);
   } else {
     // Rimuovi il libro
     if (route === "/favorites") {
       // Se siamo nella pagina dei preferiti, aggiungi un effetto di rimozione
       setFavorites(prev =>
         prev.map(fav =>
            // questa riga aggiunge la classe 'removing' all elemento attuale per applicare css
           fav.id === book.id ? { ...fav, removing: true } : fav
         )
       );
       setTimeout(() => {
         setFavorites(prev => prev.filter(fav => fav.id !== book.id));
       }, 300);
     } else {
       // Altrimenti, rimuovi semplicemente il libro dall'array
       setFavorites(prev => prev.filter(f => f.id !== book.id));
     }
   }
 };



  const appStateValue = useMemo(
    () => ({
      loading,
      setLoading,
      login,
      setLogin,
      user,
      favorites,
      setFavorites,
      fetchedBooks,
      setFetchedBooks,
      toggleFavorite,
      italian,
      setItalian
    }),
    [
      loading,
      setLoading,
      login,
      setLogin,
      user,
      favorites,
      setFavorites,
      fetchedBooks,
      setFetchedBooks,
      toggleFavorite,
      italian,
      setItalian
    ]
  );

  if (!isAuthInitialized) {
    return <p>Loading authentication...</p>;
  }

  return (
    <AppContext.Provider value={appStateValue}>
      <AuthContext.Provider value={authContextValue}>
        {children}
      </AuthContext.Provider>
    </AppContext.Provider>
  );
}

