import { useState, useEffect } from "react";

export default function useIsMobile(breakpoint = 681) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < breakpoint);

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
  }
}, [breakpoint]);

return isMobile;
}

//     const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [breakpoint]);

//   return isMobile;
// }
