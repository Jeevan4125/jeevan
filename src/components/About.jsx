import { motion } from "framer-motion";
import { profile, stats } from "../data/content";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow" style={{ marginBottom: 16 }}>About me</div>
          <h1 className="section-title">Curious by nature, <em>builder by choice.</em></h1>
          <p className="section-sub" style={{ marginTop: 12 }}>
            {profile.summary}
          </p>
        </div>

        <motion.div
          className="about-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="mono about-label">Currently</span>
            <h2 className="about-heading">{profile.role}</h2>
            <p className="about-copy">
              I enjoy taking ideas from the first sketch to a working product—designing clear interfaces,
              building dependable APIs, and making sure the details feel thoughtful.
            </p>
            <p className="mono about-location">{profile.location} · Class of 2027</p>
            <div className="about-actions">
              <a className="mono btn-primary" href="/projects">Explore my projects <span aria-hidden="true">↗</span></a>
              <a className="mono btn-ghost" href={`mailto:${profile.email}`}>Get in touch</a>
            </div>
          </div>

          <div className="about-stats" aria-label="Portfolio highlights">
            {stats.map((stat) => (
              <div className="about-stat" key={stat.label}>
                <span className="mono about-stat-value">{stat.value}</span>
                <span className="about-stat-label">{stat.label}</span>
                <span className="about-stat-note">{stat.note}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
