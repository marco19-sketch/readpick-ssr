import "@/styles/Home.css";
import Image from "next/image";
import HomeClient from "./components/HomeClient";

export default function Home() {
  return (
    <>
      <style>{`
        :root {
          --main-color: rgb(224, 168, 46);
          --text-color: #530704;
          --shadow: 4px 4px 8px rgb(7, 6, 7);
          --overlay: rgba(0, 0, 0, 0.61);
        }

        html,
        body {
          height: 100%;
          overflow-x: hidden;
          min-width: 320px;
          margin: 0;
          display: flex;
          flex-direction: column;

          padding: 0;
        }

        /* Usa Flexbox sul contenitore del layout per disporre gli elementi in colonna */
        .layout-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh; /* Usa min-height per non forzare un'altezza fissa */
        }

        /* "allunga" il contenuto principale per riempire lo spazio vuoto */
        .layout-main-content {
          flex-grow: 1;
        }

        .root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .page-wrapper {
          flex: 1;
        }

        .italiano > img,
        .english > img {
          width: 20px;
          height: 16px;
        }

        .english,
        .italiano {
          background-color: var(--overlay);
          border-radius: 5px;
          width: 20px;
          height: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          transition: transform 0.2s ease, background-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .english.selected,
        .italiano.selected {
          border: 3px solid var(--main-color);
        }

        .italiano {
          position: fixed;
          top: 10px;
          left: 20px;
        }

        .english {
          position: fixed;
          top: 10px;
          left: 80px;
        }

        @media screen and (max-width: 500px) {
          .italiano,
          .english {
            transform: scale(0.8);
          }
        }

        @media screen and (max-width: 1000px) {
          .italiano {
            position: fixed;
            top: 35px;
            left: 0.5%;
            /* transform: scale(0.6); */
          }

          .english {
            position: fixed;
            top: 5px;
            left: 0.5%;
            /* transform: scale(0.6); */
          }
        }

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
          /* font-size: 4rem; */
          line-height: 1.1;
          margin: 60px auto 30px;
          height: 3.5rem;
          /* height: 4.5rem; */
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
