
import "@/styles/Home.css";
import Image from "next/image";
import HomeClient from "./components/HomeClient";



export default function Home() {
  return (
    <div className="home-page">
     
      <header>
        <h1 className="main-title">Read Pick</h1>
      </header>

      <Image
        src="/assets/images/pexelsTima1920.jpg"
        sizes="(max-width: 480px) 480px,
         (max-width: 768px) 768px,
         (max-width: 1024px) 1024px,
         (max-width: 1600px) 1600px,
         1920px"
        height="1280"
        width="1920"
        alt=" "
        aria-hidden="true"
        className="home-bg"
        decoding="async"
        priority="true"
      />

      <HomeClient />
    </div>
  );
}
