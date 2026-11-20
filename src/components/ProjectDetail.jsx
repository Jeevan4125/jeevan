import { motion, useReducedMotion } from "framer-motion";
import "./ProjectDetail.css";

export default function ProjectDetail({ project, onNavigate }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section project-detail-section">
      <div className="container">
        <a
          href="/projects"
          className="mono project-detail-back"
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            onNavigate("/projects");
          }}
        >
          <span aria-hidden="true">←</span> All projects
        </a>

        <motion.article
          className="project-detail-card"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
        >
          <header className="project-detail-header">
            <div>
              <p className="mono project-detail-eyebrow">{project.subtitle}</p>
              <h1 className="project-detail-title">{project.name}</h1>
            </div>
            <span className="mono project-detail-metric">{project.metric}</span>
          </header>

          <section className="project-detail-block" aria-labelledby="project-overview-title">
            <h2 id="project-overview-title" className="mono project-detail-label">Overview</h2>
            <p className="project-detail-description">{project.description}</p>
          </section>

          {project.highlights?.length > 0 && (
            <section className="project-detail-block" aria-labelledby="project-highlights-title">
              <h2 id="project-highlights-title" className="mono project-detail-label">Project details</h2>
              <ul className="project-detail-highlights">
                {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </section>
          )}

          <section className="project-detail-block" aria-labelledby="project-stack-title">
            <h2 id="project-stack-title" className="mono project-detail-label">Technology stack</h2>
            <ul className="project-detail-stack" aria-label="Technologies used">
              {project.stack.map((technology) => <li className="mono" key={technology}>{technology}</li>)}
            </ul>
          </section>

          <a
            className="project-detail-source"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.cta || "View source on GitHub"} <span aria-hidden="true">↗</span>
          </a>
        </motion.article>
      </div>
    </section>
  );
}
