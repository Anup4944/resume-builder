import React, { useEffect, useState } from "react";

export default function useDimentions(
  containerRef: React.RefObject<HTMLElement>,
) {
  const [dimentions, setDimention] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const currentRef = containerRef.current;

    function getDimentions() {
      return {
        width: currentRef?.offsetWidth || 0,
        height: currentRef?.offsetHeight || 0,
      };
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimention(getDimentions());
      }
    });

    if (currentRef) {
      resizeObserver.observe(currentRef);
      setDimention(getDimentions());
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return dimentions;
}
