import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import About from "./components/About";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import Startup from "./components/Startup";
import Arsenal from "./components/Arsenal";
import Experience from "./components/Experience";
import Trajectory from "./components/Trajectory";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import { projects } from "./data/content";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, var(--signal), var(--pulse))",
        transformOrigin: "0%", scaleX, zIndex: 200,
      }}
    />
  );
}

function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
      onAnimationComplete={() => setDone(true)}
      style={{
        position: "fixed", inset: 0, background: "var(--bg-void)", zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none",
      }}
    >
      <motion.div
        className="mono"
        initial={{ letterSpacing: "0.4em", opacity: 0 }}
        animate={{ letterSpacing: "0.15em", opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: "0.9rem", color: "var(--signal)", textTransform: "uppercase" }}
      >
        Initializing Portfolio…
      </motion.div>
    </motion.div>
  );
}

const normalizePath = (path) => path.replace(/\/+$/, "") || "/";

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));
  const [pendingAnchor, setPendingAnchor] = useState(() => decodeURIComponent(window.location.hash.slice(1)) || null);
  const reduceMotion = useReducedMotion();
  const projectId = currentPath.startsWith("/projects/")
    ? currentPath.slice("/projects/".length)
    : null;
  const activeProject = projects.find((project) => project.id === projectId);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      setPendingAnchor(decodeURIComponent(window.location.hash.slice(1)) || null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!pendingAnchor) return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(pendingAnchor)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
      });
      setPendingAnchor(null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [currentPath, pendingAnchor, reduceMotion]);

  useEffect(() => {
    const pageTitles = {
      "/": "Home",
      "/about": "About",
      "/projects": "Projects",
      "/experience": "Experience",
      "/skills": "Skills",
      "/certifications": "Certifications",
      "/contact": "Contact",
    };
    document.title = `${activeProject?.name ?? pageTitles[currentPath] ?? "Home"} — Jeevan Kumar S`;
  }, [currentPath, activeProject]);

  const navigate = (path) => {
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToSection = (path, id) => {
    const nextPath = normalizePath(path);
    const nextUrl = `${nextPath}#${encodeURIComponent(id)}`;
    window.history.pushState({}, "", nextUrl);

    if (nextPath === currentPath) {
      document.getElementById(id)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
      });
      return;
    }

    setPendingAnchor(id);
    setCurrentPath(nextPath);
  };

  const page = {
    "/": (
      <>
        <Hero onNavigate={navigate} />
        <Projects onNavigate={navigate} />
        <Startup />
        <Arsenal />
        <Experience />
        <Trajectory />
        <Certificates />
        <Contact />
      </>
    ),
    "/about": (
      <>
        <About />
        <Startup />
      </>
    ),
    "/projects": <Projects onNavigate={navigate} />,
    "/experience": (
      <>
        <Experience />
        <Trajectory />
      </>
    ),
    "/skills": <Arsenal />,
    "/certifications": <Certificates />,
    "/contact": <Contact />,
  }[currentPath] ?? <Hero onNavigate={navigate} />;
  const content = activeProject
    ? <ProjectDetail project={activeProject} onNavigate={navigate} />
    : page;

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Nav currentPath={currentPath} onNavigate={navigate} />
      <main className={`page-content${currentPath === "/" ? " home-page" : ""}`}>
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.div>
      </main>
      <Footer onNavigateToSection={navigateToSection} />
    </>
  );
}
