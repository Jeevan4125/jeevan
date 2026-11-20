import { motion, useReducedMotion } from "framer-motion";
import profilePhoto from "../assets/jeevan.webp";
import { profile } from "../data/content";
import "./Footer.css";

const engineeringLinks = [
  { label: "Home Overview", href: "/#home", path: "/", section: "home" },
  { label: "About & Background", href: "/about#about", path: "/about", section: "about" },
  { label: "Skills & Stack", href: "/skills#skills", path: "/skills", section: "skills" },
  { label: "Experience", href: "/experience#experience", path: "/experience", section: "experience" },
  { label: "Featured Projects", href: "/projects#projects", path: "/projects", section: "projects" },
  { label: "Tech Offerings", href: "/about#services", path: "/about", section: "services" },
];

function NetworkIcon({ type }) {
  if (type === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 19c-4.3 1.4-4.3-2.2-6-2.5m12 5v-3.1a2.7 2.7 0 0 0-.8-2.1c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.4 7a4.4 4.4 0 0 0-.1-3.3S17.3 3.4 15 5a12 12 0 0 0-6 0C6.7 3.4 5.7 3.7 5.7 3.7A4.4 4.4 0 0 0 5.6 7a4.7 4.7 0 0 0-1.3 3.3c0 4.7 2.8 5.7 5.5 6A2.7 2.7 0 0 0 9 18.4V21" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 8.5v11m0-15v.1M9.5 19.5v-6a4 4 0 0 1 8 0v6m-8-7v7m8-7v7" />
      </svg>
    );
  }

  if (type === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.4l7.3-8.4L1.8 2h6.5l4.4 6.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 5h18v14H3z" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}

export default function Footer({ onNavigateToSection }) {
  const reduceMotion = useReducedMotion();

  const handleSectionClick = (event, path, section) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigateToSection(path, section);
  };

  return (
    <motion.footer
      className="site-footer"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px" }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <section className="footer-brand" aria-label="About Jeevan Kumar S">
            <div className="footer-brand-heading">
              <span className="footer-profile-ring">
                <img src={profilePhoto} alt="" width="56" height="56" loading="lazy" />
              </span>
              <h2>{profile.name}</h2>
            </div>
            <p className="footer-description">
              Final-Year B.Tech Artificial Intelligence &amp; Data Science Engineer. Founder of{" "}
              <strong>Qyzen</strong> (&quot;Innovate, Build, and Elevate&quot;). Building resilient full-stack software
              systems with React, Node.js and Java.
            </p>
            <div className="footer-contact-details">
              <p>Base: Tamil Nadu, India</p>
              <p>
                Direct:{" "}
                <a href={`mailto:${profile.email}`} className="footer-inline-link">
                  {profile.email}
                </a>
              </p>
            </div>
          </section>

          <nav className="footer-column" aria-label="Engineering navigation">
            <h2 className="footer-column-title">Engineering</h2>
            <ul>
              {engineeringLinks.map((link) => (
                <li key={link.section}>
                  <a
                    href={link.href}
                    className="footer-nav-link"
                    onClick={(event) => handleSectionClick(event, link.path, link.section)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-column" aria-label="Network links">
            <h2 className="footer-column-title">Network</h2>
            <ul>
              <li>
                <a href={profile.github} className="footer-network-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
                  <NetworkIcon type="github" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href={profile.linkedin} className="footer-network-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
                  <NetworkIcon type="linkedin" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="https://x.com/Jeevan0512" className="footer-network-link" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter) (opens in a new tab)">
                  <NetworkIcon type="x" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact#contact"
                  className="footer-network-link"
                  onClick={(event) => handleSectionClick(event, "/contact", "contact")}
                  aria-label="Send an inquiry"
                >
                  <NetworkIcon type="mail" />
                  <span>Send Inquiry</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="site-footer-bottom">
          <p>© 2026 Jeevan Kumar S. All rights reserved.</p>
          <p>Qyzen: Innovate, Build, and Elevate</p>
        </div>
      </div>
    </motion.footer>
  );
}
