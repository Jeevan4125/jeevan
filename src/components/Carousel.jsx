import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./Carousel.css";

const ICON_BASE = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons";
const TRACK_LABELS = {
  web: "Web development",
  data: "Data and AI",
  robotics: "Robotics",
  security: "Security",
  desktop: "Desktop development",
  core: "Core tools and concepts",
};

function ToolIcon({ item }) {
  const [failed, setFailed] = useState(false);

  if (!item.icon || failed) {
    return <span className="carousel-tool-glyph" aria-hidden="true">{item.name.slice(0, 2).toUpperCase()}</span>;
  }

  return (
    <img
      className="carousel-tool-icon"
      src={`${ICON_BASE}/${item.icon}.svg`}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function Carousel({
  items,
  baseWidth = 300,
  aspectRatio = 1.25,
  effect = "tilt",
  indicator = "dots",
  frame = true,
  arrows = false,
  loop = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  theme = "dark",
  peek = 0,
  gap = 16,
  radius = 12,
  draggable = true,
  round = false,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const isLooping = loop && items.length > 1;
  const activeItem = items[activeIndex];
  const trackLabel = TRACK_LABELS[activeItem?.track] ?? "Technical skill";

  const goTo = useCallback((nextIndex) => {
    if (!items.length) return;
    const boundedIndex = isLooping
      ? (nextIndex + items.length) % items.length
      : Math.max(0, Math.min(items.length - 1, nextIndex));
    if (boundedIndex === activeIndex) return;
    setDirection(boundedIndex > activeIndex ? 1 : -1);
    setActiveIndex(boundedIndex);
  }, [activeIndex, isLooping, items.length]);

  const resetTilt = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--carousel-rotate-x", "0deg");
    card.style.setProperty("--carousel-rotate-y", "0deg");
    card.style.setProperty("--carousel-light-x", "50%");
    card.style.setProperty("--carousel-light-y", "50%");
  }, []);

  const handlePointerMove = (event) => {
    if (effect !== "tilt" || reduceMotion || event.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty("--carousel-rotate-x", `${(0.5 - y) * 10}deg`);
    card.style.setProperty("--carousel-rotate-y", `${(x - 0.5) * 10}deg`);
    card.style.setProperty("--carousel-light-x", `${x * 100}%`);
    card.style.setProperty("--carousel-light-y", `${y * 100}%`);
  };

  useEffect(() => {
    if (!autoplay || paused || reduceMotion || items.length < 2) return undefined;
    const timer = window.setInterval(() => {
      goTo(activeIndex + 1);
    }, autoplayDelay);
    return () => window.clearInterval(timer);
  }, [activeIndex, autoplay, autoplayDelay, goTo, items.length, paused, reduceMotion]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) < 45) return;
    goTo(activeIndex + (info.offset.x < 0 ? 1 : -1));
  };

  if (!activeItem) return null;

  const style = {
    "--carousel-width": `${baseWidth}px`,
    "--carousel-aspect-ratio": aspectRatio,
    "--carousel-radius": `${radius}px`,
    "--carousel-gap": `${gap}px`,
    "--carousel-peek": `${peek}px`,
  };

  return (
    <div
      className={`skill-carousel${frame ? " has-frame" : ""}${round ? " is-round" : ""}`}
      data-theme={theme}
      style={style}
      role="region"
      aria-label="Technical skills carousel"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div className="skill-carousel-stage">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.article
            key={activeItem.name}
            ref={cardRef}
            className="skill-carousel-card"
            custom={direction}
            initial={reduceMotion ? false : { opacity: 0, x: direction * 34, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: direction * -34, scale: 0.96 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.2, 0.75, 0.25, 1] }}
            drag={draggable ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
            onPointerCancel={resetTilt}
            aria-label={`${activeItem.name}, ${trackLabel}`}
          >
            <div className="skill-carousel-card-inner">
              <span className="skill-carousel-card-index mono">
                {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              <div className="skill-carousel-icon-wrap">
                <ToolIcon item={activeItem} />
              </div>
              <div className="skill-carousel-copy">
                <span className="skill-carousel-category mono">{trackLabel}</span>
                <h3>{activeItem.name}</h3>
                <p>Part of my hands-on technical toolkit.</p>
              </div>
              <span className="skill-carousel-card-glow" aria-hidden="true" />
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="skill-carousel-controls">
        {arrows && (
          <button
            type="button"
            className="skill-carousel-arrow"
            onClick={() => goTo(activeIndex - 1)}
            disabled={!isLooping && activeIndex === 0}
            aria-label="Previous skill"
          >
            <span aria-hidden="true">←</span>
          </button>
        )}

        {indicator === "dots" && (
          <div className="skill-carousel-dots" role="group" aria-label="Choose a skill">
            {items.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className="skill-carousel-dot"
                data-active={index === activeIndex}
                aria-label={`Show ${item.name}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        )}

        {arrows && (
          <button
            type="button"
            className="skill-carousel-arrow"
            onClick={() => goTo(activeIndex + 1)}
            disabled={!isLooping && activeIndex === items.length - 1}
            aria-label="Next skill"
          >
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
      <p className="skill-carousel-hint mono" aria-live="polite">
        {draggable ? "Drag or use arrow keys to explore" : "Use arrow keys to explore"}
      </p>
    </div>
  );
}
