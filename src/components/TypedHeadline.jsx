/**
 * Renders a headline made of colored segments.
 * `segments` is an ordered list of pieces, each either:
 *   { text: "web,", color: "var(--signal)" }  -> colored run of text
 *   { br: true }                              -> forces a line break
 *
 * The full text is always present in the DOM immediately (never gated
 * behind JS timers), so it can never fail to show up. A lightweight CSS
 * animation gives it a subtle "typed in" feel without any stateful risk.
 */
export default function TypedHeadline({ segments, style }) {
  const rendered = [];

  segments.forEach((seg, idx) => {
    if (seg.br) {
      rendered.push(<br key={`br-${idx}`} />);
      return;
    }
    rendered.push(
      <span
        key={idx}
        className="typed-headline-segment"
        style={{
          ...(seg.color ? { color: seg.color } : undefined),
          animationDelay: `${idx * 0.08}s`,
        }}
      >
        {seg.text}
      </span>
    );
  });

  return (
    <span style={style}>
      {rendered}
      <style>{`
        .typed-headline-segment {
          display: inline-block;
          opacity: 0;
          animation: typedSegmentIn 0.5s ease forwards;
        }
        @keyframes typedSegmentIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </span>
  );
}
