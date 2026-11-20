import { motion, useTransform } from "framer-motion";

export default function ParallaxCardEffect({
  id,
  className,
  style,
  progress,
  range,
  targetScale,
  children,
}) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 760;
  // On mobile, skip the scroll-linked scale transform entirely — it's
  // the heaviest per-frame scroll cost on the page (a MotionValue
  // subscription + style write on every scroll tick, once per card).
  const scale = useTransform(progress, range, isMobile ? [1, 1] : [1, targetScale]);

  return (
    <div className="parallax-card-sticky">
      <motion.div
        style={{
          scale: isMobile ? 1 : scale,
          top: isMobile ? 0 : `calc(-5vh + ${id * 30}px)`,
          ...style,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
