import { useState } from 'react';
import { ExternalLink, Loader2, Globe } from 'lucide-react';

interface LivePreviewProps {
  url?: string;
  title: string;
}

const LivePreview = ({ url, title }: LivePreviewProps) => {
  const [loaded, setLoaded] = useState(false);
  const hasUrl = url && url !== '#' && url.startsWith('http');

  return (
    <div className="relative group">
      {/* Browser chrome */}
      <div className="glass-card p-0 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'hsl(var(--glass-border))' }}>
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 mx-4 px-3 py-1 rounded-md text-xs font-mono truncate"
            style={{ background: 'hsl(var(--background) / 0.6)', color: 'hsl(var(--muted-foreground))' }}>
            {hasUrl ? url : 'preview.unavailable'}
          </div>
          {hasUrl && (
            <a href={url} target="_blank" rel="noopener noreferrer"
              className="text-xs flex items-center gap-1 hover:text-primary transition-colors"
              style={{ color: 'hsl(var(--muted-foreground))' }}>
              <ExternalLink className="w-3 h-3" /> Open
            </a>
          )}
        </div>

        {/* 16:9 frame */}
        <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
          {hasUrl ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'hsl(var(--background))' }}>
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              )}
              <iframe
                src={url}
                title={`${title} live preview`}
                onLoad={() => setLoaded(true)}
                loading="lazy"
                className="absolute inset-0 w-full h-full bg-white"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6"
              style={{ background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'hsl(83 100% 59% / 0.1)', border: '1px solid hsl(83 100% 59% / 0.2)' }}>
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold mb-1">Live preview coming soon</p>
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  This project doesn't have a public URL yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
