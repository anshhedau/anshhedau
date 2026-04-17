import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import LivePreview from '@/components/LivePreview';
import ProjectFiles from '@/components/ProjectFiles';
import { getProjectBySlug } from '@/lib/content';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProjectBySlug(projectId) : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background noise-overlay">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="section-container text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>The project you're looking for doesn't exist.</p>
            <Link to="/#projects" className="text-primary hover:underline">← Back to Projects</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const fullDescription = (project.full_description as string[]) || [];
  const features = (project.features as string[]) || [];
  const challenges = (project.challenges as string[]) || [];
  const tech = (project.tech as string[]) || [];
  const gallery = (project.gallery as Array<{ image: string; caption?: string }>) || [];
  const files = (project.files as Array<{ cover: string; file: string; title?: string; caption?: string }>) || [];

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navigation />
      <main className="pt-32 pb-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.04] rounded-full blur-[150px] pointer-events-none" />

        <div className="section-container relative">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/#projects" className="inline-flex items-center gap-2 hover:text-primary transition-colors mb-12" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </motion.div>


          {/* Header */}
          <AnimatedSection delay={0.1}>
            <div className="mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="section-label">{project.role}</span>
                {project.category && (
                  <span className="skill-tag text-xs">{project.category}</span>
                )}
                {project.featured && (
                  <span className="section-label">Featured</span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{project.title}</h1>
              <p className="text-xl max-w-3xl" style={{ color: 'hsl(var(--muted-foreground))' }}>{project.description}</p>
            </div>
          </AnimatedSection>

          {/* Tech Stack */}
          <AnimatedSection delay={0.15}>
            <div className="flex flex-wrap gap-3 mb-12">
              {tech.map((t) => (
                <span key={t} className="skill-tag font-medium">{t}</span>
              ))}
            </div>
          </AnimatedSection>

          {/* Live preview cover + CTA (replaces buttons row) */}
          <AnimatedSection delay={0.2}>
            <div className="mb-16 space-y-4">
              <LivePreview
                url={project.link as string | undefined}
                cover={project.cover_image as string | undefined}
                title={project.title as string}
              />
              {project.github && (
                <div>
                  <a
                    href={project.github as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {fullDescription.length > 0 && (
                <AnimatedSection>
                  <h2 className="text-2xl font-semibold mb-6">Overview</h2>
                  <div className="space-y-4">
                    {fullDescription.map((para, idx) => (
                      <p key={idx} className="leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{para}</p>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {features.length > 0 && (
                <AnimatedSection>
                  <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
                  <ul className="space-y-3">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 glass-card px-4 py-3">
                        <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--gradient-primary)' }} />
                        <span style={{ color: 'hsl(var(--muted-foreground))' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              )}

              {challenges.length > 0 && (
                <AnimatedSection>
                  <h2 className="text-2xl font-semibold mb-6">Challenges & Solutions</h2>
                  <ul className="space-y-3">
                    {challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: 'hsl(var(--muted-foreground))' }} />
                        <span style={{ color: 'hsl(var(--muted-foreground))' }}>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              )}

              <ProjectFiles files={files} projectTitle={project.title as string} />

              {gallery.length > 0 && (
                <AnimatedSection>
                  <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {gallery.map((item, idx) => (
                      <div key={idx} className="glass-card p-2 overflow-hidden">
                        <img src={item.image} alt={item.caption || `${project.title} screenshot ${idx + 1}`} className="w-full h-auto rounded-lg" />
                        {item.caption && (
                          <p className="px-3 py-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {project.testimonial?.quote && (
                <AnimatedSection>
                  <div className="glass-card p-6 border-l-4" style={{ borderLeftColor: 'hsl(var(--primary))' }}>
                    <blockquote className="text-lg italic mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      "{project.testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="font-medium">{project.testimonial.author}</p>
                      {project.testimonial.role && (
                        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{project.testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {project.outcome && (
                <AnimatedSection>
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold mb-4">Outcome</h3>
                    <p className="leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{project.outcome}</p>
                  </div>
                </AnimatedSection>
              )}

              <AnimatedSection delay={0.1}>
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Project Info</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Role</span>
                      <p className="font-medium">{project.role}</p>
                    </div>
                    {project.category && (
                      <div>
                        <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Category</span>
                        <p className="font-medium">{project.category}</p>
                      </div>
                    )}
                    {project.duration && (
                      <div>
                        <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Duration</span>
                        <p className="font-medium">{project.duration}</p>
                      </div>
                    )}
                    {project.client && (
                      <div>
                        <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Client</span>
                        <p className="font-medium">{project.client}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Technologies</span>
                      <p className="font-medium">{tech.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
