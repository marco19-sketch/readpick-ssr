import { Suspense } from "react";
import HomePage from "./components/HomePage";
import "@/styles/Home.css";

export default function Home() {
  return (
    <>
      <img
        src="/assets/images/pexels-tima-768.avif"
        srcSet="/assets/images/pexels-tima-480.avif 480w, 
          /assets/images/pexels-tima-768.avif 768w,
          /assets/images/pexels-tima-1024.avif 1024w,
          /assets/images/pexels-tima-1600.avif 1600w,
          /assets/images/pexels-tima-1920.avif 1920w"
        sizes="(max-width: 480px) 480px,
         (max-width: 768px) 768px,
         (max-width: 1024px) 1024px,
         (max-width: 1600px) 1600px,
         1920px"
        alt=" "
        aria-hidden="true"
        className="home-bg"
        decoding="async"
        fetchPriority="high"
        loading="eager"
      />
      
      <Suspense>
        <HomePage />
      </Suspense>
    </>
  );
}
