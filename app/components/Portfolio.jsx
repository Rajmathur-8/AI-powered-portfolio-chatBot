// app/components/Portfolio.jsx
'use client';

import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <div className="portfolio-container">
      {/* Hero Section */}
      <section id="hero" className="section hero-section">
        <div className="hero-content">
          <h1 className="hero-title">John Doe</h1>
          <p className="hero-subtitle">Full Stack Developer & AI Enthusiast</p>
          <p className="hero-description">
            Building scalable web applications and exploring the intersection of AI and user experience.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">Get In Touch</a>
            <a href="#projects" className="btn btn-secondary">View Projects</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I&apos;m a passionate Full Stack Developer with over 5 years of experience building modern web applications.
              I specialize in React, Node.js, and cloud technologies, with a recent focus on integrating AI capabilities
              into user-facing products.
            </p>
            <p>
              My journey in tech started with a curiosity about how things work, and has evolved into a career
              focused on creating intuitive, performant, and scalable solutions. I believe in writing clean code,
              continuous learning, and sharing knowledge with the community.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me contributing to open-source projects, writing technical blogs,
              or exploring the latest developments in artificial intelligence and machine learning.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3 className="skill-category-title">Frontend</h3>
            <div className="skill-tags">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Next.js</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">Tailwind CSS</span>
              <span className="skill-tag">Redux</span>
              <span className="skill-tag">HTML5/CSS3</span>
            </div>
          </div>
          <div className="skill-category">
            <h3 className="skill-category-title">Backend</h3>
            <div className="skill-tags">
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Express</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">FastAPI</span>
              <span className="skill-tag">PostgreSQL</span>
              <span className="skill-tag">MongoDB</span>
            </div>
          </div>
          <div className="skill-category">
            <h3 className="skill-category-title">AI/ML</h3>
            <div className="skill-tags">
              <span className="skill-tag">OpenAI API</span>
              <span className="skill-tag">LangChain</span>
              <span className="skill-tag">Gemini API</span>
              <span className="skill-tag">Vector Databases</span>
              <span className="skill-tag">RAG Systems</span>
            </div>
          </div>
          <div className="skill-category">
            <h3 className="skill-category-title">DevOps & Tools</h3>
            <div className="skill-tags">
              <span className="skill-tag">Docker</span>
              <span className="skill-tag">AWS</span>
              <span className="skill-tag">Vercel</span>
              <span className="skill-tag">Git</span>
              <span className="skill-tag">CI/CD</span>
              <span className="skill-tag">Linux</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          <div className="project-card" data-project="1">
            <div className="project-header">
              <h3 className="project-title">E-Commerce Platform</h3>
              <ExternalLink className="project-icon" size={20} />
            </div>
            <p className="project-description">
              A full-stack e-commerce solution built with React, Node.js, and Stripe integration.
              Features include real-time inventory management, advanced search, and secure payment processing.
            </p>
            <div className="project-tech">
              <span className="tech-badge">React</span>
              <span className="tech-badge">Node.js</span>
              <span className="tech-badge">MongoDB</span>
              <span className="tech-badge">Stripe</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link">
                <Github size={18} />
                <span>Code</span>
              </a>
              <a href="#" className="project-link">
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            </div>
          </div>

          <div className="project-card" data-project="2">
            <div className="project-header">
              <h3 className="project-title">AI Content Generator</h3>
              <ExternalLink className="project-icon" size={20} />
            </div>
            <p className="project-description">
              An intelligent content generation tool powered by GPT-4. Helps marketers and writers create
              SEO-optimized content with customizable tone and style preferences.
            </p>
            <div className="project-tech">
              <span className="tech-badge">Next.js</span>
              <span className="tech-badge">OpenAI</span>
              <span className="tech-badge">PostgreSQL</span>
              <span className="tech-badge">Tailwind</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link">
                <Github size={18} />
                <span>Code</span>
              </a>
              <a href="#" className="project-link">
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            </div>
          </div>

          <div className="project-card" data-project="3">
            <div className="project-header">
              <h3 className="project-title">Task Management Dashboard</h3>
              <ExternalLink className="project-icon" size={20} />
            </div>
            <p className="project-description">
              A collaborative task management application with real-time updates, team analytics,
              and AI-powered priority suggestions. Built for remote teams.
            </p>
            <div className="project-tech">
              <span className="tech-badge">React</span>
              <span className="tech-badge">Firebase</span>
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">Chart.js</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link">
                <Github size={18} />
                <span>Code</span>
              </a>
              <a href="#" className="project-link">
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            </div>
          </div>

          <div className="project-card" data-project="4">
            <div className="project-header">
              <h3 className="project-title">Real-time Analytics Platform</h3>
              <ExternalLink className="project-icon" size={20} />
            </div>
            <p className="project-description">
              Enterprise-grade analytics dashboard with real-time data visualization, custom reporting,
              and automated insights using machine learning algorithms.
            </p>
            <div className="project-tech">
              <span className="tech-badge">Next.js</span>
              <span className="tech-badge">Python</span>
              <span className="tech-badge">Redis</span>
              <span className="tech-badge">D3.js</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link">
                <Github size={18} />
                <span>Code</span>
              </a>
              <a href="#" className="project-link">
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section experience-section">
        <h2 className="section-title">Work Experience</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-date">2022 - Present</div>
              <h3 className="timeline-title">Senior Full Stack Developer</h3>
              <p className="timeline-company">TechCorp Solutions</p>
              <p className="timeline-description">
                Leading development of AI-powered SaaS applications. Architected and implemented
                microservices infrastructure serving 100K+ users. Mentored junior developers and
                established best practices for code quality.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-date">2020 - 2022</div>
              <h3 className="timeline-title">Full Stack Developer</h3>
              <p className="timeline-company">StartupHub Inc</p>
              <p className="timeline-description">
                Developed and maintained multiple client projects using React and Node.js.
                Implemented CI/CD pipelines and reduced deployment time by 60%. Collaborated
                with designers to create pixel-perfect responsive interfaces.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-date">2019 - 2020</div>
              <h3 className="timeline-title">Frontend Developer</h3>
              <p className="timeline-company">Digital Agency Pro</p>
              <p className="timeline-description">
                Built responsive web applications for various clients across different industries.
                Specialized in React and modern JavaScript. Improved website performance and
                accessibility scores significantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <p className="contact-text">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              Feel free to reach out through the form or connect with me on social media.
            </p>
            <div className="contact-links">
              <a href="mailto:john@example.com" className="contact-link">
                <Mail size={20} />
                <span>john@example.com</span>
              </a>
              <a href="https://github.com" className="contact-link" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
                <span>github.com/johndoe</span>
              </a>
              <a href="https://linkedin.com" className="contact-link" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
                <span>linkedin.com/in/johndoe</span>
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                placeholder="Your name"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                placeholder="your.email@example.com"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                placeholder="What's this about?"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Your message..."
                rows="5"
                className="form-textarea"
              ></textarea>
            </div>
            <button type="submit" className="form-submit">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 John Doe. Built with Next.js and AI.</p>
      </footer>
    </div>
  );
}