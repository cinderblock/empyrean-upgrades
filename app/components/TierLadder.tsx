import { useState } from "react";
import {
  money,
  moneyRange,
  moneyShort,
  type TierTotal,
} from "../content/budget";

/**
 * The goal and its stretch goals as one bar: each tier's share of the whole
 * in its own step of one hue (ordered, so an ordinal ramp, brightest first),
 * with the running total where each tier ends. Under it, one card per tier.
 * Pointing at or tapping a step lights its card, and the other way round.
 */
export default function TierLadder({ totals }: { totals: TierTotal[] }) {
  const [active, setActive] = useState<string | null>(null);
  const tiers = totals.filter((t) => t.goal > 0);
  const whole = tiers[tiers.length - 1]?.cumulative ?? 0;
  const labelled = crowdFree(tiers.map((t) => t.cumulative / whole));

  return (
    <div className="ladder">
      <div className="ladder-bar" aria-hidden="true">
        {tiers.map((t, i) => (
          <div
            key={t.tier.id}
            className={`ladder-step tier-${i}`}
            style={{ flexGrow: t.goal }}
            data-active={active === t.tier.id || undefined}
            onPointerEnter={() => setActive(t.tier.id)}
            onPointerLeave={() => setActive(null)}
            onClick={() =>
              setActive((a) => (a === t.tier.id ? null : t.tier.id))
            }
          >
            {labelled[i] && (
              <span className="ladder-mark">{moneyShort(t.cumulative)}</span>
            )}
          </div>
        ))}
      </div>
      <ol className="ladder-tiers">
        {tiers.map((t, i) => (
          <li
            key={t.tier.id}
            className={`ladder-tier tier-${i}`}
            data-active={active === t.tier.id || undefined}
            onPointerEnter={() => setActive(t.tier.id)}
            onPointerLeave={() => setActive(null)}
          >
            <span className="ladder-swatch" aria-hidden="true" />
            <span className="ladder-kicker">
              {i === 0 ? "The goal" : `Stretch goal ${i}`}
            </span>
            <span className="ladder-name">{t.tier.name}</span>
            <span className="ladder-amount">
              {i === 0 ? money(t.goal) : `+${money(t.goal)}`}
            </span>
            <span className="ladder-promise">{t.tier.promise}</span>
            <span className="ladder-detail">
              Parts {moneyRange(t.parts)}, plus{" "}
              {Math.round((t.contingency[1] / t.parts[1]) * 100)}% contingency.
              {i > 0 && <> Running total {money(t.cumulative)}.</>}
            </span>
          </li>
        ))}
      </ol>
      <p className="visually-hidden">All tiers together: {money(whole)}.</p>
    </div>
  );
}

/**
 * Which running totals to label under the bar: the goal and the grand total
 * always, and a middle one only if it stands far enough from its labelled
 * neighbours not to collide (a small stretch goal makes a narrow step). Each
 * card carries its running total either way.
 */
function crowdFree(ends: number[], gap = 0.08): boolean[] {
  const show = ends.map(() => false);
  if (ends.length === 0) return show;
  show[0] = true;
  show[ends.length - 1] = true;
  let last = ends[0];
  for (let i = 1; i < ends.length - 1; i++) {
    if (ends[i] - last >= gap && ends[ends.length - 1] - ends[i] >= gap) {
      show[i] = true;
      last = ends[i];
    }
  }
  return show;
}
