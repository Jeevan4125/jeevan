import { useEffect, useRef } from "react";

// Ambient connected-node field, evoking the orbit/network motif.
// Nodes drift slowly and connect with lines when close; mouse repels nearby nodes.
export default function NodeField({ density = 0.00009, className = "" }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    let width, height, nodes, raf;
    let visible = true;
    let running = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const isSmallScreen = window.innerWidth <= 768;
    // Mobile/touch devices get a much lighter field and skip the O(n^2)
    // link-drawing pass entirely — that pass is the main cost on low-power GPUs.
    const mobileMode = isCoarsePointer || isSmallScreen;
    const effectiveDensity = mobileMode ? density * 0.4 : density;
    const maxNodes = mobileMode ? 36 : 120;
    const minNodes = mobileMode ? 14 : 28;

    function resize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const dpr = mobileMode ? Math.min(devicePixelRatio, 1.5) : devicePixelRatio;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      const count = Math.min(maxNodes, Math.max(minNodes, Math.floor(width * height * effectiveDensity)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 0.6,
      }));
    }

    function step() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      const linkDist = Math.min(160, width / 6);

      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (!mobileMode) {
            const dx = n.x - mouse.current.x;
            const dy = n.y - mouse.current.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 12000) {
              const f = (12000 - d2) / 12000;
              n.x += (dx / (Math.sqrt(d2) || 1)) * f * 1.2;
              n.y += (dy / (Math.sqrt(d2) || 1)) * f * 1.2;
            }
          }
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }

      // Skip the pairwise link pass on mobile — it's O(n^2) and the
      // biggest single cost of this component on weaker devices.
      if (!mobileMode) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < linkDist) {
              ctx.strokeStyle = `rgba(212, 21, 20, ${0.2 * (1 - dist / linkDist)})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(205, 203, 202, 0.55)";
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    }

    function startLoop() {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(step);
    }
    function stopLoop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onLeave() {
      mouse.current = { x: -9999, y: -9999 };
    }

    resize();
    if (reduceMotion) {
      // Draw a single static frame and never loop.
      running = true;
      step();
      running = false;
    }

    // Only animate while the canvas is actually on screen, and pause
    // whenever the tab is backgrounded — huge win for scroll smoothness
    // since Hero/Contact NodeFields sit far apart on the page.
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible && document.visibilityState === "visible") startLoop();
        else stopLoop();
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && visible) startLoop();
      else stopLoop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    window.addEventListener("resize", resize);
    if (!mobileMode) {
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
    }

    return () => {
      stopLoop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
