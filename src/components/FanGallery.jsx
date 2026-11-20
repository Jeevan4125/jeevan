import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { skillOrbit } from "../data/content";
import "./fanGallery.css";

const TRACK_COLOR = {
  web: "var(--pulse)",
  data: "var(--signal)",
  robotics: "var(--pulse)",
  security: "var(--signal)",
  core: "var(--pulse)",
};

const ICON_BASE = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons";

const VISIBLE = 7; // odd number so there's a true center card
const HALF = Math.floor(VISIBLE / 2);

const SPRING = { type: "spring", stiffness: 260, damping: 26, mass: 0.9 };

function mod(n, m) {
  return ((n % m) + m) % m;
}

// Premium "fan of cards" gallery: a curved deck with a larger center card and
// smaller, rotated side cards. Infinite looping, hover-to-lift, and paged
// navigation. Built with framer-motion (no GSAP/Tailwind dependency needed)
// to match this project's existing stack.
export default function FanGallery() {
  const items = useMemo(() => skillOrbit, []);
  const n = items.length;
  const reduceMotion = useReducedMotion();

  const [centerIndex, setCenterIndex] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [dir, setDir] = useState(1);
  const liveRef = useRef(null);

  const [viewport, setViewport] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setViewport(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = viewport <= 720;
  const isSmallMobile = viewport <= 420;

  const go = useCallback(
    (delta) => {
      setDir(delta > 0 ? 1 : -1);
      setCenterIndex((c) => mod(c + delta, n));
      setHovered(null);
      if (liveRef.current) {
        const idx = mod(centerIndex + delta, n);
        liveRef.current.textContent = items[idx]?.name ?? "";
      }
    },
    [centerIndex, items, n]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    },
    [go]
  );

  // Slice out VISIBLE cards centered on centerIndex, wrapping around.
  const visible = useMemo(() => {
    const slots = [];
    for (let offset = -HALF; offset <= HALF; offset++) {
      const idx = mod(centerIndex + offset, n);
      slots.push({ idx, offset, item: items[idx] });
    }
    return slots;
  }, [centerIndex, items, n]);

  const activeItem = hovered !== null ? items[hovered] : items[centerIndex];
  const activeColor = TRACK_COLOR[activeItem?.track] ?? "var(--signal)";

  return (
    <div className="fanGallery">
      <div
        className="fanGallery-stage"
        role="listbox"
        aria-label="Technical arsenal"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          {visible.map(({ idx, offset, item }) => {
            const isCenter = offset === 0;
            const isHovered = hovered === idx;
            const color = TRACK_COLOR[item.track] ?? "var(--signal)";

            // Base fan geometry: rotate/translate outward from center.
            // Spread scales down on narrow viewports so cards stay on-screen
            // and don't crowd or overlap awkwardly.
            const spreadScale = isMobile ? (isSmallMobile ? 0.52 : 0.68) : 1;
            const rotate = reduceMotion ? 0 : offset * 11 * spreadScale;
            const x = offset * 108 * spreadScale;
            const y = Math.abs(offset) * 22 * spreadScale + (isCenter ? -18 : 0);
            const scale = isCenter ? 1.18 : 1 - Math.abs(offset) * 0.08;
            const z = VISIBLE - Math.abs(offset);

            const hoverShift =
              isHovered && !isCenter ? (offset > 0 ? 18 : -18) * spreadScale : 0;

            const transform = {
              x: x + hoverShift,
              y: isHovered ? y - 30 : y,
              rotate: isHovered ? 0 : rotate,
              scale: isHovered ? scale + 0.12 : scale,
            };

            return (
              <motion.button
                key={`${item.name}-${idx}`}
                type="button"
                className="fanGallery-card"
                data-center={isCenter}
                data-hovered={isHovered}
                style={{ "--card-color": color, zIndex: isHovered ? 50 : z }}
                initial={{ opacity: 0, y: 60, scale: 0.5 }}
                animate={{ opacity: 1, ...transform }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={SPRING}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(idx)}
                onBlur={() => setHovered(null)}
                onClick={() => go(offset)}
                aria-selected={isCenter}
                aria-label={item.name}
              >
                <span className="fanGallery-cardIcon">
                  {item.icon ? (
                    <img
                      src={`${ICON_BASE}/${item.icon}.svg`}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "block";
                      }}
                    />
                  ) : null}
                  <span
                    className="fanGallery-cardGlyph"
                    style={{ display: item.icon ? "none" : "block" }}
                  >
                    {item.name.slice(0, 2).toUpperCase()}
                  </span>
                </span>
                <span className="fanGallery-cardName">{item.name}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="fanGallery-status" aria-live="off">
        <span className="mono" style={{ color: activeColor }}>
          {activeItem?.track?.toUpperCase()}
        </span>
        <span className="fanGallery-statusName">{activeItem?.name}</span>
      </div>
      <span ref={liveRef} className="sr-only" aria-live="polite" />

      <div className="fanGallery-controls">
        <button
          type="button"
          className="fanGallery-navBtn"
          onClick={() => go(-1)}
          aria-label="Previous tool"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="fanGallery-dots" role="tablist" aria-label="Tool position">
          {items.map((it, i) => (
            <button
              key={it.name}
              type="button"
              className="fanGallery-dot"
              data-active={i === centerIndex}
              aria-label={`Go to ${it.name}`}
              aria-selected={i === centerIndex}
              onClick={() => {
                setDir(i > centerIndex ? 1 : -1);
                setCenterIndex(i);
              }}
            />
          ))}
        </div>

        <button
          type="button"
          className="fanGallery-navBtn"
          onClick={() => go(1)}
          aria-label="Next tool"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="fanGallery-legend" role="tablist" aria-label="Skill tracks">
        {Object.entries(TRACK_COLOR).map(([track, color]) => {
          const hasTrack = items.some((it) => it.track === track);
          if (!hasTrack) return null;
          return (
            <span key={track} className="mono fanGallery-legendItem">
              <span style={{ background: color }} className="fanGallery-legendDot" />
              {track}
            </span>
          );
        })}
      </div>
    </div>
  );
}
