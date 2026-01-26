const experiences = [
  {
    title: 'DevOps Engineer & Strategic Advisor',
    company: 'DesignFlu',
    companyLink: 'https://linkedin.com/company/designflu/',
    period: 'August 2025 - Present',
    description: 'Streamlined infrastructure and deployment pipelines, enhancing system reliability and supporting scalable product delivery.',
  },
  {
    title: 'Tech and Design Intern',
    company: 'SnapWeaz',
    companyLink: 'https://linkedin.com/company/snapweaz/',
    period: 'May 2025 - July 2025',
    description: 'Contributed to real-world projects, collaborating across teams to deliver innovative tech and design solutions.',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section-spacing">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Experience</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
            Where I've worked
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl">
          <div className="relative border-l-2 border-border pl-8 space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div className="timeline-dot" />
                
                {/* Content */}
                <div className="bg-card border border-border rounded-xl p-6 card-glow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-lg font-display font-semibold text-foreground">
                      {exp.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  
                  <a
                    href={exp.companyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-primary hover:underline underline-offset-4 font-medium mb-3"
                  >
                    {exp.company}
                  </a>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
