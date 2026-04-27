interface Props {
  word: string;
}

const wordStyle = {
    writingMode: "vertical-rl" as const,
    fontSize: "clamp(4rem, 8.5vw, 8rem)",
    fontWeight: 900,
    letterSpacing: "-0.04em",
    lineHeight: 0.95,
    paddingInline: "0.75rem",
    color: "rgba(255,255,255,0.05)",
};

export function SectionLabel({ word }: Props) {

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none hidden md:block"
      aria-hidden
      style={{ zIndex: 1 }}
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-0">
        <div style={wordStyle}>{word}</div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0">
        <div style={{ ...wordStyle, transform: "rotate(180deg)" }}>{word}</div>
      </div>
    </div>
  );
}
