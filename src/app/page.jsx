import "@/styles/Home.css";
import Image from "next/image";
import HomeClient from "./components/HomeClient";


export default function Home() {
  

  return (
    <>
      <style>{`
       
        .home-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          display: block;
        }

        .home-page {
          position: relative;
          z-index: 1;
          min-height: 100vh;
        }

        .main-container {
          flex: 1;
        }

        h1.main-title {
          color: var(--main-color);
          background-color: transparent;
          text-align: center;
          text-shadow: var(--shadow);
          font-size: 3rem;
          line-height: 1.1;
          margin: 60px auto 30px;
          height: 3.5rem;
          position: relative;
          z-index: 1;
        }

        .trending-books {
          text-align: center;
          color: var(--main-color);
          text-shadow: var(--shadow);
          font-size: 2rem;
        }
      `}</style>
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
    </>
  );
}
