'use client';
import { useEffect } from 'react';

export default function ViewportHeightFix() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh(); // run once on mount
    window.addEventListener('resize', setVh); // update on resize
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return null;
}
