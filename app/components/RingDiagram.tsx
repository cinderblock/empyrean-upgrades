import { useState } from "react";
import { GATE } from "../content/site";

const N = GATE.segments;
const SPOKES_PER = GATE.spokes / N;
const R_TRUSS_OUT = 92;
const R_TRUSS_IN = 82;
const R_BOX = (R_TRUSS_OUT + R_TRUSS_IN) / 2;
const R_NET = 74;
const R_POWER = 99;
const R_HUB = 27;
/** The link the ring keeps idle until another fails: opposite the gateway. */
const STANDBY_AFTER = N / 2 - 1;
/** Where the diagram shows internet coming in. Any segment would do. */
const WAN_AT = 4;
/** Where the brain box and the gateway are drawn. Not decided yet. */
const BRAIN_AT = 0;
/**
 * Segments per power chain: all of them. One twist-lock feed powers the whole
 * ring, running one way round and capped at the far end (plans/power.md).
 */
const CHAIN = N;
/**
 * Segments are lettered A–P as the crew does (the V1 layout drawings):
 * clockwise seen from above, starting at the leg by the stage, which is drawn
 * at the bottom. Power comes in, and the brain box sits, at that leg.
 */
const LETTERS = "ABCDEFGHIJKLMNOP";
const letter = (i: number) => LETTERS[i] ?? String(i + 1);
const START = Math.PI;

type Layer = "power" | "network" | "spokes";
const LAYERS: { id: Layer; label: string }[] = [
  { id: "power", label: "Power" },
  { id: "network", label: "Network" },
  { id: "spokes", label: "Spokes" },
];

const f = (n: number) => n.toFixed(2);
function pt(r: number, a: number): [number, number] {
  return [r * Math.sin(a), -r * Math.cos(a)];
}
function arc(r: number, a0: number, a1: number): string {
  const [x0, y0] = pt(r, a0);
  const [x1, y1] = pt(r, a1);
  return `M${f(x0)} ${f(y0)}A${r} ${r} 0 0 1 ${f(x1)} ${f(y1)}`;
}
function band(r0: number, r1: number, a0: number, a1: number): string {
  const [x0, y0] = pt(r1, a0);
  const [x1, y1] = pt(r1, a1);
  const [x2, y2] = pt(r0, a1);
  const [x3, y3] = pt(r0, a0);
  return `M${f(x0)} ${f(y0)}A${r1} ${r1} 0 0 1 ${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}A${r0} ${r0} 0 0 0 ${f(x3)} ${f(y3)}Z`;
}

const segAngle = (i: number) => START + (i / N) * Math.PI * 2;
const segMid = (i: number) => START + ((i + 0.5) / N) * Math.PI * 2;
/** A box glyph centred on the truss, nudged along the ring by `da`. */
function boxAt(i: number, da: number, size = 6) {
  const [x, y] = pt(R_BOX, segMid(i) + da);
  const deg = (segMid(i) * 180) / Math.PI;
  return { x, y, deg, size };
}

/**
 * How V2 fits together around the ring: 16 truss segments, each with a node
 * box beside its power box; power chained segment to segment; the network a
 * closed ring of switches with one link on standby; internet in at any
 * segment. Tap a segment for what's in it.
 */
