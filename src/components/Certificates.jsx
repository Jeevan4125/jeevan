import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { certifications } from "../data/content";

export default function Certificates() {
  const loop = [...certifications, ...certifications, ...certifications];
  const wrapRef = useRef(null);
  // Only run the infinite marquee while the section is actually visible —
  // an always-on x-animation for an off-screen element is wasted work on
  // every frame and adds up on mobile.
  const inView = useInView(wrapRef, { margin: "200px 0px" });

  return (
    <section id="certs" className="section" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div className="container" style={{ padding: "0 var(--edge)" }}>
        <div className="section-head">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Certifications</div>
          <h2 className="section-title">Credentials <em>on file</em></h2>
        </div>
      </div>

      <div className="marquee-wrap" ref={wrapRef}>
        <motion.div
          className="marquee-track"
          style={{ willChange: "transform" }}
          animate={inView ? { x: ["0%", "-50%"] } : {}}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((c, i) => (
            <div className="cert-card" key={c.name + i}>
              <div className="cert-card-top">
                <span className="mono cert-badge">CERT</span>
                <span className="mono cert-date">{c.date}</span>
              </div>
              <h3 className="cert-name">{c.name}</h3>
              <p className="mono cert-issuer">{c.issuer}</p>
            </div>
          ))}
        </motion.div>
        <div className="marquee-fade marquee-fade-left" />
        <div className="marquee-fade marquee-fade-right" />
      </div>
    </section>
  );
}
