import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/experience", label: "Intern Experience" },
  { path: "/skills", label: "Skills" },
  { path: "/certifications", label: "Certifications" },
];

export default function Nav({ currentPath, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (event, path) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setOpen(false);
    onNavigate(path);
  };
  const isCurrentPage = (path) =>
    currentPath === path || (path === "/projects" && currentPath.startsWith("/projects/"));

  return (
    <motion.header
      className="site-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "14px var(--edge)" : "22px var(--edge)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(8,8,8,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "padding 0.35s ease, background 0.35s ease, border-color 0.35s ease",
      }}
    >
      <a
        href="/"
        className="mono nav-brand"
        onClick={(event) => navigate(event, "/")}
      >
        <span className="nav-brand-dot" aria-hidden="true" />
        Jeevan Kumar S
      </a>

      <nav style={{ display: "flex", gap: "clamp(10px, 1.7vw, 25px)" }} className="nav-desktop" aria-label="Main navigation">
        {LINKS.map((link) => (
          <a
            key={link.path}
            href={link.path}
            onClick={(event) => navigate(event, link.path)}
            className="mono nav-link"
            aria-current={isCurrentPage(link.path) ? "page" : undefined}
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: isCurrentPage(link.path) ? "var(--signal)" : "var(--ink-secondary)",
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="/contact"
        className="mono nav-cta"
        onClick={(event) => navigate(event, "/contact")}
        style={{
          fontSize: "0.78rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          padding: "9px 18px",
          borderRadius: 999,
          border: "1px solid var(--signal-dim)",
          color: "var(--signal)",
        }}
      >
        Let&apos;s talk
      </a>

      <button
        type="button"
        className="nav-burger"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((isOpen) => !isOpen)}
        style={{ display: "none", flexDirection: "column", gap: 5, padding: 8 }}
      >
        <span style={{ width: 22, height: 2, background: "var(--ink-primary)", transform: open ? "translateY(3.5px) rotate(45deg)" : "none", transition: "0.25s" }} />
        <span style={{ width: 22, height: 2, background: "var(--ink-primary)", opacity: open ? 0 : 1, transition: "0.25s" }} />
        <span style={{ width: 22, height: 2, background: "var(--ink-primary)", transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none", transition: "0.25s" }} />
      </button>

      {open && (
        <motion.nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "rgba(8,8,8,0.98)", borderBottom: "1px solid var(--line)",
            display: "flex", flexDirection: "column", padding: "8px var(--edge) 20px",
          }}
        >
          {LINKS.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={(event) => navigate(event, link.path)}
              className="mono nav-mobile-link"
              aria-current={isCurrentPage(link.path) ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
          <a href="/contact" onClick={(event) => navigate(event, "/contact")} className="mono nav-mobile-link">
            Let&apos;s talk
          </a>
        </motion.nav>
      )}
    </motion.header>
  );
}
