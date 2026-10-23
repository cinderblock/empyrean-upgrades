import { Link, type MetaFunction } from "react-router";
import Donut from "../components/Donut";
import GateDemo from "../components/GateDemo";
import { Mark, Reviewable } from "../components/Mark";
import PrintSheet from "../components/PrintSheet";
import RingDiagram from "../components/RingDiagram";
import Shell from "../components/Shell";
import TierLadder from "../components/TierLadder";
import {
  PROJECTS,
  itemsIn,
  money,
  moneyRange,
  moneyShort,
  projectTotals,
  slicesOf,
  subtotal,
  tierTotals,
} from "../content/budget";
import {
  CATEGORIES,
  CATEGORY_LIST,
  MATURITY_LABEL,
} from "../content/categories";
import { GATE, SITE } from "../content/site";
import { pageMeta } from "../meta";

export const meta: MetaFunction = () =>
  pageMeta(
    "Empyrean Gate V2",
    "The plans, and the budget, for version 2 of the Empyrean Gate: weatherproof power, a ring network, a real GPU, and room to grow.",
  );

export default function Home() {
  const totals = tierTotals();
  const core = totals[0];
  const all = totals[totals.length - 1].cumulative;
  const slices = slicesOf("core");
  const projects = projectTotals();
  const isProject = (tier: string) => PROJECTS.some((p) => p.id === tier);

  return (
    <Shell>
      <div className="screen-only">
        <section className="hero">
          <p className="kicker">The Empyrean Gate, version 2</p>
          <h1>Built for the weather, and ready to grow.</h1>
          <p className="lede">
            The Gate is a {GATE.outerDiameterFt} ft ring of {GATE.spokes} LED
            spokes over a dance floor. V1 works, but its power and boxes aren't
            weatherproof, one switch carries the whole network, and its show
            computer is at its limit. V2 fixes all three, and leaves room for
            what comes next.
          </p>
          <div className="hero-ask">
            <div className="figure">
              <span className="figure-value">{money(core.goal)}</span>
              <span className="figure-label">builds V2</span>
            </div>
            <div className="figure figure-quiet">
              <span className="figure-value">{money(all)}</span>
              <span className="figure-label">with every stretch goal</span>
            </div>
          </div>
          <div className="hero-actions">
            <a
              className="button"
              href={SITE.donate}
              target="_blank"
              rel="noreferrer"
            >
              Help build V2
            </a>
            <Link className="button button-ghost" to="/budget">
              Every line item
            </Link>
          </div>
        </section>

        <section className="section" aria-labelledby="tiers">
          <h2 id="tiers">The goal, then the stretch goals</h2>
          <p className="section-lede">
            V2 comes first. Each stretch goal builds on the one before it.
          </p>
          <TierLadder totals={totals} />
        </section>

        <section className="section" aria-labelledby="projects">
          <h2 id="projects">Big projects</h2>
          <p className="section-lede">
            Bigger asks, each raised on its own and kept out of the running
            total above. Early figures with wide ranges: the research is days
            old.
          </p>
          <ul className="cards">
            {projects.map((t) => {
              const c = CATEGORIES[t.tier.project!];
              return (
                <li key={t.tier.id} className={`card cat-${c.id}`}>
                  <span className={`card-rule series-fill series-${c.id}`} />
                  <h3>
                    <Link to={`/plans/${c.id}`}>{t.tier.name}</Link>
                  </h3>
                  <p className="card-headline">{t.tier.promise}</p>
                  <p className="card-meta">
                    <span>
                      To raise: <b>{money(t.goal)}</b>
                    </span>
                    <span>Parts: {moneyRange(t.parts)}</span>
                  </p>
                  <Link className="card-more" to={`/plans/${c.id}`}>
                    The plan <span aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="section split split-wide" aria-labelledby="where">
          <div>
            <h2 id="where">Where V2's {moneyShort(core.goal)} goes</h2>
            <p className="section-lede">
              Parts by upgrade, at the high end of every estimate, plus a{" "}
              {Math.round((core.contingency[1] / core.parts[1]) * 100)}%
              contingency for what estimates miss: shipping, tax, the part that
              arrives broken. Point at or tap a slice for its figure.
            </p>
          </div>
          <Donut
            caption="V2 budget by upgrade"
            totalLabel="High estimate"
            format={money}
            data={slices.map((s) => ({
              key: s.key,
              label:
                s.key === "contingency"
                  ? "Contingency"
                  : CATEGORIES[s.key].name,
              value: s.range[1],
              amount: moneyRange(s.range),
              href: s.key === "contingency" ? undefined : `/plans/${s.key}`,
            }))}
          />
        </section>

        <section className="section" aria-labelledby="upgrades">
          <h2 id="upgrades">The upgrades</h2>
          <ul className="cards">
            {CATEGORY_LIST.map((c) => {
              const parts = subtotal(itemsIn({ tier: "core", category: c.id }));
              const stretch = subtotal(
                itemsIn({ category: c.id }).filter(
                  (i) => i.tier !== "core" && !isProject(i.tier),
                ),
              );
              const project = subtotal(
                itemsIn({ category: c.id }).filter((i) => isProject(i.tier)),
              );
              return (
                <li key={c.id} className={`card cat-${c.id}`}>
                  <span className={`card-rule series-fill series-${c.id}`} />
                  <h3>
                    <Link to={`/plans/${c.id}`}>{c.name}</Link>
                  </h3>
                  <p className="card-headline">{c.headline}</p>
                  <Reviewable
                    as="p"
                    rid={`${c.id}.today`}
                    className="card-today"
                  >
                    <span className="label">Today</span> {c.today}{" "}
                    <Mark rid={`${c.id}.today`} />
                  </Reviewable>
                  <p className="card-meta">
                    {parts[1] > 0 && (
                      <span>
                        V2: <b>{moneyRange(parts)}</b>
                      </span>
                    )}
                    {stretch[1] > 0 && (
                      <span>
                        Stretch: <b>{moneyRange(stretch)}</b>
                      </span>
                    )}
                    {project[1] > 0 && (
                      <span>
                        Big project: <b>{moneyRange(project)}</b>
                      </span>
                    )}
                    <span className={`maturity maturity-${c.maturity}`}>
                      {MATURITY_LABEL[c.maturity]}
                    </span>
                  </p>
                  <Link className="card-more" to={`/plans/${c.id}`}>
                    The plan <span aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="section" aria-labelledby="fit">
          <h2 id="fit">How V2 fits together</h2>
          <p className="section-lede">
            Sixteen truss segments, each carrying its own sealed power and
            network run. Joining the truss joins everything. Tap a segment to
            see what's in it.
          </p>
          <RingDiagram />
        </section>

        <section className="section split demo night" aria-labelledby="demo">
          <div>
            <h2 id="demo">See it move</h2>
            <p className="section-lede">
              The Gate's own patterns, running in your browser. Switch to 128
              spokes to see the last stretch goal. Tap the ring to send a ripple
              through it.
            </p>
            <p>
              Anyone can write patterns for the Gate in the{" "}
              <a href={SITE.playground}>pattern playground</a>, with the same
              engine the Gate runs, and send them to the crew.
            </p>
            <p>
              <a className="button button-ghost" href={SITE.playground}>
                Open the playground <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
          <GateDemo />
        </section>

        <section className="section cta" aria-labelledby="give">
          <h2 id="give">Help build V2</h2>
          <p className="section-lede">
            Every dollar goes to parts on the budget, starting with V2 itself.
            To talk about a larger gift, a part you can donate, or a stretch
            goal you'd like to adopt, talk to {SITE.giftsContact}, through{" "}
            <a href={SITE.entheos} target="_blank" rel="noreferrer">
              Entheos
            </a>
            .
          </p>
          <a
            className="button"
            href={SITE.donate}
            target="_blank"
            rel="noreferrer"
          >
            Give
          </a>
          <p className="print-hint">
            Need a one-page handout? Print this page.
          </p>
        </section>
      </div>
      <PrintSheet />
    </Shell>
  );
}
