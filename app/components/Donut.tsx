import { useId, useState, type ReactNode } from "react";
import { Link } from "react-router";

export interface DonutDatum {
  key: string;
  label: string;
  value: number;
  /** Shown in the legend's amount column instead of the bare value. */
  amount?: ReactNode;
  href?: string;
}

const R_OUT = 92;
const R_IN = 58;
/** Slices smaller than this (radians) carry no in-slice label. */
const LABEL_MIN_ANGLE = 0.42;

function point(r: number, a: number): [number, number] {
  return [r * Math.sin(a), -r * Math.cos(a)];
}

/** An annular sector from angle a0 to a1, clockwise from 12 o'clock. */
function sector(a0: number, a1: number): string {
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const [x0, y0] = point(R_OUT, a0);
  const [x1, y1] = point(R_OUT, a1);
  const [x2, y2] = point(R_IN, a1);
  const [x3, y3] = point(R_IN, a0);
  const f = (n: number) => n.toFixed(3);
  return [
    `M${f(x0)} ${f(y0)}`,
    `A${R_OUT} ${R_OUT} 0 ${large} 1 ${f(x1)} ${f(y1)}`,
    `L${f(x2)} ${f(y2)}`,
    `A${R_IN} ${R_IN} 0 ${large} 0 ${f(x3)} ${f(y3)}`,
    "Z",
  ].join("");
}

/**
 * Part-to-whole at a glance: a donut, with its legend as a table beside it
 * (the table is the chart's accessible twin and its legend at once).
 * Pointing at, tapping or focusing a slice or a row shows that slice's
 * figure in the middle. Fill colours come from CSS, `--series-<key>`; in
 * print each slice also gets its own hatching, so a greyscale copy still
 * tells them apart.
 */
export default function Donut({
  data,
  caption,
  totalLabel = "Total",
  format,
}: {
  data: DonutDatum[];
  caption: string;
  totalLabel?: string;
  format: (n: number) => string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const uid = useId().replace(/:/g, "");
  const total = data.reduce((n, d) => n + d.value, 0);
  const shown = data.find((d) => d.key === active);

  let angle = 0;
  const arcs = data.map((d) => {
    const a0 = angle;
    angle += (d.value / total) * Math.PI * 2;
    return { d, a0, a1: angle };
  });

  return (
    <figure className="donut">
      <div className="donut-chart">
        <svg
          viewBox="-100 -100 200 200"
          role="img"
          aria-label={`${caption}: ${data
            .map((d) => `${d.label} ${format(d.value)}`)
            .join(", ")}`}
        >
          <defs>
            {data.map((d, i) => (
              <pattern
                key={d.key}
                id={`${uid}-tex-${d.key}`}
                width={i < 2 ? 5 : 8}
                height={i < 2 ? 5 : 8}
                patternUnits="userSpaceOnUse"
                patternTransform={`rotate(${i % 2 === 0 ? 45 : 135})`}
              >
                <rect
                  width="8"
                  height="8"
                  className={`series-fill series-${d.key}`}
                />
                {d.key !== "contingency" && (
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="8"
                    className="texture-ink"
                    strokeWidth={i < 2 ? 1.6 : 1.2}
                  />
                )}
              </pattern>
            ))}
          </defs>
          {arcs.map(({ d, a0, a1 }) => (
            <path
              key={d.key}
              d={sector(a0, a1)}
              className={`donut-slice series-fill series-${d.key}`}
              style={
                {
                  "--texture": `url(#${uid}-tex-${d.key})`,
                } as React.CSSProperties
              }
              data-active={active === d.key || undefined}
              data-dim={(active && active !== d.key) || undefined}
              onPointerEnter={() => setActive(d.key)}
              onPointerLeave={() => setActive(null)}
              onClick={() => setActive((k) => (k === d.key ? null : d.key))}
            />
          ))}
          {arcs.map(({ d, a0, a1 }) => {
            if (a1 - a0 < LABEL_MIN_ANGLE) return null;
            const [x, y] = point((R_OUT + R_IN) / 2, (a0 + a1) / 2);
            return (
              <text
                key={d.key}
                x={x}
                y={y}
                className="donut-pct"
                textAnchor="middle"
                dominantBaseline="central"
                aria-hidden="true"
              >
                {Math.round((d.value / total) * 100)}%
              </text>
            );
          })}
          <text className="donut-center-label" y="-10" textAnchor="middle">
            {shown ? shown.label : totalLabel}
          </text>
          <text className="donut-center-value" y="16" textAnchor="middle">
            {format(shown ? shown.value : total)}
          </text>
        </svg>
      </div>
      <table className="donut-legend">
        <caption className="visually-hidden">{caption}</caption>
        <thead className="visually-hidden">
          <tr>
            <th scope="col">Part</th>
            <th scope="col">Amount</th>
            <th scope="col">Share</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr
              key={d.key}
              data-active={active === d.key || undefined}
              onPointerEnter={() => setActive(d.key)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(d.key)}
              onBlur={() => setActive(null)}
            >
              <th scope="row">
                <svg className="swatch" viewBox="0 0 10 10" aria-hidden="true">
                  <rect
                    width="10"
                    height="10"
                    className={`donut-key series-fill series-${d.key}`}
                    style={
                      {
                        "--texture": `url(#${uid}-tex-${d.key})`,
                      } as React.CSSProperties
                    }
                  />
                </svg>
                {d.href ? <Link to={d.href}>{d.label}</Link> : d.label}
              </th>
              <td className="num">{d.amount ?? format(d.value)}</td>
              <td className="num share">
                {Math.round((d.value / total) * 100)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
