import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import titleCardPhoto from "../assets/title-card-photo.webp";
import "./ProfileCard.css";

export default function ProfileCard({
  name,
  title,
  handle,
  status = "Available",
  contactText = "Contact",
  avatarUrl,
  iconUrl,
  holo = 0.8,
  glare = 0.5,
  tiltStrength = 12,
  parallax = 8,
  radius = 16,
  enableTilt = true,
  intro = true,
  showUserInfo = true,
  enableMobileTilt = false,
  theme = "dark",
  onContactClick,
}) {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const canTilt = enableTilt && !reduceMotion;

  const resetCard = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--pc-rotate-x", "0deg");
    card.style.setProperty("--pc-rotate-y", "0deg");
    card.style.setProperty("--pc-shift-x", "0px");
    card.style.setProperty("--pc-shift-y", "0px");
    card.style.setProperty("--pc-light-x", "50%");
    card.style.setProperty("--pc-light-y", "50%");
    card.style.setProperty("--pc-pointer-x", "50%");
    card.style.setProperty("--pc-pointer-y", "50%");
    card.style.setProperty("--pc-active", "0");
    card.style.setProperty("--pc-tilt", "0");
  };

  const handlePointerMove = (event) => {
    if (!canTilt || (event.pointerType === "touch" && !enableMobileTilt)) return;
    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    const normalizedX = (x - 50) / 50;
    const normalizedY = (y - 50) / 50;

    card.style.setProperty("--pc-rotate-x", `${-normalizedY * tiltStrength}deg`);
    card.style.setProperty("--pc-rotate-y", `${normalizedX * tiltStrength}deg`);
    card.style.setProperty("--pc-shift-x", `${normalizedX * parallax}px`);
    card.style.setProperty("--pc-shift-y", `${normalizedY * parallax}px`);
    card.style.setProperty("--pc-light-x", `${x}%`);
    card.style.setProperty("--pc-light-y", `${y}%`);
    card.style.setProperty("--pc-pointer-x", `${x}%`);
    card.style.setProperty("--pc-pointer-y", `${y}%`);
    card.style.setProperty("--pc-active", "1");
    card.style.setProperty("--pc-tilt", `${Math.min(1, Math.max(Math.abs(normalizedX), Math.abs(normalizedY)))}`);
  };

  const patternStyle = iconUrl ? { "--pc-pattern-image": `url("${iconUrl}")` } : undefined;

  return (
    <motion.div
      className="profile-card"
      ref={cardRef}
      data-theme={theme}
      style={{
        "--pc-radius": `${radius}px`,
        "--pc-holo": holo,
        "--pc-glare": glare,
        "--pc-parallax": `${parallax}px`,
        "--pc-tilt-strength": `${tiltStrength}deg`,
        ...patternStyle,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetCard}
      onPointerCancel={resetCard}
      initial={intro && !reduceMotion ? { opacity: 0, y: 18, scale: 0.97 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="profile-card__body">
        <div className="profile-card__tile">
          <img
            className="profile-card__photo"
            src={titleCardPhoto}
            alt={`Portrait of ${name}`}
            width="720"
            height="1081"
            fetchPriority="high"
            decoding="async"
          />
          <span className="profile-card__scrim" aria-hidden="true" />
          {iconUrl && <span className="profile-card__pattern" aria-hidden="true" />}
          <span className="profile-card__sheen" aria-hidden="true" />
          <span className="profile-card__holo" aria-hidden="true" />
          <span className="profile-card__glare" aria-hidden="true" />
          <span className="profile-card__shade" aria-hidden="true" />
          <span className="profile-card__tile-rim" aria-hidden="true" />
        </div>

        {showUserInfo && (
          <div className="profile-card__footer">
            <img className="profile-card__avatar" src={avatarUrl} alt="" width="36" height="36" />
            <div className="profile-card__meta">
              <span className="profile-card__handle">{name}</span>
              <span className="profile-card__status" aria-label={`${status} — ${title} — ${handle}`}>
                <span className="profile-card__status-dot" aria-hidden="true" />
                <span>{status}</span>
                <span className="profile-card__title">{title} · @{handle}</span>
              </span>
            </div>
            <button type="button" className="profile-card__contact" onClick={onContactClick}>
              {contactText}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        )}
        <span className="profile-card__rim" aria-hidden="true" />
      </div>
    </motion.div>
  );
}
