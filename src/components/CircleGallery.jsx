import { useState, useMemo } from "react";
import { skillOrbit } from "../data/content";
import "./circleGallery.css";

const TRACK_COLOR = {
  web: "var(--signal)",
  mobile: "var(--pulse)",
  data: "var(--signal)",
  robotics: "var(--pulse)",
  security: "var(--signal)",
  core: "var(--pulse)",
};

const ICON_BASE = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons";

export default function CircleGallery() {
  const items = useMemo(() => skillOrbit, []);
  const n = items.length;
  const [openIndex, setOpenIndex] = useState(null);

  const handleCardClick = (i, e) => {
    e.stopPropagation();
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="circleGallery" onClick={() => setOpenIndex(null)}>
      <div
        className="circleGallery-book"
        data-open={openIndex !== null}
        style={{ "--n": n }}
      >
        {items.map((it, i) => {
          const isOpen = openIndex === i;
          const color = TRACK_COLOR[it.track] ?? "var(--signal)";
          return (
            <div
              key={it.name}
              className="circleGallery-page"
              data-open={isOpen}
              style={{
                "--i": n - 1 - i,
                "--card-color": color,
                zIndex: isOpen ? 20 + n : n - i,
              }}
              onClick={(e) => handleCardClick(i, e)}
              role="button"
              tabIndex={0}
              aria-pressed={isOpen}
              aria-label={it.name}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(i, e);
                }
              }}
            >
              <div className="circleGallery-pageFace circleGallery-pageFace--front">
                <span className="circleGallery-pageIcon">
                  {it.icon ? (
                    <img
                      src={`${ICON_BASE}/${it.icon}.svg`}
                      alt=""
                      loading="lazy"
                      onError={(e2) => {
                        e2.currentTarget.style.display = "none";
                        e2.currentTarget.nextSibling.style.display = "block";
                      }}
                    />
                  ) : null}
                  <span
                    className="circleGallery-pageGlyph"
                    style={{ display: it.icon ? "none" : "block" }}
                  >
                    {it.name.slice(0, 2).toUpperCase()}
                  </span>
                </span>
              </div>
              <div className="circleGallery-pageFace circleGallery-pageFace--back">
                <span className="circleGallery-pageName">{it.name}</span>
                <span className="mono circleGallery-pageTrack" style={{ color }}>
                  {it.track.toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="circleGallery-legend" role="tablist" aria-label="Skill tracks">
        {Object.entries(TRACK_COLOR).map(([track, color]) => {
          const hasTrack = items.some((it) => it.track === track);
          if (!hasTrack) return null;
          return (
            <span key={track} className="mono circleGallery-legendItem">
              <span style={{ background: color }} className="circleGallery-legendDot" />
              {track}
            </span>
          );
        })}
      </div>
    </div>
  );
}