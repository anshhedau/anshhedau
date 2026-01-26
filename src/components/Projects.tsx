import { ExternalLink, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'SnapWeaz',
    description: 'Design and Tech Studio building digital products and experiences. Led design, development, and strategy for multiple client projects.',
    tech: ['Figma', 'React', 'TypeScript', 'Vercel'],
    role: 'Founder & Lead',
    link: 'https://snapweaz.in',
  },
  {
    title: 'Road Vision - ANPR',
    description: 'ESP32-CAM-based license plate recognition system for real-time vehicle detection using computer vision and OCR technology.',
    tech: ['ESP32-CAM', 'Python', 'OpenCV', 'OCR'],
    role: 'Developer',
    link: 'https://anshhedau.snapweaz.in/roadvission',
  },
  {
    title: 'AI Indoor Navigation',
    description: 'AR-based indoor navigation system using AI for pathfinding and real-time positioning in complex indoor environments.',
    tech: ['Python', 'AR', 'AI/ML', 'Computer Vision'],
    role: 'Developer & Designer',
    link: '#',
  },
  {
    title: 'Snap2Sheet',
    description: 'OCR tool using Python & Tesseract to extract text from images with enhanced accuracy via noise reduction and thresholding.',
    tech: ['Python', 'Tesseract', 'OpenCV', 'Image Processing'],
    role: 'Developer',
    link: 'https://anshhedau.snapweaz.in/imagetotext',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section-spacing bg-card/30">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Projects</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
            Things I've built
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">{project.role}</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 bg-secondary rounded-md text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
