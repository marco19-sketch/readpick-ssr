"use client";

import { useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";

export default function Footer() {
  useEffect(() => {
    // This will load the CSS asynchronously, Vite will handle hashed filename
    import("@/styles/Footer.css");
  }, []);

  return (
    <footer className="site-footer">
      <div className="media-credits">
        {" "}
        <p>
          Sound effects from{" "}
          <a
            href="https://www.zapsplat.com"
            target="_blank"
            rel="noopener noreferrer">
            ZapSplat
          </a>
        </p>
        <p>
          Photos by:
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="http://bit.ly/456zxY7">
            Tima Miroshnichenko
          </a>
        </p>
        <p>
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="http://bit.ly/3IMARbi">
            Vitaly Gariev
          </a>{" "}
          <a href="https://shorturl.at/AmiGB">Laurentiu Morariu</a>{' '}
          su{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="http://bit.ly/3IMB0LS">
            Unsplash
          </a>
        </p>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="http://bit.ly/41l7xPF">
          congerdesign
        </a>{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="http://bit.ly/45af4Da">
          Наталия Когут
        </a>{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="http://bit.ly/4fwohJl">
          Susan Q Yin
        </a>{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="http://bit.ly/47lYpOc">
          Jose Antonio Alba
        </a>{" "}
        <p>
          from{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="http://bit.ly/45s47vs">
            Pixabay
          </a>
        </p>
      </div>
      <div className="legals">
        <div className="legal-links">
          <a
            href="/legal/privacy-policy.html"
            target="_blank"
            rel="noopener noreferrer">
            Privacy Policy
          </a>
          <a
            href="/legal/terms-of-use.html"
            target="_blank"
            rel="noopener noreferrer">
            Terms of Use
          </a>

          <a
            href="/legal/copyright.html"
            target="_blank"
            rel="noopener noreferrer">
            Copyright
          </a>
        </div>
        <p className="copyright">© 2025 Marco Brusca. All rights reserved. </p>
        <a id="contact" href="mailto:marco19_70@hotmail.it" rel="me">
          <FaEnvelope /> Contattami
          {/* <FaEnvelope />{' '}{t('contact', {defaultValue: 'Contattami'})} */}
        </a>
      </div>
    </footer>
  );
}
