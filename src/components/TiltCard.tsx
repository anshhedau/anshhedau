import { useRef, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

const TiltCard = ({ children, className = '', max = 8 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div className={`tilt-wrap ${className}`} onMouseMove={handleMove} onMouseLeave={reset}>
      <div ref={ref} className="tilt-inner h-full">
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