export default function RingDiagram({
  interactive = true,
}: {
  interactive?: boolean;
}) {
  const [layers, setLayers] = useState<Record<Layer, boolean>>({
    power: true,
    network: true,
    spokes: true,
  });
  const [seg, setSeg] = useState(0);

  const node = (i: number) => boxAt(i, -0.07);
  const power = (i: number) => boxAt(i, 0.07);
  // Each controller drives its four spokes from every other output.
  const spokes = Array.from(
    { length: SPOKES_PER },
    (_, k) => `${letter(seg)}${2 * k + 1}`,
  ).join(", ");

  return (
    <figure className="ring" data-interactive={interactive || undefined}>
      <div className="ring-chart">
        <svg
          viewBox="-138 -114 276 228"
          role="img"
          aria-label="The Gate from above: sixteen truss segments in a ring, lettered A to P clockwise from the stage, each with a node box and a power box. Power and the network both run segment to segment around the ring."
        >
          {layers.spokes && (
            <g className="ring-spokes">
              {Array.from({ length: GATE.spokes }, (_, s) => {
                const a = START + ((s + 0.5) / GATE.spokes) * Math.PI * 2;
                const [x0, y0] = pt(R_HUB, a);
                const [x1, y1] = pt(R_TRUSS_IN - 2, a);
                return (
                  <line
                    key={s}
                    x1={f(x0)}
                    y1={f(y0)}
                    x2={f(x1)}
                    y2={f(y1)}
                    data-active={
                      Math.floor(s / SPOKES_PER) === seg || undefined
                    }
                  />
                );
              })}
            </g>
          )}

          {Array.from({ length: N }, (_, i) => (
            <path
              key={i}
              d={band(
                R_TRUSS_IN,
                R_TRUSS_OUT,
                segAngle(i) + 0.012,
                segAngle(i + 1) - 0.012,
              )}
              className="ring-segment"
              data-active={(interactive && seg === i) || undefined}
              onClick={interactive ? () => setSeg(i) : undefined}
            />
          ))}

          {layers.network && (
            <g className="ring-net">
              {Array.from({ length: N }, (_, i) => {
                const a0 = segMid(i) - 0.07;
                const a1 = segMid(i + 1) - 0.07;
                return (
                  <path
                    key={i}
                    d={arc(R_NET, a0, a1)}
                    data-standby={i === STANDBY_AFTER || undefined}
                  />
                );
              })}
              {Array.from({ length: N }, (_, i) => {
                const [x0, y0] = pt(R_NET, segMid(i) - 0.07);
                const { x, y } = node(i);
                return (
                  <line key={i} x1={f(x0)} y1={f(y0)} x2={f(x)} y2={f(y)} />
                );
              })}
            </g>
          )}

          {layers.power && (
            <g className="ring-power">
              {/* Each chain runs from its feed to the end of its last segment. */}
              {Array.from({ length: N }, (_, i) =>
                (i + 1) % CHAIN === 0 ? null : (
                  <path
                    key={i}
                    d={arc(R_POWER, segMid(i) + 0.07, segMid(i + 1) + 0.07)}
                  />
                ),
              )}
              {Array.from({ length: N }, (_, i) => {
                const [x0, y0] = pt(R_POWER, segMid(i) + 0.07);
                const { x, y } = power(i);
                return (
                  <line key={i} x1={f(x0)} y1={f(y0)} x2={f(x)} y2={f(y)} />
                );
              })}
            </g>
          )}

          {Array.from({ length: N }, (_, i) => {
            const n = node(i);
            const p = power(i);
            return (
              <g key={i}>
                <rect
                  className="ring-node"
                  x={f(n.x - n.size / 2)}
                  y={f(n.y - n.size / 2)}
                  width={n.size}
                  height={n.size}
                  rx="1.2"
                  transform={`rotate(${f(n.deg)} ${f(n.x)} ${f(n.y)})`}
                />
                <rect
                  className="ring-pbox"
                  x={f(p.x - p.size / 2)}
                  y={f(p.y - p.size / 2)}
                  width={p.size}
                  height={p.size}
                  rx="1.2"
                  transform={`rotate(${f(p.deg)} ${f(p.x)} ${f(p.y)})`}
                />
              </g>
            );
          })}

          {Array.from({ length: N }, (_, i) => {
            const [x, y] = pt(R_BOX, segAngle(i));
            return (
              <circle
                key={i}
                className="ring-joint"
                cx={f(x)}
                cy={f(y)}
                r="2"
              />
            );
          })}

          {(() => {
            const [x, y] = pt(R_HUB + 18, segMid(BRAIN_AT));
            const [nx, ny] = pt(R_NET, segMid(BRAIN_AT) - 0.07);
            return (
              <g className="ring-brain">
                {layers.network && (
                  <line x1={f(x)} y1={f(y)} x2={f(nx)} y2={f(ny)} />
                )}
                <rect x={f(x - 9)} y={f(y - 6)} width="18" height="12" rx="2" />
                <text
                  x={f(x)}
                  y={f(y)}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  Brain
                </text>
              </g>
            );
          })()}

          {layers.network &&
            (() => {
              const [x0, y0] = pt(R_TRUSS_OUT + 4, segMid(WAN_AT) - 0.07);
              const [x1, y1] = pt(R_TRUSS_OUT + 15, segMid(WAN_AT) - 0.07);
              const [tx, ty] = pt(R_TRUSS_OUT + 18, segMid(WAN_AT) - 0.07);
              return (
                <g className="ring-wan">
                  <line x1={f(x1)} y1={f(y1)} x2={f(x0)} y2={f(y0)} />
                  <text
                    x={f(tx)}
                    y={f(ty)}
                    textAnchor={tx < -1 ? "end" : "start"}
                    dominantBaseline="central"
                  >
                    Internet in
                  </text>
                </g>
              );
            })()}

          {layers.power &&
            Array.from({ length: N / CHAIN }, (_, c) => {
              const a = segMid(c * CHAIN) + 0.07;
              const [x0, y0] = pt(R_POWER, a);
              const [x1, y1] = pt(R_POWER + 9, a);
              const [tx, ty] = pt(R_POWER + 13, a);
              const left = tx < -1;
              return (
                <g key={c} className="ring-feed">
                  <line x1={f(x1)} y1={f(y1)} x2={f(x0)} y2={f(y0)} />
                  <circle cx={f(x1)} cy={f(y1)} r="1.6" />
                  {c === 0 && (
                    <text
                      x={f(tx)}
                      y={f(ty - 3)}
                      textAnchor={left ? "end" : "start"}
                      dominantBaseline="central"
                    >
                      Power in
                    </text>
                  )}
                </g>
              );
            })}

          {interactive &&
            Array.from({ length: N }, (_, i) => {
              const [x, y] = pt(R_TRUSS_IN - 7, segMid(i));
              return (
                <text
                  key={i}
                  className="ring-num"
                  x={f(x)}
                  y={f(y)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  data-active={seg === i || undefined}
                >
                  {letter(i)}
                </text>
              );
            })}
        </svg>
      </div>

      <figcaption className="ring-side">
        <ul className="ring-key">
          <li>
            <span className="key key-node" aria-hidden="true" /> Node box: light
            controller and switch
          </li>
          <li>
            <span className="key key-pbox" aria-hidden="true" /> Power box: its
            supplies, kept apart
          </li>
          <li>
            <span className="key key-joint" aria-hidden="true" /> Sealed joint
            between segments
          </li>
          <li>
            <span className="key key-net" aria-hidden="true" /> Network ring
            (dashed: the standby link)
          </li>
          <li>
            <span className="key key-power" aria-hidden="true" /> Power: one
            twist-lock feed, chained segment to segment around the ring
          </li>
        </ul>

        {interactive && (
          <>
            <div
              className="chips"
              role="group"
              aria-label="Show on the diagram"
            >
              {LAYERS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className="chip"
                  aria-pressed={layers[l.id]}
                  onClick={() => setLayers((s) => ({ ...s, [l.id]: !s[l.id] }))}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="ring-detail" aria-live="polite">
              <div className="ring-detail-head">
                <button
                  type="button"
                  className="chip"
                  aria-label="Previous segment"
                  onClick={() => setSeg((s) => (s + N - 1) % N)}
                >
                  ‹
                </button>
                <strong>Segment {letter(seg)}</strong>
                <button
                  type="button"
                  className="chip"
                  aria-label="Next segment"
                  onClick={() => setSeg((s) => (s + 1) % N)}
                >
                  ›
                </button>
              </div>
              <dl>
                <dt>Spokes</dt>
                <dd>{spokes}</dd>
                <dt>Node box {letter(seg)}</dt>
                <dd>
                  Light controller {letter(seg)} (PixLite E4-S) and switch{" "}
                  {letter(seg)}, with four spare PoE+ ports
                </dd>
                <dt>Power box {letter(seg)}</dt>
                <dd>
                  Supplies for the pixels and the switch, and a ground-fault
                  breaker
                </dd>
                <dt>Joins segment {letter((seg + 1) % N)}</dt>
                <dd>
                  {(seg + 1) % CHAIN === 0
                    ? "One sealed Ethernet joint; the power chain ends here, capped"
                    : "One sealed power joint, one sealed Ethernet joint"}
                </dd>
                {seg % CHAIN === 0 && (
                  <>
                    <dt>Power feed</dt>
                    <dd>
                      The generator plugs in here: one three-phase twist-lock
                      (L21-30) for the whole ring
                    </dd>
                  </>
                )}
                {seg === BRAIN_AT && (
                  <>
                    <dt>Brain box</dt>
                    <dd>Show computer and gateway (placement not final)</dd>
                  </>
                )}
              </dl>
            </div>
          </>
        )}
      </figcaption>
    </figure>
  );
}
