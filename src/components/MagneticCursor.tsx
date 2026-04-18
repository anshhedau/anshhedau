import { useEffect, useRef } from 'react';

const HOVER_SELECTOR = 'a, button, [role="button"], .project-card, .skill-tag, summary, label, input[type="submit"]';

const MagneticCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      const el = ringRef.current;
      if (el) el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      raf.current = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest?.(HOVER_SELECTOR)) ringRef.current?.classList.add('is-hover');
    };
    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest?.(HOVER_SELECTOR)) ringRef.current?.classList.remove('is-hover');
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />;
};

export default MagneticCursor;
