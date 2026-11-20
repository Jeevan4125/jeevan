import { motion } from "framer-motion";
import NodeField from "./NodeField";
import TypedHeadline from "./TypedHeadline";
import ProfileCard from "./ProfileCard";
import { profile, stats } from "../data/content";
import profilePhoto from "../assets/jeevan.webp";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero({ onNavigate }) {
  return (
    <section id="top" className="section" style={{ paddingTop: "clamp(120px, 18vh, 180px)", position: "relative", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <NodeField
        className="hero-nodefield"
        density={0.00011}
      />
      <span id="home" className="section-anchor-alias" aria-hidden="true" />
      <div
        className="container hero-grid"
        style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "clamp(32px, 6vw, 80px)", alignItems: "center", position: "relative", zIndex: 2 }}
      >
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="eyebrow" style={{ marginBottom: 22 }}>
            Available for full-stack roles
          </motion.div>

          <motion.h1
            variants={item}
            style={{ fontSize: "clamp(2.6rem, 6.4vw, 5.2rem)", fontWeight: 700, lineHeight: 1.02, marginBottom: 24, maxWidth: "100%" }}
          >
            <TypedHeadline
              segments={[
                { text: `${profile.name.split(" ")[0]} builds ` },
                { text: "web, ", color: "var(--ink-tertiary)" },
                { br: true },
                { text: "& ", color: "var(--ink-tertiary)" },
                { text: "intelligent systems." },
              ]}
            />
          </motion.h1>

          <motion.p variants={item} style={{ color: "var(--ink-secondary)", fontSize: "1.08rem", maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>
            {profile.summary}
          </motion.p>

          <motion.div variants={item} style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
            <a
              href={profile.github}
              target="_blank" rel="noreferrer"
              className="mono btn-primary"
              style={{
                padding: "15px 28px", borderRadius: 999, background: "var(--signal)", color: "#080808",
                fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase",
                display: "inline-flex", alignItems: "center", gap: 10,
              }}
            >
              View GitHub ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank" rel="noreferrer"
              className="mono btn-ghost"
              style={{
                padding: "15px 28px", borderRadius: 999, border: "1px solid var(--line-strong)",
                fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase",
                color: "var(--ink-primary)", display: "inline-flex", alignItems: "center", gap: 10,
              }}
            >
              LinkedIn ↗
            </a>
            <a
              href="/jeevan-resume.pdf"
              download="Jeevan-Kumar-S-Resume.pdf"
              className="mono btn-ghost"
              style={{
                padding: "15px 28px", borderRadius: 999, border: "1px solid var(--line-strong)",
                fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase",
                color: "var(--ink-primary)", display: "inline-flex", alignItems: "center", gap: 10,
              }}
            >
              Download Resume ↓
            </a>
          </motion.div>

          <motion.div variants={item} style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: "clamp(20px, 4vw, 48px)" }} className="stat-row">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="mono" style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", fontWeight: 700, color: "var(--ink-primary)" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-tertiary)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="hero-profile-wrap"
        >
          <ProfileCard
            name={profile.name}
            title="Full Stack and Software Developer"
            handle="Jeevan4125"
            status="Available"
            contactText="Contact"
            avatarUrl={profilePhoto}
            holo={0.45}
            glare={0.35}
            tiltStrength={12}
            parallax={8}
            radius={16}
            enableTilt
            intro
            showUserInfo
            enableMobileTilt={false}
            theme="dark"
            onContactClick={() => onNavigate("/contact")}
          />
        </motion.div>
      </div>

      <motion.div
        className="mono scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        scroll
      </motion.div>
    </section>
  );
}
