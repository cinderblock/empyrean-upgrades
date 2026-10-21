import { Link, useParams, type MetaFunction } from "react-router";
import LineItems from "../components/LineItems";
import RingDiagram from "../components/RingDiagram";
import SegmentDiagram from "../components/SegmentDiagram";
import Shell from "../components/Shell";
import { TIERS, itemsIn, moneyRange, subtotal } from "../content/budget";
import {
  CATEGORIES,
  CATEGORY_IDS,
  CATEGORY_LIST,
  MATURITY_LABEL,
  type CategoryId,
} from "../content/categories";
import { pageMeta } from "../meta";
import NotFound from "./404";

function isCategory(id: string | undefined): id is CategoryId {
  return CATEGORY_IDS.includes(id as CategoryId);
}

export const meta: MetaFunction = ({ params }) => {
  if (!isCategory(params.id)) return pageMeta("Not found", "No such plan.");
  const c = CATEGORIES[params.id];
  return pageMeta(`${c.name}: Empyrean Gate V2`, `${c.headline}. ${c.v2}`);
};

/** Which diagram tells each category's story best. */
const DIAGRAM: Record<CategoryId, "segment" | "ring" | null> = {
  power: "segment",
  networking: "ring",
  compute: null,
  weatherproofing: "segment",
  expansion: "segment",
};

export default function Plan() {
  const { id } = useParams();
  if (!isCategory(id)) return <NotFound />;
  const c = CATEGORIES[id];
  const index = CATEGORY_IDS.indexOf(id);
  const next = CATEGORY_LIST[(index + 1) % CATEGORY_LIST.length];
  const all = itemsIn({ category: id });
  const diagram = DIAGRAM[id];

  return (
    <Shell>
      <article className={`plan cat-${id}`}>
        <section className="hero hero-small">
          <p className="kicker">
            <span
              className={`swatch series-fill series-${id}`}
              aria-hidden="true"
            />
            {c.name}
            <span className={`maturity maturity-${c.maturity}`}>
              {MATURITY_LABEL[c.maturity]}
            </span>
          </p>
          <h1>{c.headline}</h1>
          <div className="then-now">
            <div>
              <h2 className="label">Today</h2>
              <p>{c.today}</p>
            </div>
            <div>
              <h2 className="label">In V2</h2>
              <p>{c.v2}</p>
            </div>
          </div>
        </section>

        <section className="section section-tight" aria-labelledby="how">
          <h2 id="how">How</h2>
          <ul className="points">
            {c.points.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {diagram && (
          <section className="section section-tight" aria-labelledby="diagram">
            <h2 id="diagram">
              {diagram === "ring" ? "Around the ring" : "Inside a segment"}
            </h2>
            {diagram === "ring" ? (
              <RingDiagram />
            ) : (
              <SegmentDiagram focus={id} />
            )}
          </section>
        )}

        <section className="section section-tight" aria-labelledby="parts">
          <h2 id="parts">
            Parts <span className="h-amount">{moneyRange(subtotal(all))}</span>
          </h2>
          {TIERS.map((t, i) => {
            const items = itemsIn({ tier: t.id, category: id });
            if (items.length === 0) return null;
            return (
              <LineItems
                key={t.id}
                items={items}
                caption={i === 0 ? "V2" : `Stretch goal ${i}: ${t.name}`}
              />
            );
          })}
        </section>

        <section className="section section-tight" aria-labelledby="unknowns">
          <h2 id="unknowns">Still to find out</h2>
          <p className="section-lede">
            What we need to learn before buying. The figures above move when
            these are answered.
          </p>
          <ul className="unknowns">
            {c.unknowns.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </section>

        <nav
          className="section section-tight plan-next"
          aria-label="More plans"
        >
          <Link to="/">Overview</Link>
          <Link to={`/plans/${next.id}`}>
            Next: {next.name} <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </article>
    </Shell>
  );
}
