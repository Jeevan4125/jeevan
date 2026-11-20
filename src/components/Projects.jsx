import { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { projects } from "../data/content";
import ParallaxCardEffect from "./ParallaxCardEffect";

const TRACK_COLOR = { web: "var(--pulse)", data: "var(--signal)", robotics: "var(--pulse)", security: "var(--signal)", desktop: "var(--pulse)" };
const FILTERS = [
  { id: "all", label: "All work" },
  { id: "web", label: "Web" },
  { id: "data", label: "Data & AI" },
  { id: "robotics", label: "Robotics" },
  { id: "security", label: "Security" },
  { id: "desktop", label: "Desktop" },
];

function ProjectCard({ p, i, onNavigate }) {
  const projectPath = `/projects/${p.id}`;

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(projectPath);
  };

  return (
    <a
      href={projectPath}
      onClick={handleClick}
      className="project-row"
      aria-label={`View ${p.name} project details`}
      style={{ "--accent": TRACK_COLOR[p.track] }}
    >
      <span className="mono project-index">{String(i + 1).padStart(2, "0")}</span>

      <div className="project-main">
        <h3 className="project-name">{p.name}</h3>
        <p className="project-subtitle mono">{p.subtitle}</p>
        <p className="project-desc">{p.description}</p>
        <div className="project-stack">
          {p.stack.map((s) => (
            <span key={s} className="mono stack-chip">{s}</span>
          ))}
        </div>
      </div>

      <div className="project-meta">
        {p.thumbnail && (
          <div className="project-preview" aria-hidden="true">
            <div className="preview-bar">
              <span />
              <span />
              <span />
              <i>c2x.workspace</i>
            </div>
            <div className="preview-body">
              <div className="preview-sidebar">
                <span />
                <span />
                <span />
              </div>
              <div className="preview-editor">
                <span className="preview-line preview-line--short" />
                <span className="preview-line" />
                <span className="preview-line preview-line--medium" />
                <span className="preview-line preview-line--short" />
                <span className="preview-line preview-line--long" />
              </div>
            </div>
          </div>
        )}
        <span className="mono project-metric">{p.metric}</span>
        {p.cta && <span className="mono project-cta">{p.cta} ↗</span>}
        <span className="project-arrow">↗</span>
      </div>

      <span className="project-row-glow" />
    </a>
  );
}

export default function Projects({ onNavigate }) {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const visibleProjects = activeFilter === "all"
    ? projects
    : projects.filter((project) => project.track === activeFilter);

  return (
    <section id="projects" className="section">
      <span id="work" className="section-anchor-alias" aria-hidden="true" />
      <div className="container">
        <div className="section-head">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Selected Work</div>
          <h2 className="section-title">Things I've <em>shipped</em></h2>
          <p className="section-sub" style={{ marginTop: 12 }}>
            Five builds across full-stack web, desktop tools, machine learning, robotics, and security.
          </p>
        </div>
        <div className="project-filters" role="group" aria-label="Filter projects by category">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className="mono project-filter"
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
          <span className="mono project-filter-count" aria-live="polite">
            {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}
          </span>
        </div>
      </div>

      <div ref={containerRef} className="project-list">
        {visibleProjects.map((p, i) => {
          const targetScale = 1 - (visibleProjects.length - i) * 0.05;
          const start = i / visibleProjects.length;
          return (
            <ParallaxCardEffect
              key={p.id}
              id={i}
              progress={scrollYProgress}
              range={[start, 1]}
              targetScale={targetScale}
              className="project-row-wrap"
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              >
                <ProjectCard p={p} i={i} onNavigate={onNavigate} />
              </motion.div>
            </ParallaxCardEffect>
          );
        })}
      </div>
    </section>
  );
}
