import Image from "next/image";
// import "@/styles/splash.css";

export default function SplashScreen() {
  return (
    <>
      <div className="layout-container splash">
        {/* <Image
          src="/assets/images/laurentiu-1920-rot.jpg"
          sizes="(max-width: 480px) 480px,
         (max-width: 768px) 768px,
         (max-width: 1024px) 1024px,
         (max-width: 1600px) 1600px,
         1920px"
          height="2560"
          width="1920"
          alt=""
          aria-label="splash-page"
          className="layout-main-content background"
          decoding="async"
          priority="true"
        /> */}
        <h1 className="splash-title">WELCOME</h1>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6">
          <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
        </svg>
        <h2 className="splash-subtitle">
          to Read Pick<span className="dot-1">.</span>
          <span className="dot-2">.</span>
          <span className="dot-3">.</span>
        </h2>
      </div>
      {/* <style>{`
        .splash-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.849);
  border-radius: 5px;
  cursor: progress;
}

.splash-subtitle {
  position: absolute;
  top: 57%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.849);
  cursor: progress;
}

.layout-main-content.background {
  margin: 1vh auto;
  position: fixed;
  width: auto;
  height: 98vh;
  max-height: 98%;
  object-fit: cover;
  cursor: progress;
}

.dot-1 {
  color: white;
  animation: dot-flash 1.5s 1s infinite ;
}

.dot-2 {
  color: white;
 animation: dot-flash 1.5s 0.5s infinite ;
}

.dot-3 {
  color: white;
  animation: dot-flash 1.5s  infinite ;
}

@keyframes dot-flash {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@media screen and (min-width: 600px) {
  .layout-main-content.background {
    width: 100vw;
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
}
`}</style> */}
      <style>{`
      .layout-container.splash {
    /* background-image: radial-gradient(var(--text-color), var(--main-color)); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-shadow: var(--shadow);
    background-color: rgba(65, 59, 44, 1);
    width: 96vw;
    height: 96vh;
    margin: 2vh auto;
}


.splash-title {
  /* position: absolute; */
  /* top: 50%;
  left: 50%;
  transform: translateX(-50%); */
  /* background-color: rgba(0, 0, 0, 0.849); */
  color: var(--main-color);
  border-radius: 5px;
  cursor: progress;
}

.splash-subtitle {
  /* position: absolute;
  top: 57%;
  left: 50%;
  transform: translateX(-50%); */
  color: white;
  /* background-color: rgba(0, 0, 0, 0.849); */
  cursor: progress;
  color: var(--main-color);
}

.size-6 {
/* .layout-main-content.background { */
  margin: 1vh auto;
  /* position: fixed; */
  width: 40%;
  height: 40vh;
  /* object-fit: cover; */
  cursor: progress;
  font-size: 5rem;
  filter: drop-shadow(var(--shadow));
  color: var(--main-color);
}

.dot-1 {
  color: white;
  animation: dot-flash 1.5s 1s infinite ;
  text-shadow: inherit;
  color: var(--main-color);
}

.dot-2 {
  color: white;
 animation: dot-flash 1.5s 0.5s infinite ;
 text-shadow: inherit;
 color: var(--main-color);
}

.dot-3 {
  color: white;
  animation: dot-flash 1.5s  infinite ;
  text-shadow: inherit;
  color: var(--main-color);
}

@keyframes dot-flash {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@media screen and (min-width: 600px) {
  .layout-main-content.background {
    width: 100vw;
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
}
`}</style>
    </>
  );
}
