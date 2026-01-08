import { useEffect, useRef } from 'react';

export const useHeroAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const heroLines = containerRef.current?.querySelectorAll('.hero-title .line');
    if (heroLines) {
      heroLines.forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = 'all 700ms cubic-bezier(.2,.9,.3,1)';
        }, 220 + i * 160);
      });
    }
  }, []);

  return containerRef;
};

