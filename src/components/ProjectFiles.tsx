import { FileText, Download } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface ProjectFile {
  cover: string;
  file: string;
  title?: string;
  caption?: string;
}

const ProjectFiles = ({ files, projectTitle }: { files: ProjectFile[]; projectTitle: string }) => {
  if (!files.length) return null;

  return (
    <AnimatedSection>
      <h2 className="text-2xl font-semibold mb-6">Files</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {files.map((f, idx) => (
          <a
            key={idx}
            href={f.file}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-0 overflow-hidden group block"
          >
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
              {f.cover ? (
                <img
                  src={f.cover}
                  alt={f.title || `${projectTitle} file ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'hsl(var(--muted) / 0.4)' }}>
                  <FileText className="w-10 h-10" style={{ color: 'hsl(var(--muted-foreground))' }} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                  <Download className="w-4 h-4" /> Open file
                </span>
              </div>
            </div>
            {(f.title || f.caption) && (
              <div className="p-4">
                {f.title && <p className="font-medium mb-1">{f.title}</p>}
                {f.caption && (
                  <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{f.caption}</p>
                )}
              </div>
            )}
          </a>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default ProjectFiles;
