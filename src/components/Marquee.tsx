import { Star } from 'lucide-react';

const items = [
  'Design × Code',
  'Built with banana energy 🍌',
  'Pixel-obsessed',
  'Ship beautiful things',
  'Lovable Cloud',
  'Studio of one',
  'India → Everywhere',
  'Available for freelance',
];

const Marquee = () => {
  const loop = [...items, ...items, ...items];
  return (
    <section
      aria-hidden="true"
      className="relative py-8 border-y overflow-hidden"
      style={{
        borderColor: 'hsl(var(--glass-border))',
        background: 'linear-gradient(90deg, hsl(var(--background)) 0%, hsl(var(--card) / 0.4) 50%, hsl(var(--background)) 100%)',
      }}
    >
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {loop.map((t, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-2xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              {t}
            </span>
            <Star className="w-5 h-5 text-primary flex-shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
