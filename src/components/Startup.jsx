import { motion } from "framer-motion";

const focusAreas = [
  "Web Development",
  "Application Development",
  "UI/UX Design",
  "Digital Solutions",
];

export default function Startup() {
  return (
    <section id="services" className="section">
      <span id="startup" className="section-anchor-alias" aria-hidden="true" />
      <div className="container">
        <div className="section-head">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Founder &amp; Entrepreneur</div>
          <h2 className="section-title">Building My Own <em>Vision.</em></h2>
        </div>

        <motion.div
          className="startup-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="startup-content">
            <div className="startup-brand-row">
              <span className="startup-brand mono">Qyzen</span>
              <span className="startup-tagline mono">Innovate, Build, and Elevate</span>
            </div>

            <h3 className="startup-hero">Founder of Qyzen</h3>

            <p className="startup-description">
              Qyzen is a technology venture focused on building digital solutions for businesses. As Founder, I help shape the vision,
              contribute to software development, collaborate with my team, and work towards turning ideas into practical digital products and services.
            </p>

            <div className="startup-meta-grid">
              <div>
                <span className="startup-meta-label mono">Role</span>
                <p>Founder — Qyzen</p>
              </div>
              <div>
                <span className="startup-meta-label mono">Location</span>
                <p>Chennai, Tamil Nadu, India</p>
              </div>
              <div>
                <span className="startup-meta-label mono">Team</span>
                <p>Four-member team</p>
              </div>
            </div>
          </div>

          <div className="startup-aside">
            <div className="startup-mark" aria-label="Qyzen brand mark">Q</div>

            <div className="startup-focus">
              <span className="startup-focus-label mono">Focus Areas</span>
              <ul>
                {focusAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>

            <a
              href="https://qyzen-iota.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="startup-cta mono"
            >
              Explore Qyzen ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
