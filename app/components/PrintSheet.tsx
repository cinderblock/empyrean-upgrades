import {
  DRAFT,
  itemsIn,
  money,
  moneyShort,
  projectTotals,
  slicesOf,
  subtotal,
  tierTotals,
} from "../content/budget";
import { CATEGORIES, CATEGORY_LIST } from "../content/categories";
import { SITE } from "../content/site";
import Donut from "./Donut";
import Qr from "./Qr";

/**
 * The one-page handout Ctrl+P prints from the overview. Hidden on screen;
 * in print it replaces the whole page (see "Print" in global.css), so its
 * layout is designed for a sheet of Letter rather than squeezed from the
 * screen's. Reads in greyscale: the donut hatches its slices and labels
 * them, and nothing relies on colour alone.
 */
export default function PrintSheet() {
  const totals = tierTotals();
  const core = totals[0];
  const all = totals[totals.length - 1].cumulative;
  const slices = slicesOf("core");
  const projects = projectTotals();
  const host = new URL(SITE.origin).host;

  return (
    <section className="print-sheet" aria-hidden="true">
      <header className="ps-head">
        <div>
          <p className="ps-kicker">The Empyrean Gate</p>
          <p className="ps-title">
            Version 2: built for the weather, ready to grow
          </p>
          <p className="ps-lede">
            A 60 ft ring of 64 LED spokes over a dance floor. V1 works, but its
            power and boxes aren't weatherproof, one switch carries the whole
            network, and its computer is at its limit. V2 fixes all three.
          </p>
        </div>
        <div className="ps-qr">
          <Qr value={SITE.origin} label={`${host}`} />
          <span>{host}</span>
        </div>
      </header>

      <div className="ps-ask">
        <p>
          <span className="ps-big">{money(core.goal)}</span> builds V2
        </p>
        <p>
          <span className="ps-big ps-big-2">{money(all)}</span> with every
          stretch goal
        </p>
      </div>

      <div className="ps-cols">
        <div>
          <h2>Where V2's {moneyShort(core.goal)} goes</h2>
          <Donut
            caption="V2 budget by category"
            format={moneyShort}
            data={slices.map((s) => ({
              key: s.key,
              label:
                s.key === "contingency"
                  ? "Contingency"
                  : CATEGORIES[s.key].name,
              value: s.range[1],
            }))}
          />
        </div>
        <div>
          <h2>The goal, then the stretch goals</h2>
          <ol className="ps-tiers">
            {totals
              .filter((t) => t.goal > 0)
              .map((t, i) => (
                <li key={t.tier.id} className={`tier-${i}`}>
                  <span className="ps-tier-amount">
                    {i === 0 ? money(t.goal) : `+${money(t.goal)}`}
                  </span>
                  <span className="ps-tier-name">
                    {i === 0 ? t.tier.name : `Stretch ${i}: ${t.tier.name}`}
                  </span>
                  {/* Only V2 gets its promise: the sheet has no room for five, and the
                      stretch goals' names say enough on paper. */}
                  {i === 0 && (
                    <span className="ps-tier-promise">{t.tier.promise}</span>
                  )}
                </li>
              ))}
          </ol>
          <p className="ps-projects">
            <b>Big projects</b>, each raised on its own:{" "}
            {projects.map((t) => `${t.tier.name} ${money(t.goal)}`).join(" · ")}
            .
          </p>
        </div>
      </div>

      <table className="ps-cats">
        <thead>
          <tr>
            <th scope="col">Upgrade</th>
            <th scope="col">Today</th>
            <th scope="col">In V2</th>
            <th scope="col" className="num">
              V2 parts
            </th>
          </tr>
        </thead>
        <tbody>
          {CATEGORY_LIST.filter(
            (c) => !projects.some((t) => t.tier.project === c.id),
          ).map((c) => {
            const parts = subtotal(itemsIn({ tier: "core", category: c.id }));
            return (
              <tr key={c.id}>
                <th scope="row">{c.name}</th>
                <td>{c.today}</td>
                <td>{c.headline}.</td>
                <td className="num">
                  {parts[1] > 0 ? money(parts[1]) : "Stretch goals"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <footer className="ps-foot">
        <p>
          {DRAFT && <strong>Early figures. </strong>}
          Figures as of {SITE.figuresAsOf}: the high end of each estimate, plus
          15% contingency, rounded up. Every line item, its source and how sure
          we are of it: {host}/budget.
        </p>
        <p>
          Give: {SITE.donate.replace(/^https:\/\/(www\.)?/, "")} · More about
          the Gate: empyreangate.org
        </p>
      </footer>
    </section>
  );
}
