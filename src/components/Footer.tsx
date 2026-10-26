export default function Footer() {
  return (
    <footer className="footer">
      <svg width="40" height="44" viewBox="0 0 40 44" aria-hidden className="sprig">
        <g fill="none" stroke="var(--olive)" strokeWidth="1.2" strokeLinecap="round">
          <path d="M20,42 C21,28 19,18 20,6" />
          <path d="M20,30 q-9,-7 -17,-4 q7,6 17,4" />
          <path d="M20,27 q9,-7 17,-4 q-7,6 -17,4" />
          <path d="M20,20 q-7,-6 -14,-3 q6,5 14,3" />
          <path d="M20,17 q7,-6 14,-3 q-6,5 -14,3" />
        </g>
      </svg>
      <p className="serif" style={{ fontStyle: "italic", fontSize: 19, color: "var(--muted)", marginTop: 8 }}>
        AI × Cognition × Neuro
      </p>
      <p className="kicker" style={{ marginTop: 10 }}>© 2026 Sumeet Musfirah</p>
    </footer>
  );
}
