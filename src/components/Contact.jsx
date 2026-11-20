import { motion } from "framer-motion";
import { profile } from "../data/content";
import NodeField from "./NodeField";

export default function Contact() {
  return (
    <section id="contact" className="section" style={{ position: "relative", overflow: "hidden" }}>
      <NodeField className="contact-nodefield" density={0.00006} />
      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 20 }}>Get in touch</div>
          <h2 style={{ fontSize: "clamp(2.2rem, 6vw, 4.4rem)", fontWeight: 700, lineHeight: 1.05, marginBottom: 24 }}>
            Let's build something
            <br />
            <span style={{ color: "var(--signal)" }}>worth shipping.</span>
          </h2>
          <p style={{ color: "var(--ink-secondary)", maxWidth: 480, margin: "0 auto 44px", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Open to Full Stack and Mobile roles, internships, and collaborations. Reach out — I reply fast.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}>
            <a
              href={`mailto:${profile.email}`}
              className="mono"
              style={{
                padding: "16px 32px", borderRadius: 999, background: "var(--signal)", color: "#080808",
                fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.03em", textTransform: "uppercase",
              }}
            >
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="mono"
              style={{
                padding: "16px 32px", borderRadius: 999, border: "1px solid var(--line-strong)",
                fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.03em",
              }}
            >
              {profile.phone}
            </a>
          </div>

          <div style={{ display: "flex", gap: 28, justifyContent: "center", marginBottom: 90 }}>
            <a href={profile.github} target="_blank" rel="noreferrer" className="mono footer-link">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="mono footer-link">LinkedIn ↗</a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
