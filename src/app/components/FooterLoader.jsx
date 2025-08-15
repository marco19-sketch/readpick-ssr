'use client'

import { useState, useEffect } from "react";

function FooterLoader() {
  const [FooterComponent, setFooterComponent] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      
      import("./Footer").then(mod => {
        setFooterComponent(() => mod.default);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return FooterComponent ? <FooterComponent /> : null;
}

export default FooterLoader;
