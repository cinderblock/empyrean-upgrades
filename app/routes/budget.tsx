import { Link, type MetaFunction } from "react-router";
import LineItems from "../components/LineItems";
import Shell from "../components/Shell";
import {
  CONFIDENCE,
  CONTINGENCY,
  EXTRAS,
  ITEMS,
  itemsIn,
  money,
  moneyRange,
  projectTotals,
  tierLabel,
  tierTotals,
  type Confidence,
} from "../content/budget";
import { CATEGORIES, CATEGORY_IDS } from "../content/categories";
import { SITE } from "../content/site";
import { pageMeta } from "../meta";

export const meta: MetaFunction = () =>
  pageMeta(
    "Budget: Empyrean Gate V2",
    "Every line item in the Empyrean Gate V2 budget, with quantities, prices, sources and how sure we are of each.",
  );

export default function Budget() {
  const totals = tierTotals();
  const projects = projectTotals();
  const counts = new Map<Confidence, number>();
  for (const i of ITEMS) {
    counts.set(i.confidence, (counts.get(i.confidence) ?? 0) + 1);
  }

  return (
    <Shell>
      <section className="hero hero-small">
        <p className="kicker">Budget</p>
        <h1>Every line item</h1>
        <p className="lede">
          {ITEMS.length} line items across the goal, {totals.length - 1} stretch
          goals and {projects.length} big projects, and {EXTRAS.length} extras
          we'd buy only if needed. Each price says how sure we are of it; tap
          the label for what that means and where the number came from.
        </p>
        <ul className="confidence-key">
          {(Object.keys(CONFIDENCE) as Confidence[]).map((c) => (
            <li key={c}>
              <span className={`confidence-dot confidence-${c}`} />
              <b>{CONFIDENCE[c].label}</b> ({counts.get(c) ?? 0}):{" "}
              {CONFIDENCE[c].explain}
            </li>
          ))}
        </ul>
      </section>

      <section className="section section-tight" aria-labelledby="summary">
        <h2 id="summary">Summary</h2>
        <div className="table-wrap">
          <table className="items summary">
            <thead>
              <tr>
                <th scope="col">Tier</th>
                <th scope="col" className="num">
                  Parts
                </th>
                <th scope="col" className="num">
                  With {Math.round(CONTINGENCY * 100)}% contingency
                </th>
                <th scope="col" className="num">
                  To raise
                </th>
                <th scope="col" className="num">
                  Running total
                </th>
              </tr>
            </thead>
            <tbody>
              {[...totals, ...projects].map((t) => (
                <tr key={t.tier.id}>
                  <th scope="row">
                    <a href={`#tier-${t.tier.id}`}>{tierLabel(t.tier, true)}</a>
                  </th>
                  <td className="num">{moneyRange(t.parts)}</td>
                  <td className="num">{moneyRange(t.total)}</td>
                  <td className="num">
                    <b>{money(t.goal)}</b>
                  </td>
                  <td className="num">
                    {t.tier.project ? "On its own" : money(t.cumulative)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fine">
          "To raise" is the high end of the range with contingency, rounded up
          to the next $500. Each stretch goal adds to the running total; a big
          project is raised on its own. Figures gathered {SITE.figuresAsOf}.
        </p>
      </section>

      {[...totals, ...projects].map((t) => (
        <section
          key={t.tier.id}
          className="section section-tight"
          aria-labelledby={`tier-${t.tier.id}`}
        >
          <h2 id={`tier-${t.tier.id}`}>
            {tierLabel(t.tier)}{" "}
            <span className="h-amount">{money(t.goal)}</span>
          </h2>
          <p className="section-lede">{t.tier.promise}</p>
          {CATEGORY_IDS.map((c) => {
            const items = itemsIn({ tier: t.tier.id, category: c });
            if (items.length === 0) return null;
            return (
              <LineItems key={c} items={items} caption={CATEGORIES[c].name} />
            );
          })}
        </section>
      ))}

      <section className="section section-tight" aria-labelledby="extras">
        <h2 id="extras">Only if needed</h2>
        <p className="section-lede">
          Bought only if something we haven't measured yet turns out to be true.
          Not counted in any total above.
        </p>
        <LineItems items={EXTRAS} caption="Extras" extras />
        <p className="fine">
          The research behind every price, with links and spec checks:{" "}
          <code>docs/pricing-2026-10.md</code> in the plans repo.{" "}
          <Link to="/">Back to the overview</Link>
        </p>
      </section>
    </Shell>
  );
}
