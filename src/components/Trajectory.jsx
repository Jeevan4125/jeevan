import { motion } from "framer-motion";
import { education, achievements, languages, softSkills } from "../data/content";
import FlipCard from "./FlipCard";

export default function Trajectory() {
  const timeline = education
    .map((e) => ({ type: "Education", title: e.degree, org: e.school, period: e.period, note: e.detail }))
    .sort((a, b) => (a.period > b.period ? 1 : -1));

  return (
    <section id="trajectory" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Trajectory</div>
          <h2 className="section-title">Where I've <em>been</em></h2>
        </div>

        <div className="timeline">
          <div className="timeline-spine" />
          {timeline.map((t, i) => (
            <motion.div
              key={t.title}
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="mono timeline-type">{t.type} · {t.period}</div>
                <h3 className="timeline-title">{t.title}</h3>
                <p className="timeline-org">{t.org}</p>
                <p className="timeline-note">{t.note}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="achievements-stack-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="mono achievements-stack-hint">          Achievements | Soft Skills</span><br></br><br></br><br></br>
          <div className="achievements-stack">
            <FlipCard stackOffset={16} stackRotation={7} borderRadius={20} shadowIntensity={0.22}>
              {achievements.map((a) => (
                <div className="achievement-card achievement-card--stacked" key={a.title}>
                  <span className="mono" style={{ color: "var(--signal)", fontSize: "0.8rem", letterSpacing: "0.05em" }}>{a.date}</span>
                  <h4 style={{ fontSize: "1.3rem", margin: "10px 0 12px", fontWeight: 600 }}>{a.title}</h4>
                  <p style={{ color: "var(--ink-secondary)", fontSize: "1rem", lineHeight: 1.65 }}>{a.detail}</p>
                </div>
              ))}
              <div className="achievement-card achievement-card--stacked">
                <span className="mono" style={{ color: "var(--pulse)", fontSize: "0.8rem", letterSpacing: "0.05em" }}>Languages</span>
                <h4 style={{ fontSize: "1.3rem", margin: "10px 0 12px", fontWeight: 600 }}>{languages.join(" · ")}</h4>
                <p style={{ color: "var(--ink-secondary)", fontSize: "1rem", lineHeight: 1.65 }}>Fluent in both, comfortable working across teams in either.</p>
              </div>
              <div className="achievement-card achievement-card--stacked">
                <span className="mono" style={{ color: "var(--signal)", fontSize: "0.8rem", letterSpacing: "0.05em" }}>Soft Skills</span>
                <h4 style={{ fontSize: "1.3rem", margin: "10px 0 12px", fontWeight: 600 }}>{softSkills.join(" · ")}</h4>
                <p style={{ color: "var(--ink-secondary)", fontSize: "1rem", lineHeight: 1.65 }}>What I bring to a team beyond the tech stack.</p>
              </div>
            </FlipCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}