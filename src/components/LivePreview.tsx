import { ExternalLink, Globe } from 'lucide-react';

interface LivePreviewProps {
  url?: string;
  cover?: string;
  title: string;
}

const LivePreview = ({ url, cover, title }: LivePreviewProps) => {
  const hasUrl = url && url !== '#' && url.startsWith('http');
  const Wrapper: React.ElementType = hasUrl ? 'a' : 'div';
  const wrapperProps = hasUrl
    ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <div className="max-w-2xl">
      <Wrapper
        {...wrapperProps}
        className="group relative block glass-card p-0 overflow-hidden"
      >
        {/* 16:9 cover */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
          {cover ? (
            <img
              src={cover}
              alt={`${title} cover`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
              }}
            >
              <Globe className="w-10 h-10 text-primary/60" />
            </div>
          )}

          {/* Gradient veil */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* CTA */}
          <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between">
            <div className="text-white">
              <p className="text-xs uppercase tracking-[0.2em] opacity-70 mb-1">
                {hasUrl ? 'Live site' : 'Preview unavailable'}
              </p>
              <p className="font-semibold text-lg leading-tight">{title}</p>
            </div>
            {hasUrl && (
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                style={{
                  background: 'var(--gradient-primary)',
                  color: 'hsl(var(--primary-foreground))',
                  boxShadow: '0 0 24px hsl(83 100% 59% / 0.35)',
                }}
              >
                View Live
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default LivePreview;
