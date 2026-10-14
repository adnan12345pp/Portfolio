import { useEffect, useRef, useState } from "react";
import { profile, skills, experience, projects, education, languages } from "./data";

function Progress() {
  const progress = useRef(null);

  useEffect(() => {
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) {
        progress.current.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div className="scroll-progress" ref={progress} />;
}

function Header({ menuOpen, setMenuOpen }) {
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" onClick={closeMenu} aria-label={`${profile.name}, home`}>
        <span className="wordmark-mark">A</span>
        <span>Adnan<span className="wordmark-period">.</span></span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>
      <nav id="primary-navigation" className={`primary-navigation${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#skills" onClick={closeMenu}>Skills</a>
        <a href="#experience" onClick={closeMenu}>Experience</a>
        <a href="#projects" onClick={closeMenu}>Projects</a>
        <a className="nav-contact" href="#contact" onClick={closeMenu}>Contact <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow"><span className="availability-dot" /> Portfolio / 2026</p>
          <h1>{profile.name}</h1>
          <p className="hero-role">{profile.role}<span className="role-divider">/</span> MERN stack · Python</p>
          <p className="hero-summary">I build practical, thoughtful web experiences for people and businesses.</p>
          <div className="hero-actions">
            <a className="button button-lime" href="#projects">Explore my work <span aria-hidden="true">↓</span></a>
            <a className="text-link" href={`mailto:${profile.email}`}>Get in touch <span aria-hidden="true">↗</span></a>
          </div>
          <p className="hero-location">Based in {profile.location}<span aria-hidden="true"> · </span>Open to relocation to the UAE</p>
        </div>
        <div className="portrait-area">
          <div className="portrait-frame">
            <img src={`${import.meta.env.BASE_URL}me.jpeg`} alt={`Portrait of ${profile.name}`} />
          </div>

          <span className="portrait-index" aria-hidden="true">SALAFI</span>

        </div>
      </div>
    </section>
  );
}

function QuickFacts() {
  const facts = [
    ["01", "Location", profile.location],
    ["02", "Focus", "MERN and Python"],
    ["03", "Education", "Diploma · 2026"],
    ["04", "Languages", languages.join(" · ")],
  ];

  return (
    <dl className="quick-facts" aria-label="At a glance">
      {facts.map(([number, label, value]) => (
        <div className="fact" key={label}>
          <dt><span>{number}</span>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function SectionHeading({ number, title, note }) {
  return (
    <div className="section-heading">
      <p className="section-number">{number} <span>/</span> 04</p>
      <h2>{title}</h2>
      {note && <p>{note}</p>}
    </div>
  );
}

function AboutSection() {
  return (
    <section className="content-section about-section" id="about">
      <SectionHeading number="01" title="A little about me" />
      <div className="about-content">
        <p className="about-lead">A curious developer focused on making the web useful, clear, and enjoyable to use.</p>
        <p className="about-detail">
          I'm an entry-level full stack developer from {profile.location}. I’m currently interning at <strong>Gen Corpus Data Hub</strong>, working with the MERN stack and Python, while building websites and client projects with <strong>EZYIX Technologies</strong>. I’m open to relocating to the UAE.
        </p>
        <div className="social-links">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="content-section skills-section" id="skills">
      <SectionHeading number="02" title="Tools I work with" />
      <div className="skill-list">
        {skills.map((group, index) => (
          <div className="skill-row" key={group.group}>
            <h3><span>0{index + 1}</span>{group.group}</h3>
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="content-section experience-section" id="experience">
      <SectionHeading number="03" title="Experience" />
      <ol className="experience-list">
        {experience.map((job, index) => (
          <li className="experience-item" key={job.company}>
            <span className="experience-index">0{index + 1}</span>
            <div className="experience-main">
              <p className="experience-company">{job.company}</p>
              <h3>{job.title}</h3>
              <p className="experience-description">{job.text}</p>
            </div>
            {job.link && <a className="experience-link" href={job.link.href} target="_blank" rel="noreferrer">{job.link.label} <span aria-hidden="true">↗</span></a>}
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-inner">
        <SectionHeading number="04" title="Selected work" note="A selection of websites and applications I’ve worked on." />
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-item project-tone-${index + 1}`} key={project.name}>
              <div className="project-art" aria-hidden="true">
                <span className="project-count">PROJECT / 0{index + 1}</span>
                <span className="project-monogram">{project.name.slice(0, 1)}</span>
                <span className="project-art-line" />
              </div>
              <div className="project-copy">
                <p className="project-kind">{project.kind}</p>
                <h3>{project.name}</h3>
                <p className="project-description">{project.text}</p>
                {project.link && <a className="project-link" href={project.link.href} target="_blank" rel="noreferrer">Visit project <span aria-hidden="true">↗</span></a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="education-strip" aria-labelledby="education-title">
      <p className="section-number">EDUCATION</p>
      <div>
        <h2 id="education-title">{education.title}</h2>
        <p>{education.school}</p>
      </div>
      <span>{education.year}</span>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <p className="contact-eyebrow">Have an opportunity?</p>
        <h2>Let’s make<br /><span>something useful.</span></h2>
        <div className="contact-bottom">
          <a className="button button-lime" href={`mailto:${profile.email}`}>Email Adnan <span aria-hidden="true">↗</span></a>
          <div className="contact-details">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone.replaceAll(" ", "")}`}>{profile.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Progress />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <QuickFacts />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <a className="footer-name" href="#top">Adnan Al Uthan PP</a>
        <p>Full Stack Developer · {new Date().getFullYear()}</p>
        <div><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></div>
      </footer>
    </>
  );
}
