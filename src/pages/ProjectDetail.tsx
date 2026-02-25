import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getProjectBySlug } from '@/lib/content';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProjectBySlug(projectId) : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="section-container text-center">
            <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
            <Link to="/#projects" className="text-primary hover:underline">
              ← Back to Projects
            </Link>
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="section-container">
          {/* Back Link */}
          <Link 
            to="/#projects" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Cover Image */}
          {project.cover_image && (
            <div className="mb-12 rounded-2xl overflow-hidden border border-border">
              <img 
                src={project.cover_image} 
                alt={project.title} 
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          )}

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">{project.role}</span>
              {project.category && (
                <span className="text-xs px-2.5 py-1 bg-secondary rounded-md text-muted-foreground">
                  {project.category}
                </span>
              )}
              {project.featured && (
                <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-md font-medium">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">{project.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">{project.description}</p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-3 mb-12">
            {tech.map((t) => (
              <span
                key={t}
                className="px-4 py-2 bg-secondary rounded-lg text-sm text-foreground font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 mb-16">
            {project.link && project.link !== '#' && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-card transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Full Description */}
              {fullDescription.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-6">Overview</h2>
                  <div className="space-y-4">
                    {fullDescription.map((para, idx) => (
                      <p key={idx} className="text-muted-foreground leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-6">Key Features</h2>
                  <ul className="space-y-3">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges */}
              {challenges.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-6">Challenges & Solutions</h2>
                  <ul className="space-y-3">
                    {challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery */}
              {gallery.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-6">Gallery</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {gallery.map((item, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden border border-border">
                        <img src={item.image} alt={item.caption || `${project.title} screenshot ${idx + 1}`} className="w-full h-auto" />
                        {item.caption && (
                          <p className="px-4 py-3 text-sm text-muted-foreground bg-card">{item.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonial */}
              {project.testimonial?.quote && (
                <div className="border-l-4 border-primary pl-6 py-4">
                  <blockquote className="text-lg text-muted-foreground italic mb-3">
                    "{project.testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-medium text-foreground">{project.testimonial.author}</p>
                    {project.testimonial.role && (
                      <p className="text-sm text-muted-foreground">{project.testimonial.role}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Outcome Card */}
              {project.outcome && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-display font-semibold mb-4">Outcome</h3>
                  <p className="text-muted-foreground leading-relaxed">{project.outcome}</p>
                </div>
              )}

              {/* Quick Info */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-display font-semibold mb-4">Project Info</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Role</span>
                    <p className="font-medium">{project.role}</p>
                  </div>
                  {project.category && (
                    <div>
                      <span className="text-sm text-muted-foreground">Category</span>
                      <p className="font-medium">{project.category}</p>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <p className="font-medium">{project.duration}</p>
                    </div>
                  )}
                  {project.client && (
                    <div>
                      <span className="text-sm text-muted-foreground">Client</span>
                      <p className="font-medium">{project.client}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-muted-foreground">Technologies</span>
                    <p className="font-medium">{tech.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
