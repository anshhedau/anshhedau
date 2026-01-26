import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { projects } from '@/components/Projects';

const projectDetails: Record<string, {
  fullDescription: string[];
  features: string[];
  challenges: string[];
  outcome: string;
  github?: string;
}> = {
  'snapweaz': {
    fullDescription: [
      'SnapWeaz is a design and technology studio I founded to bridge the gap between aesthetics and functionality. We specialize in creating digital products that not only look stunning but also deliver exceptional user experiences.',
      'As the Founder and Lead, I oversee all aspects of the business from client acquisition to project delivery. I work with a talented team of designers and developers to bring our clients\' visions to life.',
      'Our portfolio includes brand identities, web applications, mobile apps, and comprehensive design systems for startups and established businesses alike.',
    ],
    features: [
      'End-to-end product design and development',
      'Brand identity and design systems',
      'Web and mobile application development',
      'UI/UX consulting and audits',
      'Rapid prototyping and MVP development',
    ],
    challenges: [
      'Building a client base from scratch while maintaining quality standards',
      'Balancing multiple projects with varying complexity levels',
      'Creating scalable processes for a growing team',
    ],
    outcome: 'Successfully delivered 15+ projects for clients across various industries, establishing SnapWeaz as a trusted partner for digital product development.',
  },
  'road-vision': {
    fullDescription: [
      'Road Vision is an Automatic Number Plate Recognition (ANPR) system built using ESP32-CAM for real-time vehicle detection and license plate recognition.',
      'The system captures images of passing vehicles, processes them using computer vision algorithms, and extracts the license plate text using OCR technology.',
      'This project demonstrates the integration of embedded systems with machine learning for practical, real-world applications in traffic monitoring and security.',
    ],
    features: [
      'Real-time license plate detection using ESP32-CAM',
      'OpenCV-based image preprocessing for enhanced accuracy',
      'Tesseract OCR integration for text extraction',
      'Web interface for monitoring detected plates',
      'Database logging for historical records',
    ],
    challenges: [
      'Optimizing image processing for the limited ESP32 resources',
      'Handling varying lighting conditions and angles',
      'Achieving high accuracy rates with different plate formats',
    ],
    outcome: 'Achieved 85%+ accuracy in license plate recognition under various conditions, demonstrating the viability of edge computing for ANPR applications.',
  },
  'virtual-lost-found': {
    fullDescription: [
      'Virtual Lost & Found is a community-driven digital platform designed to help people find and recover their lost items through an innovative matching system.',
      'The platform allows users to post lost or found items with detailed descriptions and images. Using intelligent matching algorithms, the system suggests potential matches and connects users.',
      'Built with a focus on user experience and accessibility, the platform makes the stressful process of losing items a bit easier to manage.',
    ],
    features: [
      'Easy item posting with image uploads',
      'Smart matching algorithm based on descriptions and categories',
      'Real-time notifications for potential matches',
      'Secure messaging between users',
      'Location-based search and filtering',
      'Cloud-based image storage and retrieval',
    ],
    challenges: [
      'Designing an intuitive UX for users in stressful situations',
      'Implementing efficient search and matching algorithms',
      'Ensuring user privacy while enabling communication',
    ],
    outcome: 'Created a fully functional platform that streamlines the lost and found process, making it easier for communities to help each other recover lost belongings.',
  },
  'snap2sheet': {
    fullDescription: [
      'Snap2Sheet is an OCR (Optical Character Recognition) tool that extracts text from images with high accuracy using advanced image processing techniques.',
      'The tool applies noise reduction, thresholding, and other preprocessing steps to enhance image quality before text extraction, significantly improving recognition accuracy.',
      'Built with Python and Tesseract, it provides a simple yet powerful solution for digitizing printed or handwritten text.',
    ],
    features: [
      'Multi-format image support (PNG, JPG, PDF)',
      'Advanced noise reduction algorithms',
      'Adaptive thresholding for varying backgrounds',
      'Batch processing capability',
      'Export to multiple formats (TXT, CSV, JSON)',
    ],
    challenges: [
      'Handling diverse image qualities and formats',
      'Optimizing preprocessing pipeline for different text types',
      'Balancing accuracy with processing speed',
    ],
    outcome: 'Developed a reliable OCR solution that consistently achieves 90%+ accuracy on printed text, making document digitization quick and efficient.',
  },
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find(p => p.id === projectId);
  const details = projectId ? projectDetails[projectId] : null;

  if (!project || !details) {
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

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">{project.role}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">{project.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">{project.description}</p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-3 mb-12">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-secondary rounded-lg text-sm text-foreground font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 mb-16">
            {project.link !== '#' && (
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
            {details.github && (
              <a
                href={details.github}
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
              {/* Description */}
              <div>
                <h2 className="text-2xl font-display font-semibold mb-6">Overview</h2>
                <div className="space-y-4">
                  {details.fullDescription.map((para, idx) => (
                    <p key={idx} className="text-muted-foreground leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-display font-semibold mb-6">Key Features</h2>
                <ul className="space-y-3">
                  {details.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div>
                <h2 className="text-2xl font-display font-semibold mb-6">Challenges & Solutions</h2>
                <ul className="space-y-3">
                  {details.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Outcome Card */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-display font-semibold mb-4">Outcome</h3>
                <p className="text-muted-foreground leading-relaxed">{details.outcome}</p>
              </div>

              {/* Quick Info */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-display font-semibold mb-4">Project Info</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Role</span>
                    <p className="font-medium">{project.role}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Technologies</span>
                    <p className="font-medium">{project.tech.join(', ')}</p>
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
