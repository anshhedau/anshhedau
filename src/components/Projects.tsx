import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const projects = [
  {
    id: 'snapweaz',
    title: 'SnapWeaz',
    description: 'Design and Tech Studio building digital products and experiences. Led design, development, and strategy for multiple client projects.',
    tech: ['Figma', 'React', 'TypeScript', 'Vercel'],
    role: 'Founder & Lead',
    link: 'https://snapweaz.in',
    hasDetailPage: true,
  },
  {
    id: 'road-vision',
    title: 'Road Vision - ANPR',
    description: 'ESP32-CAM-based license plate recognition system for real-time vehicle detection using computer vision and OCR technology.',
    tech: ['ESP32-CAM', 'Python', 'OpenCV', 'OCR'],
    role: 'Developer',
    link: 'https://anshhedau.snapweaz.in/roadvission',
    hasDetailPage: true,
  },
  {
    id: 'virtual-lost-found',
    title: 'Virtual Lost & Found',
    description: 'A digital platform to help people find and recover lost items through a community-driven system with image recognition.',
    tech: ['React', 'Node.js', 'MongoDB', 'Cloud Storage'],
    role: 'Developer & Designer',
    link: '#',
    hasDetailPage: true,
  },
  {
    id: 'snap2sheet',
    title: 'Snap2Sheet',
    description: 'OCR tool using Python & Tesseract to extract text from images with enhanced accuracy via noise reduction and thresholding.',
    tech: ['Python', 'Tesseract', 'OpenCV', 'Image Processing'],
    role: 'Developer',
    link: 'https://anshhedau.snapweaz.in/imagetotext',
    hasDetailPage: true,
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
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
