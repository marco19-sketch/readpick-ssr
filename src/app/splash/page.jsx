import Image from "next/image";
// import "@/styles/splash.css";

export default function SplashScreen() {
  return (
    <>
      <div className="layout-container">
        <Image
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
        />
        <h1 className="splash-title">WELCOME</h1>
        <h2 className="splash-subtitle">
          to Read Pick<span className="dot-1">.</span>
          <span className="dot-2">.</span>
          <span className="dot-3">.</span>
        </h2>
      </div>
      <style>{`
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
`}</style>
    </>
  );
}
