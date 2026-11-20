import { motion, useReducedMotion } from "framer-motion";
import { experience } from "../data/experience";
import "./Experience.css";

export default function Experience() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Intern Experience</div>
          <h2 className="section-title">My <em>internships</em></h2>
          <p className="section-sub" style={{ marginTop: 12 }}>
            Hands-on experience building full-stack software and practical product features through internships.
          </p>
        </div>

        <ol className="experience-timeline">
          {experience.map((entry, index) => (
            <motion.li
              className="experience-timeline-item"
              key={`${entry.company}-${entry.duration}`}
              initial={reduceMotion ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : index * 0.1 }}
            >
              <article className="experience-card">
                <div className="experience-card-heading">
                  <div>
                    <h3 className="experience-company">{entry.company}</h3>
                    <p className="experience-role">{entry.role}</p>
                  </div>
                  <span className="mono experience-duration">{entry.duration}</span>
                </div>

                <p className="mono experience-mode">{entry.mode}</p>
                {entry.project && <p className="experience-project">Project: {entry.project}</p>}
                <p className="experience-summary">{entry.summary}</p>

                <ul className="experience-bullets">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <ul className="experience-tags" aria-label="Technologies used">
                  {entry.tags.map((tag) => (
                    <li className="mono" key={tag}>{tag}</li>
                  ))}
                </ul>

                {(entry.certificateUrl || entry.projectUrl) && (
                  <div className="experience-actions">
                    {entry.certificateUrl && (
                      <a href={entry.certificateUrl} target="_blank" rel="noopener noreferrer">
                        View Certificate <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {entry.projectUrl && (
                      <a href={entry.projectUrl} target="_blank" rel="noopener noreferrer">
                        View Project <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                )}
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
