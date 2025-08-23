import Image from 'next/image';
import '@/styles/splash.css';

export default function SplashScreen() {
    return (
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
    );
}