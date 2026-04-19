import { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Dedicated in-site file opener.
 * Opens with: navigate('/file', { state: { fileUrl, title, projectTitle, projectSlug } })
 * Or via query: /file?src=<url>&title=<t>
 *
 * Renders the file inside an embed/iframe with a premium chrome and footer.
 * Supports any browser-renderable file (PDF, images, video, audio, txt, etc.).
 * For non-renderable formats, shows a clean download CTA.
 */
const RENDERABLE_EXT = [
  'pdf', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'avif',
  'mp4', 'webm', 'mov', 'mp3', 'wav', 'ogg',
  'txt', 'md', 'json', 'csv', 'html'
];

const FileOpener = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const state = (location.state ?? {}) as {
    fileUrl?: string;
    title?: string;
    projectTitle?: string;
    projectSlug?: string;
  };

  const fileUrl = state.fileUrl || params.get('src') || '';
  const title = state.title || params.get('title') || 'Untitled file';
  const projectTitle = state.projectTitle || params.get('project') || '';
  const projectSlug = state.projectSlug || params.get('slug') || '';

  const ext = useMemo(() => {
    try {
      const u = new URL(fileUrl, window.location.origin);
      const path = u.pathname.toLowerCase();
      const m = path.match(/\.([a-z0-9]+)$/);
      return m ? m[1] : '';
    } catch {
      return '';
    }
  }, [fileUrl]);

  const canRender = RENDERABLE_EXT.includes(ext);
  const isImage = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'avif'].includes(ext);
  const isVideo = ['mp4', 'webm', 'mov'].includes(ext);
  const isAudio = ['mp3', 'wav', 'ogg'].includes(ext);

  const backHref = projectSlug ? `/projects/${projectSlug}` : '/#projects';

  return (
    <div className="min-h-screen flex flex-col bg-background noise-overlay">
      {/* Top chrome */}
      <header className="glass-nav sticky top-0 z-30 border-b" style={{ borderColor: 'hsl(var(--glass-border))' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-3">
          <button
            onClick={() => (window.history.length > 1 ? navigate(-1) : navigate(backHref))}
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex-1 min-w-0 text-center">
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {projectTitle || 'File preview'}
            </p>
            <p className="font-semibold truncate" style={{ fontFamily: 'Fraunces, Syne, serif' }}>
              {title}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {fileUrl && (
              <>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    border: '1px solid hsl(var(--glass-border))',
                    color: 'hsl(var(--foreground))',
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open
                </a>
                <a
                  href={fileUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'hsl(var(--primary-foreground))',
                  }}
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Viewer */}
      <main className="flex-1 relative">
        <div className="absolute inset-0 mesh-gradient pointer-events-none opacity-50" />
        <div className="relative max-w-7xl mx-auto p-4 md:p-6 h-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="glass-card overflow-hidden"
            style={{ minHeight: 'calc(100vh - 180px)' }}
          >
            {!fileUrl ? (
              <EmptyState message="No file specified." />
            ) : isImage ? (
              <div className="w-full h-full flex items-center justify-center p-4 md:p-8" style={{ minHeight: 'calc(100vh - 180px)' }}>
                <img src={fileUrl} alt={title} className="max-w-full max-h-full object-contain rounded-lg" />
              </div>
            ) : isVideo ? (
              <video src={fileUrl} controls className="w-full h-full" style={{ minHeight: 'calc(100vh - 180px)' }} />
            ) : isAudio ? (
              <div className="flex flex-col items-center justify-center gap-4 p-12" style={{ minHeight: 'calc(100vh - 180px)' }}>
                <FileText className="w-16 h-16 text-primary/60" />
                <audio src={fileUrl} controls className="w-full max-w-xl" />
              </div>
            ) : canRender ? (
              <iframe
                src={fileUrl}
                title={title}
                className="w-full bg-white"
                style={{ minHeight: 'calc(100vh - 180px)', border: 0 }}
              />
            ) : (
              <UnsupportedState fileUrl={fileUrl} ext={ext} />
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer note */}
      <footer className="py-4 text-center text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Ansh Hedau's file opener, designed mindfully for vast file support.
      </footer>
    </div>
  );
};

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center text-center p-12 gap-3" style={{ minHeight: 'calc(100vh - 180px)' }}>
    <FileText className="w-12 h-12 text-primary/60" />
    <p className="font-medium">{message}</p>
    <Link to="/" className="text-primary hover:underline text-sm">Go back home</Link>
  </div>
);

const UnsupportedState = ({ fileUrl, ext }: { fileUrl: string; ext: string }) => (
  <div className="flex flex-col items-center justify-center text-center p-12 gap-4" style={{ minHeight: 'calc(100vh - 180px)' }}>
    <FileText className="w-14 h-14 text-primary/60" />
    <div>
      <p className="font-semibold text-lg" style={{ fontFamily: 'Fraunces, serif' }}>Preview not supported in browser</p>
      <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {ext ? `.${ext} files` : 'This file'} can't be rendered inline. Download it to view.
      </p>
    </div>
    <a href={fileUrl} download className="btn-primary mt-2">
      <Download className="w-4 h-4" /> Download file
    </a>
  </div>
);

export default FileOpener;
