import { useNavigate } from 'react-router-dom';
import { FileText, ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface ProjectFile {
  cover: string;
  file: string;
  title?: string;
  caption?: string;
}

interface Props {
  files: ProjectFile[];
  projectTitle: string;
  projectSlug: string;
}

const ProjectFiles = ({ files, projectTitle, projectSlug }: Props) => {
  const navigate = useNavigate();
  if (!files.length) return null;

  return (
    <AnimatedSection>
      <div className="flex items-end justify-between mb-6 gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Documents · Decks · Assets
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-1" style={{ fontFamily: 'Fraunces, Syne, serif', letterSpacing: '-0.02em' }}>
            Files
          </h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {files.map((f, idx) => (
          <button
            key={idx}
            onClick={() =>
              navigate('/file', {
                state: {
                  fileUrl: f.file,
                  title: f.title || `${projectTitle} — File ${idx + 1}`,
                  projectTitle,
                  projectSlug,
                },
              })
            }
            className="glass-card p-0 overflow-hidden group block text-left w-full"
          >
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
              {f.cover ? (
                <img
                  src={f.cover}
                  alt={f.title || `${projectTitle} cover ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'hsl(var(--muted) / 0.4)' }}
                >
                  <FileText className="w-10 h-10" style={{ color: 'hsl(var(--muted-foreground))' }} />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
                <div className="text-white min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.25em] opacity-70 mb-1">Tap to open</p>
                  {f.title && <p className="font-semibold text-base leading-tight truncate">{f.title}</p>}
                </div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold flex-shrink-0 transition-all group-hover:scale-105"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'hsl(var(--primary-foreground))',
                  }}
                >
                  Open <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>

            {f.caption && (
              <div className="p-4">
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {f.caption}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default ProjectFiles;
