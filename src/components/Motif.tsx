/** Fine-line dendritic arbor whose axon resolves into an agent graph (animated). */
const DEND = [
  "M900,185 C870,170 850,150 820,128", "M820,128 C810,118 800,114 786,112",
  "M820,128 C815,115 816,104 812,94", "M900,185 C868,188 840,196 806,204",
  "M806,204 C795,200 784,201 772,206", "M806,204 C796,214 790,224 786,236",
  "M900,185 C885,160 878,140 874,112", "M874,112 C866,104 860,100 852,98",
  "M874,112 C878,104 882,100 890,96", "M900,185 C890,210 880,232 860,252",
  "M860,252 C850,256 842,256 830,254", "M905,185 L974,185",
];
const NODES: Record<string, [number, number]> = {
  A: [980, 185], B: [1040, 140], C: [1050, 226], D: [1100, 172], E: [1122, 242], F: [1112, 112],
};
const EDGES = ["AB", "AC", "BD", "CD", "BF", "DE", "CE", "DF"];

export default function Motif({ className = "" }: { className?: string }) {
  return (
    <svg className={`motif ${className}`} viewBox="760 86 380 180" role="img" aria-label="Line drawing of a neuron whose axon becomes a small network graph">
      {DEND.map((d, i) => (
        <path key={d} d={d} className="draw" style={{ animationDelay: `${i * 0.08}s` }} />
      ))}
      <circle cx={900} cy={185} r={5} className="o" />
      {EDGES.map(([a, b]) => (
        <line key={a + b} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} className="late" strokeOpacity={0.8} />
      ))}
      {Object.entries(NODES).map(([k, [x, y]]) =>
        k === "D" ? <circle key={k} cx={x} cy={y} r={4.4} className="hot" /> : <circle key={k} cx={x} cy={y} r={4.4} className="o late" />,
      )}
      <circle r={2.8} className="pulse" />
    </svg>
  );
}
